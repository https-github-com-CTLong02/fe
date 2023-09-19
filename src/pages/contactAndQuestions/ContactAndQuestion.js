import styles from './QuestionAndContact.module.scss';
import { Row, Col } from 'react-bootstrap';
import Question from './component/Question';
import Contact from './component/Contact';
import { useEffect, useState } from 'react';
function QuestionAndContact() {
    const [faqs, setFaqs] = useState([
        {
            question: 'Bạn đọc có thể truy cập trang Thư viện số từ đâu?',
            answer: 'Bạn đọc có thể truy cập trang Thư viện số từ bất kỳ máy tính, điện thoại, … có kết nối mạng internet',
        },
        {
            question: 'Cách đăng nhập vào Trang Thư viện số?',
            answer: 'Sinh viên ĐHBK HN: Chọn đăng nhập bằng tài khoản MS Office 365 (HUST),  Email có tên nhà cung cấp là: hust.edu.vn',
        },
        {
            question: 'Các gợi ý tìm kiếm tài liệu tại trang Thư viện số?',
            answer: 'Tìm kiếm tài liệu theo từ khóa bất kỳ hoặc tìm kiếm tài liệu theo Nhan đề, tác giả, năm xuất bản, chủ đề, Người hướng dẫn (luận văn, luận án)',
        },
    ]);
    return (
        <section className={styles.help}>
            <div className="container-xl p-4">
                <Row>
                    <Col lg={7}>
                        <Question arrQuestionAndAnswers={[...faqs]}></Question>
                    </Col>
                    <Col lg={5}>
                        <Contact></Contact>
                    </Col>
                </Row>
            </div>
        </section>
    );
}
export default QuestionAndContact;
