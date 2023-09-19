import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';
import clsx from 'clsx';
import styles from './CreateBorrowingBook.module.scss';
import BookApi from '~/api/BookApi';
import UserApi from '~/api/UserApi';
import toasts from '~/app/components/Toast';
import BorrowingApi from '~/api/BorrowingApi';
import { useNavigate } from 'react-router-dom';
function CreateBorrowingBook() {
    const navigative = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();
    const [book, setBook] = useState();
    const [form, setForm] = useState({
        userId: '',
        bookId: '',
    });
    const [error, setError] = useState(true);
    const handleForm = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [`${name}`]: value,
        });
    };
    const handleSetUser = async () => {
        if (form.userId) {
            const response = await UserApi.getListUser();
            const users = response.data;
            // console.log(users);
            // console.log(form.userId);
            const userById = users.find((u) => {
                return u.id == form.userId;
            });
            if (userById) {
                setUser({
                    ...userById,
                });
            } else {
                setUser();
                setError(true);
                toasts.showError(`Không tồn tại người dùng với mã ${form.userId}`);
            }
        }
    };
    const handleSetBook = async () => {
        if (form.bookId) {
            const response = await BookApi.getBooks();
            const books = response.data;
            const bookById = books.find((u) => {
                return u.id == form.bookId;
            });
            if (bookById) {
                setBook({
                    ...bookById,
                });
            } else {
                setBook();
                setError(true);
                toasts.showError(`Không tồn tại sách với mã ${form.bookId}`);
            }
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (book && user) {
            const response = await BorrowingApi.createBorrowing(form);
            if (response) {
                toasts.showSuccess('Đã thêm dữ liệu thành công');
                navigative('/book/borrow');
                setForm({
                    userId: '',
                    bookId: '',
                });
                setUser(undefined);
                setBook(undefined);
            }
        } else {
            toasts.showError('Bạn điền mã người dùng hoặc mã sách chưa chính xác');
        }
    };
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 200);
    }, []);
    return (
        <div>
            {isLoading ? (
                <div
                    className="d-flex justify-content-center align-items-center bg-light"
                    style={{ minHeight: '400px' }}
                >
                    <Spinner animation="border" variant="primary"></Spinner>
                </div>
            ) : (
                <div className="container-xl py-5 d-flex justify-content-center">
                    <Form
                        onSubmit={handleSubmit}
                        className={clsx(
                            'd-flex col-xl-9 col-lg-10 col-md-10 col-sm-10 col-10 shadow-lg p-5 rounded-4 flex-wrap align-items-center',
                            styles.form,
                        )}
                    >
                        <div className="col-12">
                            <p className="fs-5 fw-semibold ">
                                <Link to={'/book'} className="text-decoration-none">
                                    Sách
                                </Link>{' '}
                                / <span>Cho mượn sách</span>
                            </p>
                        </div>
                        <div className="col-12 col-sm-10 col-md-6 col-lg-4 px-3">
                            <Form.Group>
                                <Form.Label>Mã người dùng : </Form.Label>
                                <Form.Control
                                    placeholder="Nhập mã người dùng"
                                    name="userId"
                                    onChange={handleForm}
                                    onBlur={() => handleSetUser()}
                                    value={form?.userId}
                                ></Form.Control>
                            </Form.Group>
                            <div>
                                <p>
                                    <span className="fw-semibold">Họ tên : </span>
                                    <span className="fw-semibold">{user?.name}</span>
                                </p>
                                <p>
                                    <span className="fw-semibold">Số sách có thể mượn : </span>
                                    <span className="fw-semibold">{user?.bookBorrowed}</span>
                                </p>
                                <p>
                                    <span className="fw-semibold">Email : </span>
                                    <span className="fw-semibold">{user?.email}</span>
                                </p>
                                <p>
                                    <span className="fw-semibold">Lớp : </span>
                                    <span className="fw-semibold">{user?.class}</span>
                                </p>
                                <p>
                                    <span className="fw-semibold">Khoa : </span>
                                    <span className="fw-semibold">{user?.faculty}</span>
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-10 col-md-6 col-lg-4 px-3">
                            <Form.Group>
                                <Form.Label>Mã sách</Form.Label>
                                <Form.Control
                                    placeholder="Nhập mã sách"
                                    name="bookId"
                                    onChange={handleForm}
                                    onBlur={() => handleSetBook()}
                                    value={form?.bookId}
                                ></Form.Control>
                            </Form.Group>
                            <div>
                                <p>
                                    <span className="fw-semibold">Tên sách : </span>
                                    <span className="fw-semibold">{book?.name}</span>
                                </p>
                                <p>
                                    <span className="fw-semibold">Tên tác giả : </span>
                                    <span className="fw-semibold">{book?.author}</span>
                                </p>
                                <p>
                                    <span className="fw-semibold">Loại sách : </span>
                                    <span className="fw-semibold">{book?.type}</span>
                                </p>
                                <p>
                                    <span className="fw-semibold">Nơi để : </span>
                                    <span className="fw-semibold">{book?.position}</span>
                                </p>
                                <p>
                                    <span className="fw-semibold">Số sách còn : </span>
                                    <span className="fw-semibold">{book?.remaining}</span>
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-10 col-md-6 col-lg-4 px-3">
                            <button className={styles.btnAdd} type="submit">
                                Thêm
                                <i className="fa-regular fa-circle-plus ms-2"></i>
                            </button>
                        </div>
                    </Form>
                </div>
            )}
        </div>
    );
}

export default CreateBorrowingBook;
