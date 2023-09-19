import { useSelector } from 'react-redux';
import styles from './Manage.module.scss';
import Cards from './components/Cards';
import { Row, Col } from 'react-bootstrap';
import Footer from '~/app/components/Footer';
function Manage() {
    const account = useSelector((state) => state.app.account);
    return (
        <div className="bg-light min-vh-100">
            <div className="container-xl">
                <Row>
                    {account && account?.role === 'admin' ? (
                        <Col xs={11} md={6} xl={4} className="my-4">
                            <Cards
                                img={<i className="text-white fs-1 fa-light fa-books-medical"></i>}
                                title={'Tạo sách mới'}
                                sub={'Tạo thêm sách mới gồm những thông tin tên sách, tên tác giả'}
                                des={'Quản lý sách'}
                                to={'createBook'}
                            ></Cards>
                        </Col>
                    ) : (
                        <></>
                    )}

                    <Col xs={11} md={6} xl={4} className="my-4">
                        <Cards
                            img={<i className="text-white fs-1 fa-light fa-book-open-cover"></i>}
                            title={'Xem tất cả các sách'}
                            sub={'Xem danh sách tất cả các sách có trong thư viện '}
                            des={'Quản lý sách'}
                            to={'viewAllBooks'}
                        ></Cards>
                    </Col>

                    {account && account?.role === 'admin' ? (
                        <Col xs={11} md={6} xl={4} className="my-4">
                            <Cards
                                img={
                                    <i className="text-white fs-1 fa-sharp fa-solid fa-rectangle-history-circle-plus"></i>
                                }
                                title={'Thêm sách mượn'}
                                sub={'Thêm sách được mượn , điền những thông tin như ngày mượn, ngày hết hạn, ...'}
                                des={'Quản lý việc mượn sách'}
                                to={'borrowing'}
                            ></Cards>
                        </Col>
                    ) : (
                        <></>
                    )}

                    <Col xs={11} md={6} xl={4} className="my-4">
                        <Cards
                            img={<i className="text-white fs-1 fa-regular fa-list"></i>}
                            title={'Xem danh sách sách mượn'}
                            sub={
                                'Xem sách đã được mượn bởi sinh viên, những thông tin như ngày mượn, ngày hết hạn mượn'
                            }
                            des={'Quản lý việc mượn sách'}
                            to={'borrow'}
                        ></Cards>
                    </Col>
                </Row>
            </div>
            <div className="position-fixed bottom-0 start-0 end-0">
                <Footer></Footer>
            </div>
        </div>
    );
}

export default Manage;
