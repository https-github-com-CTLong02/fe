import { Dropdown, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import BookApi from '~/api/BookApi';
import styles from './ViewAll.module.scss';
function ViewAll() {
    const [books, setBooks] = useState([]);
    const [total, setTotal] = useState(0);
    const [listAuthor, setListAuthor] = useState([]);
    const [types, setTypes] = useState([]);
    const [booksByFilter, setBooksByFilter] = useState([]);
    const [authorByFilter, setAuthorByFilter] = useState('Tất cả');
    const [typeByFilter, setTypeByFilter] = useState('Tất cả');
    const [search, setSearch] = useState();
    const [editId, setEditId] = useState(0);
    const handleFilterByAuthor = (author) => {
        setAuthorByFilter(author);
    };
    const handleFilterByType = (type) => {
        setTypeByFilter(type);
    };
    const handleUpdate = async (id, value) => {
        const res = await BookApi.updateBook({
            id: id,
            remaining: value,
        });
        console.log('res', res);
    };
    useEffect(() => {
        BookApi.getBooks().then((res) => {
            setBooks([...res.data]);
            let iTotal = 0;
            const setAuthor = new Set();
            const setType = new Set();
            res.data.forEach((book, index) => {
                iTotal += book.remaining;
                setAuthor.add(book.author);
                setType.add(book.type);
            });
            setTotal(iTotal);
            setListAuthor([...setAuthor]);
            setTypes([...setType]);
            setBooksByFilter([...res.data]);
        });
    }, []);
    useEffect(() => {
        if (typeByFilter === 'Tất cả' && authorByFilter === 'Tất cả') {
            setBooksByFilter([
                ...books.filter((book) => {
                    return book.name.toLowerCase().includes(search ? search.toLowerCase() : '');
                }),
            ]);
        } else if (typeByFilter === 'Tất cả') {
            setBooksByFilter([
                ...books.filter((book) => {
                    return (
                        book.author === authorByFilter &&
                        book.name.toLowerCase().includes(search ? search.toLowerCase() : '')
                    );
                }),
            ]);
        } else if (authorByFilter === 'Tất cả') {
            setBooksByFilter([
                ...books.filter((book) => {
                    return (
                        book.type === typeByFilter &&
                        book.name.toLowerCase().includes(search ? search.toLowerCase() : '')
                    );
                }),
            ]);
        } else {
            setBooksByFilter([
                ...books.filter((book) => {
                    return (
                        book.type === typeByFilter &&
                        book.author === authorByFilter &&
                        book.name.toLowerCase().includes(search ? search.toLowerCase() : '')
                    );
                }),
            ]);
        }
    }, [typeByFilter, authorByFilter, search]);
    return (
        <div className="min-vh-100 p-4" style={{ backgroundColor: '#eff1f5' }}>
            <div className="container-xl px-3 py-2 bg-white rounded-4 shadow-lg">
                <div className="d-flex align-items-center py-3 justify-content-between">
                    <span className="fs-4 fw-semibold">{total} cuốn sách</span>
                    <div className="d-flex align-items-center">
                        <div className="bg-white px-3 py-2 rounded-3 border">
                            <i className="fw-semibold fs-4 fa-regular fa-magnifying-glass me-2"></i>
                            <input
                                className={clsx('border-0', styles.inputSearch)}
                                onChange={(event) => setSearch(event.target.value)}
                                value={search}
                            ></input>
                        </div>
                        <div className="mx-3">
                            <span className="fs-6 fw-semibold me-2">Tác giả:</span>
                            <Dropdown className="d-inline" drop="down-centered">
                                <Dropdown.Toggle className="bg-transparent text-secondary border-secondary fw-semibold">
                                    {authorByFilter}
                                </Dropdown.Toggle>
                                <Dropdown.Menu align={'end'} className="border-0 shadow-lg">
                                    <Dropdown.Item
                                        className="fw-semibold"
                                        onClick={() => handleFilterByAuthor('Tất cả')}
                                    >
                                        Tất cả
                                    </Dropdown.Item>
                                    {listAuthor.map((author, index) => {
                                        return (
                                            <Dropdown.Item
                                                key={index}
                                                className="fw-semibold"
                                                onClick={() => handleFilterByAuthor(author)}
                                            >
                                                {author}
                                            </Dropdown.Item>
                                        );
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="mx-3">
                            <span className="fs-6 fw-semibold me-2">Loại sách:</span>
                            <Dropdown className="d-inline" drop="down-centered">
                                <Dropdown.Toggle className="bg-transparent text-secondary border-secondary fw-semibold">
                                    {typeByFilter}
                                </Dropdown.Toggle>
                                <Dropdown.Menu align={'end'} className="border-0 shadow-lg">
                                    <Dropdown.Item className="fw-semibold" onClick={() => handleFilterByType('Tất cả')}>
                                        Tất cả
                                    </Dropdown.Item>
                                    {types.map((type, index) => {
                                        return (
                                            <Dropdown.Item
                                                key={index}
                                                className="fw-semibold"
                                                onClick={() => handleFilterByType(type)}
                                            >
                                                {type}
                                            </Dropdown.Item>
                                        );
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <Table striped responsive bordered className={styles.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tên</th>
                            <th>Tác giả</th>
                            <th>Loại sách</th>
                            <th>Ví trị sách</th>
                            <th>Số quyển sách còn</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {booksByFilter.map((book, index) => {
                            return (
                                <tr key={index}>
                                    <td>{book.id}</td>
                                    <td>{book.name}</td>
                                    <td>{book.author}</td>
                                    <td>{book.type}</td>
                                    <td>{book.position}</td>
                                    {book.id === editId ? (
                                        <td>
                                            <input
                                                type="number"
                                                defaultValue={book.remaining}
                                                className="w-100 border-0"
                                                autoFocus
                                                onBlur={(event) => handleUpdate(book.id, event.target.value)}
                                            ></input>
                                        </td>
                                    ) : (
                                        <td>{book.remaining}</td>
                                    )}
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            delay={{ show: 200, hide: 200 }}
                                            overlay={(props) => {
                                                return (
                                                    <Tooltip {...props} id="1">
                                                        Xem chi tiết
                                                    </Tooltip>
                                                );
                                            }}
                                        >
                                            <i
                                                role="button"
                                                className="mx-3 fa-regular fa-eye"
                                                style={{ color: '#1c78e0' }}
                                            ></i>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement="top"
                                            delay={{ show: 200, hide: 200 }}
                                            overlay={(props) => {
                                                return (
                                                    <Tooltip {...props} id="1">
                                                        Sửa thông tin
                                                    </Tooltip>
                                                );
                                            }}
                                        >
                                            <i
                                                role="button"
                                                className="mx-3 fa-regular fa-pen"
                                                style={{ color: '#1c78e0' }}
                                                onClick={() => setEditId(book.id)}
                                            ></i>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement="top"
                                            delay={{ show: 200, hide: 200 }}
                                            overlay={(props) => {
                                                return (
                                                    <Tooltip {...props} id="1">
                                                        Xóa sách
                                                    </Tooltip>
                                                );
                                            }}
                                        >
                                            <i
                                                role="button"
                                                className="mx-3 fa-regular fa-trash"
                                                style={{ color: 'rgb(215, 41, 41)' }}
                                            ></i>
                                        </OverlayTrigger>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default ViewAll;
