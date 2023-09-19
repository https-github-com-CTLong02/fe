import clsx from 'clsx';
import { Dropdown, Row, Col } from 'react-bootstrap';
import styles from './Search.module.scss';
import { useState } from 'react';
import bookHelper from '~/utils/bookHelper';
function Search() {
    //condition là một object gồm những điều kiện khi tìm kiếm sách
    const [condition, setCondition] = useState({
        type: 'all',
        keyword: '',
    });
    const handleSetTypeBook = (newType) => {
        setCondition({
            ...condition,
            type: newType,
        });
    };
    return (
        <div className={clsx('min-vh-100 bg-opacity-50', styles.searchPage)}>
            <div className="container-xl">
                <div className="py-4">
                    <div className={clsx(styles.containerSearch, 'd-flex justify-content-center align-items-center')}>
                        <div className="col-lg-8 col-10">
                            <h1 style={{ fontSize: '3rem' }} className="text-white text-center">
                                Tra cứu sách{' '}
                            </h1>
                            <div className="my-3 d-flex align-items-center">
                                <Dropdown className="">
                                    <Dropdown.Toggle className="px-3 py-2 fs-5 bg-white text-secondary rounded-3 border-0">
                                        {bookHelper.changeBookTypeToVN(condition.type)}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="shadow-lg">
                                        <Dropdown.Item
                                            className="fs-5 text-secondary"
                                            onClick={() => handleSetTypeBook('all')}
                                        >
                                            Tất cả
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            className="fs-5 text-secondary"
                                            onClick={() => handleSetTypeBook('title')}
                                        >
                                            {' '}
                                            Nhan đề
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            className="fs-5 text-secondary"
                                            onClick={() => handleSetTypeBook('author')}
                                        >
                                            Tác giả
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <input
                                    placeholder="Nhập từ khóa tìm kiếm"
                                    className="rounded-4 fs-5 px-3 py-2 mx-3  flex-grow-1 text-secondary"
                                ></input>
                                <button
                                    className="rounded-3 px-3 py-2  border-0 text-white fw-semibold fs-4"
                                    style={{ backgroundColor: '#e13853' }}
                                >
                                    Tìm kiếm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
