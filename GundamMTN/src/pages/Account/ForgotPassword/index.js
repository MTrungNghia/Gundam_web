import classNames from "classnames/bind";
import styles from "./ForgotPassword.module.scss";
import Button from "~/components/Button";
import { Link } from "react-router-dom";
import routes from "~/config/routes";
import images from "~/assets/images";

const cx = classNames.bind(styles);

function ForgotPassword() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("forgot__title")}>
                    <h4>Đặt lại mật khẩu </h4>
                    <div className={cx('url')}>
                        <Link to={routes.home}>Trang chủ</Link>
                        <span>/ Quên mật khẩu</span>
                    </div>
                    <span>Chúng tôi sẽ gửi cho bạn một email để kích hoạt việc đặt lại mật khẩu.</span>
                </div>
                <form className={cx("forgot__form")}>
                    <input placeholder="Email" name="email" />
                    <div className={cx("forgot__form--btn")}>
                        <Button type="sybmit">Gửi</Button>
                        <Link to={routes.login}>Hủy</Link>
                    </div>
                </form>
                <div className={cx("diferent__login")}>
                    <div className={cx("diferent__login--title")}>
                        <span>Hoặc đăng nhập qua</span>
                    </div>
                    <div className={cx("diferent__login--btns")}>
                        <img src={images.facebookBtn.default} alt="Đăng nhập bằng Facebook" />
                        <img src={images.googleBtn.default} alt="Đăng nhập bằng Google" />
                    </div>
                </div>
                <div className={cx("register")}>
                    <h4>Đăng ký</h4>
                    <span>Tạo tài khoản để quản lý đơn hàng, và các thông tin thanh toán, gửi hàng một cách đơn giản hơn.</span>
                    <Button to={routes.register}>Tạo tài khoản</Button>
                    <Button to={routes.home}>Quay về trang chủ</Button>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;