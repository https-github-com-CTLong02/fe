import styles from './Contact.module.scss';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Fade } from 'react-reveal';
import Shake from 'react-reveal/Shake';
function Contact() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };
    return (
        <div className={styles.contact} id="contact">
            <Fade bottom>
                <div className={styles.hotline}>
                    <h1>Liên hệ</h1>
                </div>
            </Fade>
            <Fade top>
                <div className={styles.infor}>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group controlId="validationCustom01" className={styles.formGroup}>
                            <Form.Label>Họ và tên</Form.Label>
                            <Form.Control type="text" placeholder="Họ và tên" required />
                            <Form.Control.Feedback type="invalid">Vui lòng nhập đầy đủ họ và tên</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationCustom02" className={styles.formGroup}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Nhập Email" required />
                            <Form.Control.Feedback type="invalid">Vui lòng nhập Email</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationCustom03" className={styles.formGroup}>
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control type="text" placeholder="Nhập số điện thoại" required />
                            <Form.Control.Feedback type="invalid">Vui lòng nhập số điện thoại</Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit" className={styles.btnSubmit}>
                            Gửi thông tin
                        </Button>
                    </Form>
                </div>
            </Fade>
        </div>
    );
}

export default Contact;
