import { Routes, Route } from 'react-router-dom';
import Manage from './Manage';
import CreateBook from './pages/CreateBook';
import ViewAll from './pages/ViewAll';
import ViewAllBooks from './pages/ViewAllBooks';
import BorrowBook from './pages/BorrowBook';
import CreateBorrowingBook from './pages/CreateBorrowingBook';
function ManageRouter() {
    return (
        <Routes>
            <Route path="/" element={<Manage></Manage>}></Route>
            <Route path="/createBook" element={<CreateBook></CreateBook>}></Route>
            <Route path="/viewAllBooks" element={<ViewAllBooks></ViewAllBooks>}></Route>
            <Route path="/borrow" element={<BorrowBook></BorrowBook>}></Route>
            <Route path="/borrowing" element={<CreateBorrowingBook></CreateBorrowingBook>}></Route>
        </Routes>
    );
}

export default ManageRouter;
