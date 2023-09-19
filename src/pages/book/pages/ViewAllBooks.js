import { AgGridReact } from 'ag-grid-react';
import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookApi from '~/api/BookApi';
import toasts from '~/app/components/Toast';
import Delete from '../components/Delete';
import { Modal, Col, Spinner } from 'react-bootstrap';
import imgTrash from '~/assets/images/trash.png';
import { useSelector } from 'react-redux';
function ViewAllBooks() {
    const [books, setBooks] = useState([]);
    const [params, setParams] = useState(null);
    const [isModal, setIsModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const account = useSelector((state) => state.app.account);
    const handleUpdate = (event) => {
        const res = BookApi.updateBook({
            id: event.data.id,
            remaining: event.newValue,
        });
        if (res) {
            toasts.showSuccess('Bạn đã cập nhập số lượng sách thành công');
        }
    };
    const columnDefs = [
        {
            field: 'id',
            headerName: 'Mã sách',
        },
        {
            field: 'name',
            headerName: 'Tên sách',
        },
        {
            field: 'author',
            headerName: 'Tên tác giả',
        },
        {
            field: 'type',
            headerName: 'Loại sách',
        },

        {
            field: 'position',
            headerName: 'Vị trí để sách',
        },
        {
            field: 'remaining',
            editable: true,
            headerName: 'Số quyển sách còn',
            onCellValueChanged: handleUpdate,
        },
    ];

    const handleDelete = async () => {
        const response = await BookApi.deleteBook({
            id: params.data.id,
        });
        if (response) {
            toasts.showSuccess('Dữ liệu đã bị thay đổi');
            await repeat();
            setIsModal(false);
        }
    };
    const [colDefs, setColDefs] = useState(columnDefs);
    const dataTypeDefinitions = useMemo(() => {
        return {
            object: {
                baseDataType: 'object',
                extendsDataType: 'object',
                valueParser: (params) => ({ name: params.newValue }),
                valueFormatter: (params) => (params.value == null ? '' : params.value.name),
            },
        };
    }, []);
    const repeat = async () => {
        const res = await BookApi.getBooks();
        setBooks([
            ...res.data.map((book) => {
                return {
                    ...book,
                    option: 'Xóa',
                };
            }),
        ]);
    };
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 180,
            filter: true,
            floatingFilter: true,
            sortable: true,
            // resizable: true,
            // editable: true,
        };
    }, []);
    useEffect(() => {
        setTimeout(() => {
            BookApi.getBooks().then((res) => {
                setBooks([...res.data]);
                setIsLoading(false);
            });
        }, 250);
    }, []);
    useEffect(() => {
        if (account?.role === 'user') {
            setColDefs([
                {
                    field: 'id',
                    headerName: 'Số thứ tự',
                },
                {
                    field: 'name',
                    headerName: 'Tên sách',
                },
                {
                    field: 'author',
                    headerName: 'Tên tác giả',
                },
                {
                    field: 'type',
                    headerName: 'Loại sách',
                },

                {
                    field: 'position',
                    headerName: 'Vị trí để sách',
                },
            ]);
        }
    }, [account]);
    return (
        <div className="container-xl py-5">
            <div>
                <p className="fs-5 fw-semibold">
                    <Link to={'/book'} className="text-decoration-none">
                        Sách
                    </Link>{' '}
                    / <span>Xem tất cả</span>
                </p>
            </div>
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center bg-light" style={{ height: '500px' }}>
                    <Spinner animation="border" variant="primary"></Spinner>
                </div>
            ) : (
                <div className="h-100">
                    <div className="ag-theme-alpine" style={{ height: 500 }}>
                        <AgGridReact
                            rowData={books}
                            columnDefs={colDefs}
                            defaultColDef={defaultColDef}
                            dataTypeDefinitions={dataTypeDefinitions}
                        ></AgGridReact>
                    </div>
                </div>
            )}
            <Modal show={isModal} animation centered>
                <Modal.Header className="d-flex justify-content-center">
                    <Modal.Title>Xóa sách mượn</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#F6F7FB' }} className="p-5">
                    <div className="d-flex justify-content-center">
                        <img src={imgTrash}></img>
                    </div>
                    <div className="fw-semibold mt-3 d-flex flex-column align-items-center">
                        <p>
                            <span>Mã sách : </span>
                            <span>{params?.data.id}</span>
                        </p>
                        <p>
                            <span>Tên sách : </span>
                            <span>{params?.data.name}</span>
                        </p>
                        <p>
                            <span>Tác giả : </span>
                            <span>{params?.data.author}</span>
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Col>
                        <button
                            style={{ background: '#E4E6EF', color: '#313C59' }}
                            className="border-light w-100 px-3 py-2 rounded-3 fw-semibold"
                            onClick={() => {
                                setIsModal(false);
                                setParams();
                            }}
                        >
                            Hủy
                        </button>
                    </Col>
                    <Col>
                        <button
                            style={{ background: '#E13853', color: '#fff', borderColor: '#BF0929' }}
                            className="w-100 px-3 py-2 rounded-3 fw-semibold"
                            onClick={handleDelete}
                        >
                            Xác nhận
                        </button>
                    </Col>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ViewAllBooks;
