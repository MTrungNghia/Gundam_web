import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import { Link, useNavigate } from "react-router-dom";
import routes from "~/config/routes";
import Image from "~/components/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faSubtract } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Button from "~/components/Button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "~/redux/slice/authSlide";

const cx = classNames.bind(styles);

function Cart() {
    const [cartDetail, setCartDetail] = useState({});
    const [listProduct, setListProduct] = useState([]);
    const [loadBack, setLoadBack] = useState(false);
    const [totalProduct, setTotalProduct] = useState(0);
    const [transportFee, setTransportFee] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        axios.get(`cart/cart_detail/`)
            .then((response) => {
                console.log(response.data.cart_detail.list_product);
                setCartDetail(response.data.cart_detail);
                setListProduct(response.data.cart_detail.list_product);
                console.log(cartDetail);
                console.log(listProduct);
                dispatch(setAuth(true));
            })
            .catch((error) => {
                console.error(error);
                dispatch(setAuth(false));
                if (error.response.status === 403) {
                    alert("Hãy đăng nhập hoặc tạo tài khoản để tiếp tục!");
                    navigate(routes.login);
                }
            });
    }, [loadBack])

    const ProductItem = ({ product }) => { //{ cartItem }
        return (
            <Link to={`/${product.slug}`} className={cx('product-item')}>
                <div className={cx('product-item--image')}>
                    <Image src={`http://localhost:8000/media/${product.image}`} alt="Gohan" />
                </div>
                <div className={cx('product-item--title')}>
                    <span>{product.product_name}</span>
                </div>
            </Link>
        )
    }

    const ProductQuantity = ({ product }) => {
        const [productNumber, setProductNumber] = useState(product.quantity);
        const productInvetory = product.inventory
        const handleSub = () => {
            if (productNumber > 1) {
                const updatedQuantity = productNumber - 1;
                axios.post("cart/update_cart_item/", {
                    product_slug: product.slug,
                    p_quantity: updatedQuantity,
                })
                    .then((response) => {
                        setProductNumber(updatedQuantity);
                    })
            } else {
                alert(`Số lượng cần chọn phải lớn hơn 0`);
            }

        }
        const handleAdd = () => {
            if (productInvetory >= productNumber + 1) {
                const updatedQuantity = productNumber + 1;
                axios
                    .post("cart/update_cart_item/", {
                        product_slug: product.slug,
                        p_quantity: updatedQuantity,
                    })
                    .then((response) => {
                        setProductNumber(updatedQuantity);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                setProductNumber(productInvetory);
                alert(`Số lượng trong kho chỉ là ${productInvetory}`);
            }
        };

        const handleInput = (e) => {
            if (productInvetory >= (Number(e.target.value))) {
                const updatedQuantity = Number(e.target.value);

                axios.post("cart/update_cart_item/", {
                    product_slug: product.slug,
                    p_quantity: updatedQuantity,
                })
                    .then((response) => {
                        setProductNumber(updatedQuantity);
                    })
            } else {
                setProductNumber(productInvetory);
                alert(`Số lượng trong kho chỉ là ${productInvetory}`);
            }

        }

        const handleDelete = (e) => {
            e.preventDefault();
            axios.post("cart/remove_item_in_cart/", {
                product_slug: product.slug,
            })
                .then((response) => {
                    console.log(response);
                    setLoadBack(!loadBack);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        return (
            <>
                <td>
                    <div className={cx('product--quantity')}>
                        <button onClick={handleSub}><FontAwesomeIcon icon={faSubtract} /></button>
                        <input value={productNumber} type='text' onChange={handleInput}
                            onKeyPress={(e) => {
                                const charCode = e.which ? e.which : e.keyCode;
                                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                    e.preventDefault();
                                }
                            }} />
                        <button onClick={handleAdd}><FontAwesomeIcon icon={faAdd} /></button>

                    </div>
                </td>
                <td>
                    <span>{Number(product.price * productNumber).toLocaleString()}</span>
                </td>
                <td>
                    <Button onClick={handleDelete} className={cx('btn-delete')}>Xóa</Button>
                </td>
            </>

        )
    }

    return (<div className={cx('wrapper')}>
        <div className={cx('inner')}>
            <div className={cx('breadcrumb')}>
                <Link to={routes.home}>Trang chủ&nbsp;</Link>
                <span> / </span>
                <span>&nbsp;Giỏ hàng của bạn</span>
            </div>
            <div className={cx('content')}>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>Sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th>Số tiền</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listProduct.map((item, index) => (
                            <tr key={index}>
                                <td colSpan={2}>
                                    <ProductItem product={item} />
                                </td>
                                <td>
                                    <span>{Number(item.price).toLocaleString()}</span>
                                </td>
                                <ProductQuantity product={item} />

                            </tr>
                        ))}
                    </tbody>

                </table>
                <div className={cx('cart-total')}>
                    <div className={cx('cart-total--title')}>
                        <span>Thông tin giỏ hàng</span>
                    </div>
                    <div className={cx('cart-total--finish')}>
                        <span>Tổng </span>
                        <span>{55000}₫</span>
                    </div>
                    <div className={cx('cart-total--btn')}>
                        <Button primary>Thanh toán</Button>
                        {/* <Button onClick={(e) => {
                            e.preventDefault();
                            navigate(routes.home);
                        }} effect>Hủy</Button> */}
                    </div>

                </div>
            </div>
        </div>
    </div>);
}

export default Cart;