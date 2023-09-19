import { useEffect, useState, useMemo } from 'react';
import Styles from './ManageAccount.module.scss';
import UserApi from '~/api/UserApi';
import { AgGridReact } from 'ag-grid-react';
function ManageAccount() {
    const columnDefs = [
        {
            field: 'id',
            headerName: 'Mã người dùng',
        },
        {
            field: 'username',
            headerName: 'Tên đăng nhập',
        },
        {
            field: 'name',
            headerName: 'Họ tên',
        },
        {
            field: 'email',
            headerName: 'Email',
        },
        {
            field: 'class',
            headerName: 'Lớp học',
        },
        {
            field: 'faculty',
            headerName: 'Khoa',
        },
        {
            field: 'bookBorrowed',
            cellDataType: 'number',
            headerName: 'Số sách có thể mượn',
        },
    ];
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
    const [listUser, setListUser] = useState([]);
    useEffect(() => {
        UserApi.getListUser().then((res) => {
            setListUser([
                ...res.data.filter((user, index) => {
                    return user.role === 'user';
                }),
            ]);
        });
    }, []);
    const [colDefs, setColDefs] = useState([...columnDefs]);
    return (
        <div className="container-xl py-5">
            <div className="h-100">
                <div className="ag-theme-alpine" style={{ height: 500 }}>
                    <AgGridReact
                        rowData={listUser}
                        columnDefs={colDefs}
                        defaultColDef={defaultColDef}
                        dataTypeDefinitions={dataTypeDefinitions}
                    ></AgGridReact>
                </div>
            </div>
        </div>
    );
}

export default ManageAccount;
