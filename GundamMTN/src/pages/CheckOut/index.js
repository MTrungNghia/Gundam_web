import classNames from "classnames/bind";
import styles from "./CheckOut.module.scss";
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import Image from "~/components/Image";
import Button from "~/components/Button";
import axios from "axios";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

// function CheckOut({ user_id, listProduct }) {
function CheckOut() {

    const [listAddress, setListAddress] = useState(null);
    const [currentAddress, setCurrentAddress] = useState(null);
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [wards, setWards] = useState("");
    const [note, setNote] = useState("");

    const [quantity, setQuantity] = useState(0);

    const [discountCode, setDiscountCode] = useState(null);
    const [discountAmount, setDiscountAmounte] = useState(0);

    const [isChecked, setIsChecked] = useState(true);

    function init() {
        console.log("init");
        let currentAddress = listAddress.filter(address => address.is_default === true);
        setCurrentAddress(currentAddress);
        setAddressDetail(currentAddress[0]);
        console.log("init");
        console.log(currentAddress);
    }

    function setAddressDetail(address) {
        setFullName(address.full_name);
        setPhoneNumber(address.phone_number);
        setAddress(address.address);
        setProvince(address.province);
        setDistrict(address.district);
        setWards(address.wards);
    }

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        // axios.get(`account/list_user_address/${user_id}`)
        axios.get(`account/list_user_address/2`)
            .then((res) => {
                setListAddress(res.data);
                // init();
                let currentAddress = listAddress.filter(address => address.is_default === true);
                setCurrentAddress(currentAddress);
                console.log(currentAddress);
                setAddressDetail(currentAddress[0]);
                console.log("init");
                console.log(currentAddress);
            })
            .catch(function (error) {

            });
    }, []);

    function handleForm() {
        const formData = new FormData();
        formData.append("userAddress_id", currentAddress[0].id);
        formData.append("note", note);
        formData.append("quantity", quantity);
        formData.append("order_status", currentAddress[0].id);
        formData.append("payment_method", currentAddress[0].id);
        formData.append("total_price", currentAddress[0].id);
        formData.append("discount_code", currentAddress[0].id);
    }

    const products =
    {
        "image": "bannerPokemon",
        "product_name": "MÔ HÌNH LẮP RÁP SD BD R EX VALKYLANDER VÀNG BANDAI",
        "price": 299000,
        "quantity": 1,
    }

    const ProductItem = ({ product }) => {
        return (
            <div className={cx('products')}>
                <div className={cx('product-detail')}>
                    <div className={cx('product-detail--main')}>
                        <div className={cx('product-detail--image')}>
                            <Image src={images.bannerDragonBall} alt={product.product_name} />
                            <div className={cx('product-detail--quantity')}>
                                <span>{product.quantity}</span>
                            </div>
                        </div>
                        <div className={cx('product-detail--title')}>
                            <span>{product.product_name} {product.product_name}</span>
                        </div>
                    </div>
                </div>
                <div className={cx('product-detail--total-price')}>
                    <span>{product.price}₫</span>
                </div>
            </div>
        )
    }

    const handleInputChange = () => {

    }

    const handleSaleCode = (e) => {
        e.preventDefault();
        axios.get(`order/create-discount-code/?sale_code=${discountCode}`)
            .then(response => {
                // Xử lý dữ liệu khi nhận phản hồi thành công
                console.log(response.data);
                setDiscountAmounte(response.data.discount);
            })
            .catch(error => {
                // Xử lý lỗi khi có lỗi trong quá trình yêu cầu
                console.error(error);
            });
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('infor-order')}>
                    <div className={cx('infor-order-header')}>
                        <img src={images.logo} alt="logo" />
                    </div>
                    <div className={cx('infor-order-main')}>
                        <div className={cx('infor-buy')}>
                            <div className={cx('infor-buy--title')}>
                                <h5>Thông tin mua hàng</h5>
                            </div>
                            <form onSubmit={handleForm} className={cx('infor-buy--form')}>
                                <div className={cx('form-group')}>
                                    <select name="address" value={currentAddress || ""} className={cx('form-control--select')} id="inputField" required>
                                        {/* <option value="">-- Select an address --</option> */}
                                        {listAddress && listAddress.map((address, index) => (
                                            <option key={index} value="option2">{address.address}</option>
                                        ))}

                                    </select>
                                    <label for="inputField" className={cx('floating-label')}>Chọn địa chỉ cần giao</label>
                                </div>
                                <div className={cx('form-group')}>
                                    <input type="text" name="email" value={"hêlo"} disabled className={cx('form-control')} id="inputField" required onChange={handleInputChange} />
                                    <label for="inputField" className={cx('floating-label')}>Email (tùy chọn)</label>
                                </div>
                                <div className={cx('form-group')}>
                                    <input type="text" name="name" className={cx('form-control')} value={fullName} disabled id="inputField" required onChange={handleInputChange} />
                                    <label for="inputField" className={cx('floating-label')}>Họ và tên</label>
                                </div>
                                <div className={cx('form-group')}>
                                    <input type="text" name="phoneNumber" className={cx('form-control')} value={phoneNumber} disabled id="inputField" required onChange={handleInputChange} />
                                    <label for="inputField" className={cx('floating-label')}>Số điện thoại</label>
                                </div>
                                <div className={cx('form-group')}>
                                    <input type="text" name="location" className={cx('form-control')} value={address} disabled id="inputField" required onChange={handleInputChange} />
                                    <label for="inputField" className={cx('floating-label')}>Địa chỉ</label>
                                </div>
                                <div className={cx('form-group')}>
                                    <input type="text" name="province" className={cx('form-control')} value={province} disabled id="inputField" required onChange={handleInputChange} />
                                    <label for="inputField" className={cx('floating-label')}>Tỉnh thành</label>
                                </div>
                                <div className={cx('form-group')}>
                                    <input type="text" name="email" className={cx('form-control')} value={district} disabled id="inputField" required onChange={handleInputChange} />
                                    <label for="inputField" className={cx('floating-label')}>Quận huyện</label>
                                </div>
                                <div className={cx('form-group')}>
                                    <input type="text" name="email" className={cx('form-control')} value={wards} disabled id="inputField" required onChange={handleInputChange} />
                                    <label for="inputField" className={cx('floating-label')}>Phường, xã</label>
                                </div>
                                <div className={cx('form-group')}>
                                    <textarea type="text" name="email" className={cx('form-control')} value={note} id="inputField" required onChange={handleInputChange} />
                                    <label for="inputField" className={cx('floating-label')}>Ghi chú</label>
                                </div>
                            </form>
                        </div>
                        <div className={cx('infor-ship')}>
                            <div className={cx('infor-ship--shipment')}>
                                <h5>Vận chuyển</h5>
                                <div className={cx('infor-ship--shipment__main')}>
                                    <div className={cx('shipment__main')}>
                                        <input type="checkbox" checked={isChecked} onChange={handleInputChange} />
                                        <label>Giao hàng tận nơi</label>
                                    </div>
                                    <label>40.000₫</label>
                                </div>
                            </div>
                            <div className={cx('infor-ship--checkout')}>
                                <h5>Thanh toán</h5>
                                <div className={cx('infor-ship--checkout__main')}>
                                    <div className={cx('checkout__main')}>
                                        <input type="checkbox" onChange={handleInputChange} />
                                        <label>Giao hàng tận nơi</label>
                                    </div>
                                    <FontAwesomeIcon icon={faMoneyBill} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('infor-total')}>
                    <div className={cx('infor-total--title')}>
                        <h5>Đơn hàng ({1} sản phẩm)</h5>
                    </div>
                    <div className={cx('infor-total--list-products')}>
                        <ProductItem product={products} />
                        <ProductItem product={products} />
                        <ProductItem product={products} />
                        <ProductItem product={products} />
                        <ProductItem product={products} />
                        <ProductItem product={products} />

                    </div>
                    <div className={cx('infor-total--code-sale')}>
                        <form onSubmit={handleSaleCode} class={cx('form-group')}>
                            <input type="name"
                                name="sale-code"
                                className={cx('form-control')}
                                id="inputField"
                                required
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                            />
                            <label for="inputField" class={cx('floating-label')}>Nhập mã giảm giá</label>
                            <Button type="submit" primary effect>Áp dụng</Button>
                        </form>
                        {discountAmount !== 0 && (
                            <div className={cx('infor-total--main-item')}>
                                <label>Số tiền giảm giá</label>
                                <label>{Number(discountAmount).toLocaleString()}₫</label>
                            </div>
                        )}

                    </div>
                    <div className={cx('infor-total--detail')}>
                        <div className={cx('infor-total--main-item')}>
                            <label>Tạm tính</label>
                            <label>1.274.000₫</label>
                        </div>
                        <div className={cx('infor-total--main-item')}>
                            <label>Phí vận chuyển</label>
                            <label>40.000₫</label>
                        </div>
                    </div>
                    <div className={cx('infor-total--total')}>
                        <div className={cx('infor-total--main-item')}>
                            <label>Tổng cộng</label>
                            <label className={cx('total')}>40.000₫</label>
                        </div>
                        <div className={cx('infor-total--function')}>
                            <Button>Quay lại giỏ hàng</Button>
                            <Button type="submit" primary effect>Đặt hàng</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

export default CheckOut;
