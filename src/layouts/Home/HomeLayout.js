import { Nav, Container, Navbar, Dropdown } from 'react-bootstrap';
import clsx from 'clsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { signOut, setAccount } from '~/store/appSlice';
import UserApi from '~/api/UserApi';
import styles from './HomeLayout.module.scss';
import hust from '~/assets/images/hust.png';
function HomeLayout({ children }) {
    const account = useSelector((state) => state.app.account);
    const isLogin = useSelector((state) => state.app.isLogin);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const handleSignOut = () => {
        dispatch(signOut());
        navigate('/');
    };
    useEffect(() => {
        if (account === undefined && localStorage.getItem('access_token')) {
            UserApi.getInforUser().then((res) => {
                dispatch(setAccount(res.data));
            });
        }
    }, [account]);
    console.log(account);
    return (
        <div>
            <Navbar expand="lg" className="shadow-lg fixed-top bg-white" style={{ height: '84px' }}>
                <Container fluid="xl">
                    <div>
                        <Navbar.Brand href="/">
                            <img src={hust} className="img-fluid" style={{ height: '48px' }}></img>
                        </Navbar.Brand>
                    </div>
                    <div className={`position-relative ${account ? 'd-flex' : ''}`}>
                        <Navbar.Toggle aria-controls="navbarScroll" className="position-relative" />
                        <Navbar.Collapse id="navbarScroll" className={styles.navCollapse}>
                            <Nav className="me-auto my-2 my-lg-0">
                                <div className={clsx(styles.navContainer, 'me-5 d-flex align-items-center')}>
                                    <div className="py-2 me-3" onClick={() => navigate('/')}>
                                        <span
                                            className={clsx(' fw-semibold fs-5', {
                                                [styles.active]: location.pathname === '/',
                                            })}
                                            role="button"
                                        >
                                            Trang chủ
                                        </span>
                                    </div>
                                    {/* <div className="py-2 me-3" onClick={() => navigate('/search')}>
                                        <span
                                            className={clsx(' fw-semibold fs-5', {
                                                [styles.active]: location.pathname === '/search',
                                            })}
                                            role="button"
                                        >
                                            Tra cứu
                                        </span>
                                    </div> */}
                                    <div className="py-2 me-3" onClick={() => navigate('/questions&contact')}>
                                        <span
                                            className={clsx(' fw-semibold fs-5', {
                                                [styles.active]: location.pathname === '/questions&contact',
                                            })}
                                            role="button"
                                        >
                                            Câu hỏi & Liên hệ
                                        </span>
                                    </div>
                                </div>
                                {!account ? (
                                    <div className={styles.btns}>
                                        <button
                                            className={clsx(styles.btnSignIn, 'me-2 rounded-1 px-2 py-2 fs-5')}
                                            onClick={() => navigate('/signIn')}
                                        >
                                            Đăng nhập
                                        </button>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                        {account ? (
                            <div className={clsx(styles.user)}>
                                <Dropdown>
                                    <Dropdown.Toggle className="border-0 bg-transparent ">
                                        <i className="fa-regular fa-user text-secondary fs-3"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu align={'end'} className={clsx(styles.menu, 'border-0 shadow-lg')}>
                                        <Dropdown.Item className={styles.item}>
                                            <i className="fs-4 me-2 fa-light fa-envelope"></i>
                                            {account?.email}
                                        </Dropdown.Item>
                                        <Dropdown.Item className={styles.item}>
                                            <i className="fs-4 me-2 fa-light fa-address-card"></i>
                                            {account?.name}
                                        </Dropdown.Item>
                                        <Dropdown.Item className={styles.item}>
                                            <i className="fs-4 me-2 fa-light fa-house"></i>
                                            {account?.class}
                                        </Dropdown.Item>
                                        <Dropdown.Item className={styles.item}>
                                            <i className="fs-4 me-2 fa-regular fa-school"></i>
                                            {account?.faculty}
                                        </Dropdown.Item>
                                        <Dropdown.Item className={clsx(styles.item, 'border-0')}>
                                            <button
                                                className={clsx(styles.btnSignOut, 'rounded-3 px-3 py-1 ')}
                                                onClick={handleSignOut}
                                            >
                                                <i className="fa-regular fa-right-from-bracket me-2"></i>
                                                Đăng xuất
                                            </button>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </Container>
            </Navbar>
            <div style={{ marginTop: '84px' }}>{children}</div>
        </div>
    );
}

export default HomeLayout;
