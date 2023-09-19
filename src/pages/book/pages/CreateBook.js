import styles from './CreateBook.module.scss';
import BookApi from '~/api/BookApi';
import { Button, Form, Spinner } from 'react-bootstrap';
import toasts from '~/app/components/Toast';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
function CreateBook() {
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigative = useNavigate();
    const [form, setForm] = useState({
        name: '',
        author: '',
        type: 'Giáo trình',
        position: '',
        remaining: 0,
        book: undefined,
        image: undefined,
    });
    const handleForm = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [`${name}`]: value,
        });
    };
    const handleFormByFile = (event) => {
        const { name } = event.target;

        if (event.target) {
            const fileData = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            setForm({
                ...form,
                [name]: fileData,
                // [name]: event.target.files,
            });
        }
    };
    // console.log('form----', form);
    const handleSubmit = async (event) => {
        const formAdd = event.currentTarget;
        event.preventDefault();
        if (formAdd.checkValidity() === false) {
            event.stopPropagation();
        } else {
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('author', form.author);
            formData.append('type', form.type);
            formData.append('position', form.position);
            formData.append('remaining', form.remaining);
            formData.append('book', form.book);
            formData.append('image', form.image);
            const res = await BookApi.createBook(formData);
            if (res) {
                // setForm({
                //     name: '',
                //     author: '',
                //     type: 'Giáo trình',
                //     position: '',
                //     remaining: 0,
                //     book: undefined,
                //     image: undefined,
                // });
                toasts.showSuccess('Đã thêm sách thành công');
                navigative('/book/viewAllBooks');
            }
        }
        setValidated(true);
    };
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 200);
    }, []);
    return (
        <div className="d-flex justify-content-center align-content-center py-5">
            {isLoading ? (
                <div
                    className="d-flex justify-content-center align-items-center bg-light"
                    style={{ minHeight: '400px' }}
                >
                    <Spinner animation="border" variant="primary"></Spinner>
                </div>
            ) : (
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                    className={clsx(
                        'd-flex col-xl-9 col-lg-10 col-md-10 col-sm-10 col-10 shadow-lg p-5 rounded-4 flex-wrap',
                        styles.form,
                    )}
                >
                    <div className="col-12">
                        <p className="fs-5 fw-semibold">
                            <Link to={'/book'} className="text-decoration-none">
                                Sách
                            </Link>{' '}
                            / <span>Thêm sách</span>
                        </p>
                    </div>
                    <div className="col-12 col-sm-10 col-md-6 col-lg-4 px-3">
                        <Form.Group>
                            <Form.Label>Tên sách:</Form.Label>
                            <Form.Control
                                required
                                placeholder="Nhập tên sách"
                                name="name"
                                onChange={handleForm}
                                value={form.name}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">Vui lòng nhập tên sách</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tên tác giả:</Form.Label>
                            <Form.Control
                                required
                                placeholder="Nhập tên tác giả"
                                name="author"
                                onChange={handleForm}
                                value={form.author}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">Vui lòng nhập tên tác giả</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Loại sách:</Form.Label>
                            <Form.Select onChange={handleForm} name="type" value={form.type}>
                                <option value={'Giáo trình'}>Giáo trình</option>
                                <option value={'Đồ án tốt nghiệp'}>Đồ án tốt nghiệp</option>
                                <option value={'Sách tham khảo'}>Sách tham khảo</option>
                                <option value={'Tạp chí'}>Tạp chí</option>
                                <option value={'Đề tài khoa học'}>Đề tài khoa học</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className="col-12 col-sm-10 col-md-6 col-lg-4 px-3">
                        <Form.Group>
                            <Form.Label>Nơi để:</Form.Label>
                            <Form.Control
                                required
                                placeholder="Nhập nơi để"
                                name="position"
                                onChange={handleForm}
                                value={form.position}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">Vui lòng nhập nơi để</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Số sách còn:</Form.Label>
                            <Form.Control
                                placeholder="Nhập số sách còn"
                                type="number"
                                min={0}
                                name="remaining"
                                required
                                onChange={handleForm}
                                value={form.remaining}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">Vui lòng nhập số sách</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>File sách:</Form.Label>
                            <Form.Control required type="file" name="book" onChange={handleFormByFile}></Form.Control>
                            <Form.Control.Feedback type="invalid">Vui lòng nhập file sách</Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <div className="col-12 col-sm-10 col-md-6 col-lg-4 px-3">
                        <Form.Group>
                            <Form.Label>Ảnh bìa sách</Form.Label>
                            <Form.Control required type="file" name="image" onChange={handleFormByFile}></Form.Control>
                            <Form.Control.Feedback type="invalid">Vui lòng nhập bìa sách</Form.Control.Feedback>
                        </Form.Group>
                        <button className={styles.btnAdd} type="submit">
                            Thêm
                        </button>
                    </div>
                </Form>
            )}
        </div>
    );
}

export default CreateBook;
