import classNames from "classnames/bind";
import styles from "./AddressSaved.module.scss";
import { Link, useNavigate } from "react-router-dom";
import routes from "~/config/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchange, faHome, faLocation, faPenToSquare, faPowerOff, faRecycle, faUser } from "@fortawesome/free-solid-svg-icons";
import images from "~/assets/images";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "~/components/Button";
import { useDispatch } from "react-redux";
import { setAuth } from "~/redux/slice/authSlide";

const cx = classNames.bind(styles);

function AddressSaved() {
    const [user, setUser] = useState(null);
    const [userAddress, setUserAddress] = useState(null);
    const [loadingApi, setLoadingApi] = useState(false);

    // const [listProvince, setListProvince] = useState(null);
    // const [listDivision, setListDivision] = useState(null);
    // const [listDistrict, setListDistrict] = useState(null);

    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    // const [province, setProvince] = useState({ code: null, name: '' });
    // const [division, setDivision] = useState({ code: null, name: '' });
    // const [district, setDistrict] = useState({ code: null, name: '' });
    const [province, setProvince] = useState('');
    const [division, setDivision] = useState('');
    const [district, setDistrict] = useState('');
    const [address, setAddress] = useState('');
    const [addressDefault, setAddressDefault] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        axios.get('account/user/')
            .then((res) => {
                setUser(res.data);
                dispatch(setAuth(true));
            })
            .catch(function (error) {
                dispatch(setAuth(false));
                if (error.response.status === 403) {
                    navigate(routes.home);
                }
            });
    }, [dispatch, navigate]);

    useEffect(() => {
        if (user != null) {
            axios.get(`account/list_user_address/${user.id}`)
                .then((response) => {
                    setUserAddress(response.data);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [user, loadingApi])

    // api province:
    // useEffect(() => {
    //     if (showForm === true) {
    //         axios.get(`https://provinces.open-api.vn/api/p/`)
    //             .then((response) => {
    //                 setListProvince(response.data);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             })
    //     }
    // }, [showForm])

    // useEffect(() => {
    //     if (province.code !== null) {
    //         axios.get(`https://provinces.open-api.vn/api/p/${province.code}?depth=2`)
    //             .then((response) => {
    //                 setListDivision(response.data.districts);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             })
    //     }
    // }, [province.code]);

    // useEffect(() => {
    //     if (division.code !== null) {

    //         axios.get(`https://provinces.open-api.vn/api/d/${division.code}?depth=2`)
    //             .then((response) => {
    //                 setListDistrict(response.data.wards);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             })
    //     }
    // }, [division.code]);

    function ListLi({ onClick, to, icon, title }) {
        return (
            <a onClick={onClick} href={to}>
                <FontAwesomeIcon icon={icon} />
                <span>{title}</span>
            </a>
        )
    }

    function handleLogout() {
        localStorage.clear();
        setAuth(false);
        axios.defaults.headers.common['Authorization'] = null;
        axios.post("account/logout/")
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
        navigate(routes.login);
    }

    function handleForm(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append('user', user.id);
        formData.append('full_name', name);
        formData.append('phone_number', phoneNumber);
        formData.append('province', province);
        formData.append('district', division);
        formData.append('wards', district);
        formData.append('address', address);
        formData.append('is_default', addressDefault);
        // alert(formData.data);
        // for (let pair of formData.entries()) {
        //     console.log(pair[0], pair[1]);
        // }
        // Gửi dữ liệu đến server
        axios.post('account/create_address/', formData)
            .then(function (response) {
                // Xử lý phản hồi từ server (nếu cần)
                setLoadingApi(!loadingApi);
                if (response.data.success !== undefined) {
                    setShowForm(!showForm);
                    alert("Thêm địa chỉ thành công.")
                }
                console.log(response.data);
            })
            .catch(function (error) {
                // Xử lý lỗi (nếu có)
                console.error(error);
            });

    }

    return (<div className={cx('wrapper')}>
        {showForm && (
            <div className={cx('form_main')}>
                <form onSubmit={handleForm} className={cx('address-form')}>
                    <h2 className={cx('form-title')}>Thêm địa chỉ mới:</h2>
                    <div className={cx('form-group')}>
                        <div className={cx('input-group')}>
                            <label htmlFor="fullname" className={cx('input-label')}>Họ tên:</label>
                            <input
                                type="text"
                                id="fullname"
                                name="fullname"
                                className={cx('input-text')}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className={cx('input-group')}>
                            <label htmlFor="phoneNumber" className={cx('input-label')}>Số điện thoại:</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                className={cx('input-text')}
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        {/* <div className={cx('input-group')}>
                            <label htmlFor="province" className={cx('input-label')}>Tỉnh thành:</label>
                            <select id="province" name="province" className={cx('select-input')} value={province.code} onChange={(e) => {
                                const selectedProvince = listProvince.find(p => Number(p.code) === Number(e.target.value));
                                console.log(e.target.value);
                                setProvince({ code: selectedProvince.code, name: selectedProvince.name });
                            }}>
                                <option>__Chọn thành phố__</option>
                                {listProvince && listProvince.map((province, index) => (
                                    <option key={index} value={province.code}>{province.name}</option>
                                ))}
                            </select>

                        </div>
                        <div className={cx('input-group')}>
                            <label htmlFor="division" className={cx('input-label')}>Quận huyện:</label>
                            <select id="division" name="division" className={cx('select-input')}
                                value={division.code}
                                onChange={(e) => {
                                    const selectedDivision = listDivision.find(p => Number(p.code) === Number(e.target.value));
                                    setDivision({ code: selectedDivision.code, name: selectedDivision.name });
                                }}
                            >
                                <option>__Chọn quận huyện__</option>
                                {listDivision && listDivision.map((division, index) => (
                                    <option key={index} value={division.code}>{division.name}</option>
                                ))}

                            </select>
                        </div >
                        <div className={cx('input-group')}>
                            <label label htmlFor="district" className={cx('input-label')} > Phường xã:</label >
                            <select id="district" name="district" className={cx('select-input')}
                                value={district.code}
                                onChange={(e) => {
                                    const selectedDistrict = listDistrict.find(p => Number(p.code) === Number(e.target.value));
                                    setDistrict({ code: selectedDistrict.code, name: selectedDistrict.name });
                                }}
                            >
                                <option>__Chọn phường xã__</option>
                                {listDistrict && listDistrict.map((district, index) => (
                                    <option key={index} value={district.code}>{district.name}</option>
                                ))}
                            </select>
                        </div > */}
                        <div className={cx('input-group')}>
                            <label htmlFor="province" className={cx('input-label')}>Tỉnh, thành:</label>
                            <input
                                type="text"
                                id="province"
                                name="province"
                                className={cx('input-text')}
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                            />
                        </div>
                        <div className={cx('input-group')}>
                            <label htmlFor="division" className={cx('input-label')}>Quận, huyện:</label>
                            <input
                                type="text"
                                id="division"
                                name="division"
                                className={cx('input-text')}
                                value={division}
                                onChange={(e) => setDivision(e.target.value)}
                            />
                        </div>
                        <div className={cx('input-group')}>
                            <label htmlFor="district" className={cx('input-label')}>Phường, xã:</label>
                            <input
                                type="text"
                                id="district"
                                name="district"
                                className={cx('input-text')}
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                            />
                        </div>
                        <div className={cx('input-group')}>
                            <label htmlFor="address" className={cx('input-label')}>Địa chỉ:</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className={cx('input-text')}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                    </div >
                    <div className={cx('form-group')}>
                        < input type="checkbox" id="addressDefault" name="addressDefault" checked={addressDefault} onChange={(e) => setAddressDefault(e.target.checked)} className={cx('checkbox-input')} />
                        <label htmlFor="addressDefault" className={cx('checkbox-label')}>Đặt địa chỉ làm mặc định</label>
                    </div >
                    <div className={cx('button-group')}>
                        <button type="submit" className={cx('submit-button')} > Thêm địa chỉ</button >
                        <button type="button" onClick={() => setShowForm(!showForm)} className={cx('cancel-button')}>Hủy</button>
                    </div >
                </form >

            </div >
        )}
        <div className={cx('inner')}>
            <div className={cx('breadcrumb')}>
                <Link to={routes.home}>Trang chủ&nbsp;</Link>
            </div>
            <div className={cx('content')}>
                <div className={cx('profile__detail')}>
                    <div className={cx('profile__detail--main')}>
                        <div className={cx('order-history')}>
                            <Link to={routes.orders}>
                                <img src={images.orderHistory} alt="Lịch sử đơn hàng" />
                                <span>Lịch sử đơn hàng</span>
                            </Link>
                        </div>
                        <div className={cx('profile__detail--welcome')}>
                            <Link>
                                <img src={images.account} alt="Account" />
                                {user !== null && (

                                    <span>Xin chào, <span className={cx('profile__detail--name')}>{user.first_name}</span></span>
                                )}
                            </Link>
                        </div>
                    </div>
                    <div className={cx('profile__detail--infor')}>
                        <Button className={cx('btn-add')} onClick={() => setShowForm(!showForm)} primary leftIcon={<FontAwesomeIcon icon={faHome} />} >Thêm địa chỉ</Button>
                        {userAddress !== null && userAddress.map((address, index) => (
                            <div key={index} className={cx('profile__detail--address')}>
                                <div className={cx('address__detail')}>
                                    <span><b>Họ tên:</b> {address.full_name}{address.is_default && (<span className={cx('address__default')}> (Địa chỉ mặc định)</span>)}</span>
                                    <span><b>Địa chỉ:</b> {address.wards + " - " + address.district + " - " + address.province}</span>
                                    <span><b>Địa chỉ chi tiết:</b> {address.address}</span>
                                    <span><b>Số điện thoại:</b> {address.phone_number}</span>
                                </div>
                                <div className={cx('profile__detail--btn')}>
                                    <button><FontAwesomeIcon icon={faPenToSquare} />Sửa</button>
                                    {!address.is_default && (<button><FontAwesomeIcon icon={faRecycle} /> Xóa</button>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cx('profile__function')}>
                    <ul className={cx('profile__function--list')}>
                        <li>
                            <ListLi to={routes.profile} icon={faUser} title={"Thông tin cá nhân"} />
                        </li>
                        <li>
                            <ListLi to={routes.addressSaved} icon={faLocation} title={"Địa chỉ đã lưu (0)"} />
                        </li>
                        <li>
                            <ListLi to={routes.changePassword} icon={faExchange} title={"Đổi mật khẩu"} />
                        </li>
                        <li>
                            <ListLi onClick={handleLogout} icon={faPowerOff} title={"Đăng xuất"} />
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div >
    );
}

export default AddressSaved;