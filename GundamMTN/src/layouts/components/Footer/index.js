import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import images from "~/assets/images";
import Button from "~/components/Button";
import routes from "~/config/routes";

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer>
            <div className={cx('inner')}>
                <div className={cx('content-footer')}>
                    <Link to={routes.home} className={cx('logo')}>
                        <img src={images.logo} alt="logo" />
                    </Link>
                    <div className={cx('policy')}>
                        <span className={cx('title')}>Chính sách</span>
                        <ul className={cx('list-policy')}>
                            <li>
                                <Link>
                                    Chính sách bảo mật
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    Chính sách vận chuyển
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    Chính sách đổi trả
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    Quy định sử dụng
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('map')}>
                        <span className={cx('title')}>Map</span>
                        <img src={images.map} alt="logo" />
                    </div>
                    <div className={cx('fanpage')}>
                        <span className={cx('title')}>Fanpage</span>
                        <img src={images.page} alt="logo" />
                    </div>
                </div>

                <div className={cx('infor-shop')}>
                    <div className={cx('contact')}>
                        <span className={cx('title')}>Thông tin liên hệ</span>
                        <ul className={cx('list-contact')}>
                            <li>
                                <b>Địa chỉ: </b>Số 8 Ngõ 9/16 Trần Quốc Hoàn, Cầu Giấy, Hà Nội
                            </li>
                            <li>
                                <b>Email: </b> <a href="mailto:Gundamchatvn@gmail.com">Gundamchatvn@gmail.com</a>
                            </li>
                            <li>
                                <b>Hotline: </b><a href="tel:0981313335">0981.31.33.35</a>
                            </li>
                            <li>
                                <b>Hotline: </b><a href="tel:0342952312">0342 95 2312</a>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('link-outside-shop')}>
                        <div className={cx('social-network')}>
                            <span className={cx('title')}>Kết nối với chúng tôi</span>
                            <div className={cx('list-social-network')}>
                                <Link className={cx('effect')}>
                                    <img src={images.facebook} alt="facebook" />
                                </Link>
                                <Link className={cx('effect')}>
                                    <img src={images.twitter} alt="twitter" />
                                </Link>
                                <Link className={cx('effect')}>
                                    <img src={images.instagram} alt="instagram" />
                                </Link>
                                <Link className={cx('effect')}>
                                    <img src={images.youtube} alt="youtube" />
                                </Link>
                                <Link className={cx('effect')}>
                                    <img src={images.shoppe} alt="shoppe" />
                                </Link>
                                <Link className={cx('effect')}>
                                    <img src={images.lazada} alt="lazada" />
                                </Link>
                            </div>

                        </div>
                        <div className={cx('checkout')}>
                            <span className={cx('title')}>Phương thức thanh toán</span>
                            <div>

                                <Link className={cx('paypal')}>
                                    <img src={images.paypal} alt="paypal" />
                                </Link>
                                <Link className={cx('visa')}>
                                    <img src={images.visa} alt="visa" />
                                </Link>
                                <Link className={cx('american')}>
                                    <img src={images.american} alt="american" />
                                </Link>
                                <Link className={cx('materCard')}>
                                    <img src={images.materCard} alt="materCard" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Link to={routes.introduce} className={cx('shop_system')}>
                        <img src={images.store} alt="materCard" />
                        <Button className={cx('btn')} primary>Hệ thống cửa hàng</Button>
                    </Link>
                </div>

            </div>
        </footer>
    );
}

export default Footer;