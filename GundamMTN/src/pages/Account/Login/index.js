import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import Button from "~/components/Button";
import { Link, useNavigate } from "react-router-dom";
import routes from "~/config/routes";
import images from "~/assets/images";
import { useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [userLogin, setUserLogin] = useState(null);

    const navigate = useNavigate();


    function handleLogin(e) {
        e.preventDefault();

        axios.post("account/login/", {
            email: email,
            password: password,
        })
            .then((rep) => {
                // setUserLogin(rep.data.user);
                // localStorage.setItem('user_id', rep.data.user.id);
                // localStorage.setItem('email', rep.data.user.email);
                const token = rep.data.token;
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                localStorage.setItem('authToken', token);
                navigate(routes.home);

            })
            .catch((error) => {

            })
    }

    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("login__title")}>
                    <h4>Đăng nhập</h4>
                    <div className={cx('url')}>
                        <Link to={routes.home}>Trang chủ </Link>
                        <span>/ Đăng nhập tài khoản</span>
                    </div>
                </div>
                <form onSubmit={handleLogin} className={cx("login__form")}>
                    <input placeholder="Email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Mật khẩu" value={password} name="password" onChange={(e) => setPassword(e.target.value)} />
                    <div className={cx("login__form--btn")}>
                        <Button type="submit">Đăng nhập</Button>
                        <Link to={routes.forgotPassword}>Quên mật khẩu?</Link>
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

export default Login;