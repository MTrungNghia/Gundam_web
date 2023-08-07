import { Link, useParams } from 'react-router-dom';
import classNames from "classnames/bind";
import styles from "./Category.module.scss";
import routes from '~/config/routes';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from '~/components/ProductItem';

const cx = classNames.bind(styles);

function Category() {
    const { categoryName } = useParams();
    const [category, setcategory] = useState({});
    const [listCategory, setListCategory] = useState([]);

    const [nextPager, setNextPager] = useState(1);
    const [currentPager, setCurrentPager] = useState(1);
    const [previosPager, setPreviosPager] = useState(1);
    const [numberPager, setnumberPager] = useState(1);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/category/listOther/${categoryName}/`)
            .then(function (res) {
                setListCategory(res.data)
            })
            .catch(function (error) {

            })
    }, [])

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/category/products/${categoryName}/?page=${currentPager}`)
            .then((res) => {
                let data = res.data;
                setcategory(data);
                setnumberPager(data.pages);

            })
            .catch((error) => {
                console.log(error)
            })
    }, [currentPager])

    // function handlePagination(index) {
    //     setCurrentPager(index);
    // }
    const handlePagination = (pageNumber) => () => {
        // Cập nhật currentPage
        setCurrentPager(pageNumber);
        if (pageNumber === 1) {
            setPreviosPager(1);
            setNextPager(pageNumber + 1);
        }
        else if (pageNumber === numberPager) {
            setPreviosPager(pageNumber - 1);
            setNextPager(numberPager);
        } else {
            setPreviosPager(pageNumber - 1);
            setNextPager(pageNumber + 1);
        }
    };

    return (<div className={cx('wrapper')}>
        <div className={cx('inner')}>
            <div className={cx('breadcrumb')}>
                <Link to={routes.home}>Trang chủ&nbsp;</Link>
                <span> / </span>
                <span to={routes.home}>&nbsp;{listCategory.category_name}&nbsp;</span>

            </div>
            <div className={cx('content')}>
                <div className={cx('product-filter')}>
                    <h5>Bộ lọc sản phẩm</h5>
                    <span>Giúp lọc nhanh sản phẩm bạn tìm kiếm</span>
                    <div className={cx('product-brand')}>
                        <h6>Thương hiệu</h6>
                        <span>Đang cập nhật...</span>
                    </div>
                    {category.products?.length !== 0 && (
                        <div className={cx('product-filter__price')}>
                            <h6>Lọc giá</h6>
                            <ul>
                                <li><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />Giá dưới 100.000đ</li>
                                <li><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />100.000đ - 200.000đ</li>
                                <li><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />200.000đ - 500.000đ</li>
                                <li><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />500.000đ - 1.000.000đ</li>
                                <li><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />1.000.000đ - 2.000.000đ</li>
                                <li><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />Giá trên 2.000.000đ</li>
                            </ul>
                        </div>
                    )}
                    <div className={cx('product-category')}>
                        <h6>Danh mục</h6>
                        <div className={cx('navbar__category')}>
                            {Array.isArray(listCategory.listCategoryDifference) && listCategory.listCategoryDifference.map((childItem, index) => (
                                <Link title={childItem.category_name} to={`/category/${childItem.slug}`} key={index}>{childItem.category_name}</Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={cx('content-main')}>
                    <h5>{listCategory.category_name}</h5>
                    {category.products?.length !== 0 ? (<>
                        <div className={cx('product-sort')}>
                            <h6>Sắp xếp:</h6>
                            <ul className={cx('product-sort--list')}>
                                <li><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />A -&gt; Z</li>
                                <li><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />Z -&gt; A</li>
                                <li><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />Giá tăng dần</li>
                                <li><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />Giá giảm dần</li>
                                <li><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />Hàng mới nhất</li>
                                <li><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />Hàng cũ nhất</li>
                            </ul>
                        </div>
                        <div className={cx('content-main__product')}>
                            <div className={cx('content-main__product--list')}>
                                {category.results && category.results.map((product, index) => (
                                    <ProductItem key={index} big={true} product={product} />
                                ))}
                            </div>
                            <div className={cx('product-pagination')}>
                                {numberPager > 1 && (
                                    <>
                                        <button href={routes.home}
                                            className={cx(currentPager === 1 && 'disable')}
                                            onClick={handlePagination(previosPager)}
                                        >&laquo;</button>
                                        {[...Array(numberPager)].map((_, index) => (
                                            <button
                                                key={index}
                                                // href={routes.home}
                                                className={cx(index + 1 === currentPager && 'active')}
                                                onClick={handlePagination(index + 1)}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}

                                        <button href={routes.home}
                                            className={cx(currentPager === numberPager && 'disable')}
                                            onClick={handlePagination(nextPager)}>&raquo;</button>
                                    </>
                                )}
                            </div>
                            {/* <a href={routes.home} className={cx('active')}>1</a>
                                <a href={routes.home}>2</a>
                                <a href={routes.home}>3</a>
                                <a href={routes.home}>4</a>
                                <a href={routes.home}>5</a>
                                <a href={routes.home}>6</a>*/}
                        </div>
                    </>
                    ) : (
                        <div>Chưa có sản phẩm nào được thêm vào.</div>
                    )}

                </div>
            </div>

        </div>
    </div>);
}

export default Category;