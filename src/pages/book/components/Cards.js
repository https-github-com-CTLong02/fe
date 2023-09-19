import clsx from 'clsx';
import styles from './Cards.module.scss';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
function Cards({ img, title, sub, des, to }) {
    const navigative = useNavigate();
    return (
        <Card
            className={clsx(styles.card, 'd-flex flex-column align-items-center py-4 px-2 h-100 bg-white shadow-lg ')}
            onClick={() => navigative(`${to}`)}
        >
            {/* <Card.Img variant="top" src={img} style={{ objectFit: 'cover', width: '70px' }} className="py-2" /> */}
            <div
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{ height: 70, width: 70, backgroundColor: 'rgb(46, 98, 233)' }}
            >
                {img}
            </div>
            <Card.Body className="d-flex flex-column align-items-center justify-content-between">
                <Card.Title
                    style={{ fontSize: '1.3rem', color: '#3f4254', fontWeight: 700 }}
                    className="py-2 text-center"
                >
                    {title}
                </Card.Title>
                <Card.Text
                    style={{ fontSize: '1.2rem', color: '#3f4254', fontWeight: 500 }}
                    className="py-2 text-center"
                >
                    {sub}
                </Card.Text>
                <Card.Text
                    style={{ fontSize: '1rem', color: 'rgb(46, 98, 233)', fontWeight: 600 }}
                    className="py-2 text-center"
                >
                    {des}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Cards;
