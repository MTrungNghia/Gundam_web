import { Link, useNavigate, useParams } from 'react-router-dom';
import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import routes from '~/config/routes';
import images from '~/assets/images';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faCartShopping, faHandshake, faMedal, faShield, faSubtract, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from '~/components/Image';
import { setAuth } from '~/redux/slice/authSlide';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

function Product() {
    const { productName } = useParams();
    const [product, setProduct] = useState({});
    const [srcImage, setSrcImage] = useState("");
    const [productNumber, setProductNumber] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/product/detail/${productName}/`)
            .then((res) => {
                setProduct(res.data);
                setSrcImage(res.data.image);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    function ListLi({ icon, title }) {
        return (
            <>
                <FontAwesomeIcon icon={icon} />
                <span>{title}</span>
            </>
        )
    }

    function HandleSrcImage(image) {
        setSrcImage(image);
    }

    function handleSub() {
        if (productNumber > 1) {
            setProductNumber(productNumber - 1)
        }
    }

    function handleAdd() {
        setProductNumber(productNumber + 1)
    }

    function handleAddProduct(e) {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        if (product.inventory <= productNumber) {
            setProductNumber(product.inventory)
        }
        axios.post("cart/add_item_cart/", {
            product_slug: product.slug,
            p_quantity: productNumber,
        })
            .then((response) => {
                console(response);
            })
            .catch(function (error) {
                if (error.response.status === 403) {
                    alert("Hãy đăng nhập hoặc tạo tài khoản để tiếp tục!");
                    navigate(routes.login);
                }
            });
    }

    return (<div className={cx('wrapper')}>
        <div className={cx('inner')}>
            <div className={cx('breadcrumb')}>
                <Link to={routes.home}>Trang chủ&nbsp;</Link>
                <span> / </span>
                <Link to={`/category/${product.category_slug}`}>&nbsp;{product.category_name}&nbsp;</Link>
                <span> /&nbsp;</span>
                <span>{product.product_name}</span>
            </div>
            <div className={cx('content')}>
                <div className={cx('product__detail')}>
                    <span className={cx('title')}>{product.product_name}</span>
                    <div className={cx('product__detail--main')}>
                        <div className={cx('product__detail--image')}>
                            <div className={cx('product__detail--image-main')}>
                                <img src={`http://localhost:8000${srcImage}`} alt={product.product_name} />
                            </div>
                            <ul className={cx('product__detail--image-list')}>
                                <li onClick={() => HandleSrcImage(product.image)}><img src={`http://localhost:8000${product.image}`} alt={product.product_name} /></li>
                                {product.images && product.images.map((image, index) => (
                                    <li key={index} onClick={() => HandleSrcImage(image.Images)}><Image src={`http://localhost:8000${image.Images}`} alt={product.product_name} /></li>
                                ))}
                            </ul>
                        </div>
                        <div className={cx('product__detail--infor')}>
                            <div className={cx('product__detail--infor--category')}>
                                <div className={cx('status')}>
                                    <span>Tình trạng:&nbsp;</span>
                                    {product.inventory > 0 ? (<p>Còn hàng</p>) : (<p>Hết hàng</p>)}
                                </div>
                                <div className={cx('status')}>
                                    <span>Loại:&nbsp;</span>
                                    <p>Mô hình mecha/gundam</p>
                                </div>
                            </div>
                            <div className={cx('product__detail--infor--main')}>
                                <div className={cx('price')}>
                                    <span>Giá:  </span>
                                    <p>{Number(product.price).toLocaleString()}₫</p>
                                </div>
                                {/* <div className={cx('combo')}>
                                    <span>Sản phẩm: </span>
                                    <p>Mô hình mecha/gundam</p>
                                </div> */}
                                <div className={cx('quantity')}>
                                    <span>Số lượng: </span>
                                    <button onClick={handleSub}><FontAwesomeIcon icon={faSubtract} /></button>
                                    <button onClick={handleAdd}><FontAwesomeIcon icon={faAdd} /></button>
                                    <input value={productNumber} type='text' onChange={(e) => setProductNumber(Number(e.target.value))}
                                        onKeyPress={(e) => {
                                            const charCode = e.which ? e.which : e.keyCode;
                                            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                e.preventDefault();
                                            }
                                        }} />
                                </div>
                                <div className={cx('btn')}>
                                    {product.inventory > 0 ? (
                                        <>
                                            <Button
                                                effect={true}
                                                primary={true}
                                                onClick={handleAddProduct}
                                                leftIcon={<FontAwesomeIcon icon={faCartShopping}
                                                />}
                                            >Thêm vào giỏ</Button>
                                            <Button effect={true} className={cx('btn-buy')}>Mua ngay</Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                disabled
                                                primary
                                                leftIcon={<FontAwesomeIcon icon={faCartShopping}
                                                />}
                                            >Hết hàng</Button>
                                            <Button to={routes.home} effect={true} className={cx('btn-buy')}>Tiếp tục mua hàng</Button>
                                        </>)}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('product__policy')}>
                    <div className={cx('product__policy--main')}>
                        <span className={cx('product__policy--title')}>Chỉ có tại Gundam Chất</span>
                        <ul className={cx('product__policy--list')}>
                            <li>
                                <ListLi icon={faShield} title={"Sản phẩm an toàn"} />
                            </li>
                            <li>
                                <ListLi icon={faHandshake} title={"Chất lượng cam kết"} />
                            </li>
                            <li>
                                <ListLi icon={faMedal} title={"Dịch vụ vượt trội"} />
                            </li>
                            <li>
                                <ListLi icon={faTruckFast} title={"Giao hàng nhanh chóng"} />
                            </li>
                        </ul></div>
                    <div className={cx('product__policy--support')}>
                        <img src={images.support} alt='Nhân viên tư vấn' />
                        <div className={cx('product__policy--support--contact')}>
                            <span>Hỗ trợ mua hàng</span>
                            <Link to="tel:0342952312">0342 95 2312</Link>
                        </div>
                    </div>

                </div>
            </div>
            <div className={cx('product__description')}>
                <div className={cx('product__description--title')}>
                    <h6>Thông tin chi tiết</h6>
                </div>
                <div className={cx('product__description--content')}>
                    <p>{product.description}</p>
                    {/* <Button primary rightIcon={<FontAwesomeIcon icon={faChevronDown} />}>Xem thêm</Button> */}
                </div>
            </div>
        </div>
    </div>);
}

export default Product;