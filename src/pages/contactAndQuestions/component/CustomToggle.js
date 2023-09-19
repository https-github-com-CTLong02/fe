import { useState } from 'react';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import iconPlus from '~/assets/icons/iconPlus.svg';
import iconSub from '~/assets/icons/iconSub.svg';
import Spin from 'react-reveal/Spin';

function CustomToggle({ question, eventKey, indexActive }) {
    const decoratedOnClick = useAccordionButton(eventKey);
    return (
        <div type="button" onClick={decoratedOnClick} style={{ display: 'flex', background: '#fff', padding: '8px' }}>
            {indexActive === eventKey ? (
                <Spin duration={300}>
                    <img src={iconSub} style={{ width: '18px' }}></img>
                </Spin>
            ) : (
                <img src={iconPlus} style={{ width: '18px' }}></img>
            )}
            <p style={{ color: '#18214D', padding: '0 10px', margin: '0', fontSize: '1.47rem', fontWeight: 500 }}>
                {question}
            </p>
        </div>
    );
}
export default CustomToggle;
