import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { Link, useParams } from 'react-router-dom';
import routes from '~/config/routes';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from '~/components/ProductItem';

const cx = classNames.bind(styles);

function Search() {
    const { searchName } = useParams();
    const [listProduct, setListProduct] = useState([]);

    const [nextPager, setNextPager] = useState(1);
    const [currentPager, setCurrentPager] = useState(1);
    const [previosPager, setPreviosPager] = useState(1);
    const [numberPager, setnumberPager] = useState(1);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/product/search/${searchName}/?page=${currentPager}`)
            .then((res) => {
                let data = res.data;
                setListProduct(data.results);
                setnumberPager(data.pages);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [currentPager, searchName])

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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('breadcrumb')}>
                    <Link to={routes.home}>Trang chủ&nbsp;</Link>
                    <span> / &nbsp; Tìm kiếm từ khóa: </span>
                    <span to={routes.home}>&nbsp;{searchName}&nbsp;</span>

                </div>
                <div className={cx('content')}>
                    <div className={cx('content-main')}>
                        <h5><span>Tìm kiếm từ khóa: </span>{searchName}</h5>
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
                                {listProduct && listProduct.map((product, index) => (
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
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Search;