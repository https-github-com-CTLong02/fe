import clsx from 'clsx';
import styles from './SignUp.module.scss';
import { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function SignUp() {
    const [validated, setValidated] = useState(false);
    const [manager, setManager] = useState(true); // manager === true ? manager : user
    const [formRegisterManager, setFormRegisterManager] = useState({
        fullname: '',
        email: '',
        password: '',
        rePassword: '',
    });
    const [formRegisterUser, setFormRegisterUser] = useState({
        fullname: '',
        email: '',
        mssv: '',
        password: '',
        rePassword: '',
    });
    const handleChangeFormManager = (event) => {
        const { name, value } = event.target;
        setFormRegisterManager({
            ...formRegisterManager,
            [name]: value,
        });
    };
    const handleChangeFormUser = (event) => {
        const { name, value } = event.target;
        setFormRegisterUser({
            ...formRegisterUser,
            [name]: value,
        });
    };
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };
    const handleChangeType = (type) => {
        if (manager && type === 'user') {
            setManager(!manager);
        } else if (!manager && type === 'manager') {
            setManager(!manager);
        }
    };
    return (
        <div className={styles.signUp}>
            <header className={styles.headerForm}>
                <h1>Đăng ký tài khoản e-library Management System</h1>
                <p>
                    Bạn đã có tài khoản e-library Management System?
                    <span>
                        <Link to="/signIn">Đăng nhập</Link>
                    </span>
                </p>
            </header>
            <div className={styles.option}>
                <h4>
                    Loại tài khoản <span className={styles.starRequire}>*</span>
                </h4>
                <Form.Check
                    inline
                    label="Quản lý"
                    name="manager"
                    type={'radio'}
                    id={`inline-radio-1`}
                    checked={manager}
                    onChange={() => handleChangeType('manager')}
                    className="me-5 "
                />
                <Form.Check
                    inline
                    label="Sử dụng"
                    name="invididual"
                    type={'radio'}
                    id={`inline-radio-2`}
                    checked={!manager}
                    onChange={() => handleChangeType('user')}
                />
            </div>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className={styles.form}>
                {manager ? (
                    <div className={styles.bodyForm}>
                        <Form.Group className={styles.formGroup}>
                            <Form.Label>
                                {
                                    <>
                                        {'Họ và tên'}
                                        <span className={styles.starRequire}> *</span>
                                    </>
                                }
                            </Form.Label>
                            <Form.Control
                                name="fullname"
                                type="text"
                                placeholder={'Nhập họ tên'}
                                required
                                value={formRegisterManager.fullname}
                                onChange={handleChangeFormManager}
                            />
                            <Form.Control.Feedback type="invalid">{'Bạn chưa nhập họ tên'}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={styles.formGroup}>
                            <Form.Label>
                                {
                                    <>
                                        {'email'}
                                        <span className={styles.starRequire}> *</span>
                                    </>
                                }
                            </Form.Label>
                            <Form.Control
                                name="email"
                                type={'email'}
                                placeholder={'Nhập email'}
                                required
                                value={formRegisterManager.email}
                                onChange={handleChangeFormManager}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">{'Bạn chưa nhập email'}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={styles.formGroup}>
                            <Form.Label>
                                {
                                    <>
                                        Mật khẩu<span className={styles.starRequire}> *</span>
                                    </>
                                }
                            </Form.Label>
                            <Form.Control
                                name="password"
                                type="text"
                                placeholder="Nhập mật khẩu"
                                required
                                value={formRegisterManager.password}
                                onChange={handleChangeFormManager}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">Bạn chưa nhập mật khẩu</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={styles.formGroup}>
                            <Form.Label>
                                {
                                    <>
                                        Nhập lại mật khẩu<span className={styles.starRequire}> *</span>
                                    </>
                                }
                            </Form.Label>
                            <Form.Control
                                name="rePassword"
                                type="text"
                                placeholder="Nhập lại mật khẩu"
                                required
                                value={formRegisterManager.rePassword}
                                onChange={handleChangeFormManager}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">{'Bạn chưa nhập lại mật khẩu'}</Form.Control.Feedback>
                        </Form.Group>
                    </div>
                ) : (
                    <div className={styles.bodyForm}>
                        <Form.Group className={styles.formGroup}>
                            <Form.Label>
                                {
                                    <>
                                        {'Họ và tên'}
                                        <span className={styles.starRequire}> *</span>
                                    </>
                                }
                            </Form.Label>
                            <Form.Control
                                onChange={handleChangeFormUser}
                                name="fullname"
                                type="text"
                                placeholder={'Nhập họ tên'}
                                required
                                value={formRegisterUser.fullname}
                            />
                            <Form.Control.Feedback type="invalid">{'Bạn chưa nhập họ tên'}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={styles.formGroup}>
                            <Form.Label>
                                {
                                    <>
                                        {'email'}
                                        <span className={styles.starRequire}> *</span>
                                    </>
                                }
                            </Form.Label>
                            <Form.Control
                                name="email"
                                type={'email'}
                                placeholder={'Nhập email'}
                                required
                                onChange={handleChangeFormUser}
                                value={formRegisterUser.email}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">{'Bạn chưa nhập email'}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={styles.formGroup}>
                            <Form.Label>
                                {
                                    <>
                                        {'Mã số sinh viên'}
                                        <span className={styles.starRequire}> *</span>
                                    </>
                                }
                            </Form.Label>
                            <Form.Control
                                name="mssv"
                                type={'text'}
                                placeholder={'Nhập mssv'}
                                required
                                onChange={handleChangeFormUser}
                                value={formRegisterUser.mssv}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">{'Bạn chưa nhập mssv'}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={styles.formGroup}>
                            <Form.Label>
                                {
                                    <>
                                        Mật khẩu<span className={styles.starRequire}> *</span>
                                    </>
                                }
                            </Form.Label>
                            <Form.Control
                                name="password"
                                type="text"
                                placeholder="Nhập mật khẩu"
                                required
                                onChange={handleChangeFormUser}
                                value={formRegisterUser.password}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">Bạn chưa nhập mật khẩu</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={styles.formGroup}>
                            <Form.Label>
                                {
                                    <>
                                        Nhập lại mật khẩu<span className={styles.starRequire}> *</span>
                                    </>
                                }
                            </Form.Label>
                            <Form.Control
                                name="rePassword"
                                type="text"
                                placeholder="Nhập lại mật khẩu"
                                required
                                onChange={handleChangeFormUser}
                                value={formRegisterUser.rePassword}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">{'Bạn chưa nhập lại mật khẩu'}</Form.Control.Feedback>
                        </Form.Group>
                    </div>
                )}
                <div className={styles.finish}>
                    <Form.Check
                        required
                        label={
                            <>
                                Tôi đã hiểu và đồng ý <a href="/term">Điều khoản dịch vụ</a> do ICORP eContract cung cấp
                            </>
                        }
                        defaultChecked={'checked'}
                        feedback="Bạn phải đồng ý với chúng tôi để tiếp tục"
                        feedbackType="invalid"
                        className={clsx(styles.agree, 'd-flex align-items-center')}
                    ></Form.Check>
                    <Button type="submit" className={styles.btnSubmit}>
                        Đăng ký
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default SignUp;
