import { Form, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Forgot.module.scss';
function Forgot() {
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState();
    const navigative = useNavigate();
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };
    console.log(email);
    return (
        <div className={styles.forgot}>
            <header className={styles.headerForm}>
                <h1>Đăng nhập e-library Management System</h1>
                <p>
                    Bạn muốn đăng nhập e-library Management System?
                    <span>
                        <Link to="/signIn">Đăng nhập</Link>
                    </span>
                </p>
            </header>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.bodyForm}>
                    <Form.Group controlId="validationCustom01" className={styles.formGroup}>
                        <Form.Label>Email/Tên đăng nhập</Form.Label>
                        <Form.Control
                            name="email"
                            type="email"
                            placeholder="Nhập Email/Tên đăng nhập"
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                            autoComplete="email"
                            required
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            <div className={styles.feedback}>Bạn chưa nhập đúng Email/Tên đăng nhập</div>
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>
                <div className={styles.suggestSingUp}>
                    <Button type="submit" className={styles.btnSubmit}>
                        Quên mật khẩu
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default Forgot;
