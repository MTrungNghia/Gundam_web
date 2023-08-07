const routes = {
    home: '/',
    search: '/search/:searchName',
    cart: '/cart',
    checkout: 'checkout',

    proDetail: '/:productName',
    proCreate: '/product/create',

    cateDetail: 'category/:categoryName',
    introduce: '/introduce',

    login: '/login',
    register: '/register',
    forgotPassword: '/forgot',
    profile: '/account/profile',
    addressSaved: '/account/addresses',
    changePassword: '/account/change_password',
    orders: '/account/orders',

}

export default routes;