import HomeLayout from '~/layouts/Home/HomeLayout';
import Home from '~/pages/Home/Home';
import LoginLayout from '~/layouts/Login/LoginLayout';
import SignIn from '~/pages/SignIn/SignIn';
import SignUp from '~/pages/SignUp/SignUp';
import Forgot from '~/pages/Forgot/Forgot';
import Search from '~/pages/search/Search';
import QuestionAndContact from '~/pages/contactAndQuestions/ContactAndQuestion';
import DashBoard from '~/pages/dashboard/Dashboard';
import LayoutDashboard from '~/layouts/dashboard/LayoutDashboard';
import ManageRouter from '~/pages/book';
import ManageAccountRouter from '~/pages/account';
const publicRoutes = [
    {
        path: '/',
        component: Home,
        layout: HomeLayout,
    },
    {
        path: '/search',
        component: Search,
        layout: HomeLayout,
    },
    {
        path: '/questions&contact',
        component: QuestionAndContact,
        layout: HomeLayout,
    },
    {
        path: '/signIn',
        component: SignIn,
        layout: LoginLayout,
    },
    {
        path: '/signUp',
        component: SignUp,
        layout: LoginLayout,
    },
    {
        path: '/forgot',
        component: Forgot,
        layout: LoginLayout,
    },
];
const privateRoutes = [
    {
        path: '/dashboard',
        component: DashBoard,
        layout: LayoutDashboard,
    },
    {
        path: '/book/*',
        component: ManageRouter,
        layout: LayoutDashboard,
    },
    {
        path: 'account/*',
        component: ManageAccountRouter,
        layout: LayoutDashboard,
    },
];

export { publicRoutes, privateRoutes };
