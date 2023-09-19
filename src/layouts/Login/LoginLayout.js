import { Nav, Container, Navbar, Col, Row } from 'react-bootstrap';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import hust from '~/assets/images/hust.png';
import styles from './LoginLayout.module.scss';
function LoginLayout({ children }) {
    const navigate = useNavigate();
    return (
        <div className={styles.Login}>
            <Navbar
                expand="lg"
                className="shadow-lg position-fixed top-0 start-0 end-0 bg-white"
                style={{ height: '84px', zIndex: 10 }}
            >
                <Container fluid="lg">
                    <div>
                        <Navbar.Brand href="/">
                            <img src={hust} className="img-fluid" style={{ height: '48px' }}></img>
                        </Navbar.Brand>
                    </div>
                    <div className="position-relative">
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll" className={styles.navCollapse}>
                            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}>
                                <div className={clsx('d-flex align-items-center', styles.navContainer)}>
                                    <div className="me-3" onClick={() => navigate('/')} role="button">
                                        <span className="fw-semibold fs-5">Trang chủ</span>
                                    </div>
                                    {/* <div className="me-3" onClick={() => navigate('/search')} role="button">
                                        <span className="fw-semibold fs-5">Tra cứu</span>
                                    </div> */}
                                    <div className="me-3" onClick={() => navigate('/questions&contact')} role="button">
                                        <span className="fw-semibold fs-5">Câu hỏi & Liên hệ</span>
                                    </div>
                                </div>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </Container>
            </Navbar>
            <div style={{ marginTop: '84px' }} className="h-100">
                <Container fluid="xl" className="h-100">
                    <Row
                        className="align-items-center h-100 justify-content-around py-4"
                        style={{ minHeight: 'calc(100vh - 84px)' }}
                    >
                        <Col xs={10} md={6} lg={5}>
                            <div className="text-white">
                                <h1 className="fs-1 fw-bold">Thư viện số tiện ích</h1>
                                <p className="fs-5 fw-semibold">
                                    Giúp trải nghiệm việc tra cứu và quản lý thư viện theo một cách mới. Tiện lợi và dễ
                                    dàng
                                </p>
                            </div>
                        </Col>
                        <Col xs={10} md={6} lg={5}>
                            {children}
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default LoginLayout;
