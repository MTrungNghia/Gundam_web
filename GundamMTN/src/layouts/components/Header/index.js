import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import images from "~/assets/images";
import Search from "../Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCartShopping, faCircleUser, faMapLocation, faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import config from "~/config";
import routes from "~/config/routes";
import { useState } from "react";
import { ListCategory } from "./ListCategory";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

function Header() {
    const [showUserOperations, setShowUserOperations] = useState(false);
    const auth = useSelector(state => state.auth.value);

    function ItemNavbar({
        item }) {
        return (<div className={cx('navbar__category')}>
            <Link title={item.title} to={item.link} className={cx('navbar__category--title')}>
                <h5>{item.title}</h5>
            </Link>
            {item.itemsCategory && (
                <div className={cx('navbar__category--items')}>
                    {item.itemsCategory.map((childItem, index) => (
                        <Link title={childItem.title} to={childItem.link} key={index}>{childItem.title}</Link>
                    ))}
                </div>
            )}
        </div>)
    }

    function show() {
        setShowUserOperations(!showUserOperations);
    }
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={routes.home} className={cx('logo')}>
                    <img src={images.logo} alt="logo" />
                </Link>
                <div className={cx('container')}>
                    <div className={cx('content')}>
                        <Search />
                        <div className={cx('store-infor')}>
                            <Link to="tel:0981313335" title="Liên hệ" className={cx('hotline')}>
                                <FontAwesomeIcon icon={faPhoneVolume} />
                                <span>Hotline: <br></br> 0123456789</span>
                            </Link>
                            <Link title="Hệ thống cửa hàng" className={cx('store-system')}>
                                <FontAwesomeIcon icon={faMapLocation} />
                                <span>Hệ thống <br></br> cửa hàng</span>
                            </Link>
                        </div>
                        <div className={cx('user-infor')}>
                            <div title="Thông tin đăng nhập" className={cx('user')} onClick={show}>
                                <FontAwesomeIcon icon={faCircleUser} />
                                {showUserOperations && (
                                    <div className={cx("user-operations")}>
                                        {
                                            (auth === false) ?
                                                (<ul>
                                                    <li><a href={routes.login}>Đăng nhập</a></li>
                                                    <li><a href={routes.register}>Đăng ký</a></li>
                                                </ul>) : (
                                                    <ul>
                                                        <li><a href={routes.profile}>Xem thông tin</a></li>
                                                    </ul>)
                                        }

                                    </div>
                                )}
                            </div>
                            <Link to={(auth === false) ? routes.login : routes.cart} title="Giỏ hàng" className={cx('cart')}>
                                <FontAwesomeIcon icon={faCartShopping} />
                                <span>0</span>
                            </Link>
                        </div>
                    </div>
                    <ul className={cx('navbar')}>
                        <div className={cx('navbar_inner')}>
                            <li>
                                <Link to={config.routes.home} title="Trang chủ">Trang chủ</Link>
                            </li>
                            <li>
                                <Link to={config.routes.introduce} title="Giới thiệu">Giới thiệu</Link>
                            </li>
                            <li>
                                <Link title="Khuyến mãi hot">Khuyến mãi hot</Link>
                            </li>
                            <li>
                                <Link title="Tin tức">Tin tức</Link>
                            </li>
                            <li>
                                <Link title="Liên hệ">Liên hệ</Link>
                            </li>
                            <li
                                className={cx('products__navbar')}
                                title="Sản phẩm"
                            >
                                <Link>Sản phẩm</Link>
                                <FontAwesomeIcon icon={faCaretDown} />
                                <div className={cx('products')}>
                                    {ListCategory.map((item, index) => (
                                        <ItemNavbar key={index} item={item} />
                                    ))}
                                </div>
                            </li>

                        </div>
                    </ul>
                </div>

            </div>
        </header>
    );
}

export default Header;