import { Accordion, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import CustomToggle from './CustomToggle';
import { Fade } from 'react-reveal';
import styles from './Question.module.scss';
import { useState } from 'react';

function Question({ arrQuestionAndAnswers }) {
    const [indexActive, setIndexActive] = useState(null);
    return (
        <div className={styles.question}>
            <div className="mb-4">
                <h1 style={{ fontSize: '3.6rem', fontWeight: 700, color: '#18214D' }}>Các câu hỏi thường gặp</h1>
            </div>
            <div className={styles.listQuestion}>
                <Accordion defaultActiveKey={null} flush onSelect={(e) => setIndexActive(e)}>
                    {Array.isArray(arrQuestionAndAnswers) ? (
                        arrQuestionAndAnswers.map((questionAndAnswer, index) => {
                            return (
                                <Fade top key={index}>
                                    <Card style={{ background: '#fff', border: 'none' }} key={index}>
                                        <Card.Header
                                            style={{
                                                background: '#fff',
                                                marginBottom: '10px',
                                            }}
                                        >
                                            <CustomToggle
                                                eventKey={index.toString()}
                                                question={questionAndAnswer.question}
                                                indexActive={indexActive}
                                            ></CustomToggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey={index.toString()} className={styles.collapse}>
                                            <Card.Body as="div" className={styles.answer}>
                                                {questionAndAnswer.answer}
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Fade>
                            );
                        })
                    ) : (
                        <></>
                    )}
                </Accordion>
            </div>
        </div>
    );
}

export default Question;
