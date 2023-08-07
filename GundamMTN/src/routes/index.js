import config from "~/config";

import Home from "~/pages/Home";
import Cart from "~/pages/Cart";
import Search from "~/pages/Search";
import Product from "~/pages/Detail/Product";
import Category from "~/pages/Detail/Category";
import Introduce from "~/pages/Introduce";
import Login from "~/pages/Account/Login";
import Register from "~/pages/Account/Register";
import ForgotPassword from "~/pages/Account/ForgotPassword";
import AddProduct from "~/pages/AddProduct";
import Profile from "~/pages/Account/Profile";
import AddressSaved from "~/pages/Account/AddressSaved";
import ChangePassword from "~/pages/Account/ChangePassword";
import Orders from "~/pages/Account/Orders";
import CheckOut from "~/pages/CheckOut";

const publicRoutes = [
    { path: config.routes.home, component: Home },

    { path: config.routes.cart, component: Cart },
    { path: config.routes.checkout, component: CheckOut, layout: null },

    { path: config.routes.search, component: Search },

    { path: config.routes.proDetail, component: Product },
    { path: config.routes.proCreate, component: AddProduct },


    { path: config.routes.cateDetail, component: Category },
    { path: config.routes.introduce, component: Introduce },

    { path: config.routes.profile, component: Profile },
    { path: config.routes.addressSaved, component: AddressSaved },
    { path: config.routes.changePassword, component: ChangePassword },
    { path: config.routes.orders, component: Orders },

    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },
    { path: config.routes.forgotPassword, component: ForgotPassword, layout: null },


]

export default publicRoutes;