import { Form, Button, Col, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './SignIn.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AuthApi from '~/api/AuthApi';
import { signIn, setAccount } from '~/store/appSlice';
import toasts from '~/app/components/Toast';
import UserApi from '~/api/UserApi';
function SignIn() {
    const navigative = useNavigate();
    const isLogin = useSelector((state) => state.app.isLogin);
    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [formData, setFormData] = useState({
        username: undefined,
        password: undefined,
        terms: true,
    });
    const [show, setShow] = useState(false);
    const handle = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSavePassword = () => {
        setFormData({ ...formData, terms: !formData.terms });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await AuthApi.signIn({
            username: formData.username,
            password: formData.password,
        });
        if (response) {
            dispatch(signIn(response.access_token));
            const resInfor = await UserApi.getInforUser();
            dispatch(setAccount(resInfor.data));
            toasts.showSuccess(`Xin chào ${resInfor.data.name}`);
            navigative('/dashboard');
        }
        setIsloading(false);
    };
    return (
        <div className={styles.signIn}>
            <header className={styles.headerForm}>
                <h1>Đăng nhập e-library Management System</h1>
            </header>
            <Form
                noValidate
                validated={validated}
                onSubmit={(event) => {
                    handleSubmit(event);
                    setIsloading(true);
                }}
                className={styles.form}
            >
                <div className={styles.bodyForm}>
                    <Form.Group controlId="validationCustom01" className={styles.formGroup}>
                        <Form.Label>Email/Tên đăng nhập</Form.Label>
                        <Form.Control
                            name="username"
                            type="text"
                            placeholder="Nhập Email/Tên đăng nhập"
                            required
                            onChange={handle}
                            autoComplete="username"
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            <div className={styles.feedback}>Bạn chưa nhập Email/Tên đăng nhập</div>
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                        controlId="validationCustom02"
                        className={styles.formGroup}
                        style={{ position: 'relative' }}
                    >
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control
                            name="password"
                            type={show ? 'text' : 'password'}
                            placeholder="Nhập mật khẩu"
                            required
                            onChange={handle}
                            autoComplete="current-password"
                        ></Form.Control>
                        {formData.password ? (
                            <div className={styles.show} onClick={() => setShow(!show)}>
                                {show ? (
                                    <i class="fa-sharp fa-regular fa-eye-slash"></i>
                                ) : (
                                    <i class="fa-regular fa-eye"></i>
                                )}
                            </div>
                        ) : (
                            <></>
                        )}
                        <Form.Control.Feedback type="invalid">
                            <div className={styles.feedback}>Bạn chưa nhập mật khẩu</div>
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Row style={{ justifyContent: 'space-between' }}>
                        <Col>
                            <Link to="/forgot" style={{ color: 'rgb(46, 98, 233)', fontSize: '1rem', fontWeight: 500 }}>
                                Quên mật khẩu ?
                            </Link>
                        </Col>
                        <Col style={{ display: 'contents' }}>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    className={styles.formCheck}
                                    name="terms"
                                    label="Ghi nhớ mật khẩu"
                                    defaultChecked={true}
                                    feedbackType="invalid"
                                    id="validationFormik0"
                                    onChange={handleSavePassword}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
                <div className={styles.suggestSingUp}>
                    <Button type="submit" className={styles.btnSubmit}>
                        Đăng nhập
                        {isLoading ? (
                            <Spinner
                                className="ms-2"
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        ) : (
                            <></>
                        )}
                    </Button>
                    {/* <h4 style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 600 }}>
                        Bạn chưa có tài khoản e-library Management System?
                    </h4> */}
                    {/* <Link to="/signUp">
                        <Button type="button" className={styles.btnSignUp}>
                            Đăng ký
                        </Button>
                    </Link> */}
                </div>
            </Form>
        </div>
    );
}

export default SignIn;
