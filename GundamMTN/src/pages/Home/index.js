import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import images from "~/assets/images";
import CategoryItem from "~/components/CategoryItem";
import CategoryList from "~/layouts/components/CategoryList";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "~/redux/slice/authSlide";

const cx = classNames.bind(styles)
function Home() {
    const [listCategory, setListCategory] = useState([])
    const [listCategoryAndProduct, setListCategoryAndProduct] = useState([])
    // const { userLogin } = useLocation().state;
    // const auth = useSelector(state => state.auth.value);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        axios.get('account/user/')
            .then((res) => {
                dispatch(setAuth(true));
            })
            .catch(function (error) {
                console.log(error);
                dispatch(setAuth(false));

            });
    }, []);
    useEffect(() => {
        axios.get("/category/list/")
            .then(function (res) {
                setListCategory(res.data)
            })
            .catch(function (error) {

            })
    }, [])

    useEffect(() => {
        axios.get("/category/products-by-categorys/1/7/")
            .then(function (res) {
                setListCategoryAndProduct(res.data)
            })
            .catch(function (error) {

            })
    }, [])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('slide')}>
                    <img src={images.slide} alt="Slide" />
                </div>
                <div className={cx('fearured-category')}>
                    <span className={cx('fearured-category__title')}>
                        DANH MỤC NỔI BẬT
                    </span>
                    <div className={cx('fearured-category__list')}>
                        {listCategory.map((category, index) => (
                            <CategoryItem key={index} to={category.slug} img={`http://localhost:8000${category.cate_image}`} title={category.category_name} />
                        ))}
                    </div>
                </div>
                <div className={cx('banner')}>
                    <div className={cx('effect')}>
                        <img src={images.bannerOnePeice} alt="Banner OnePiece" />
                    </div>
                    <div className={cx('effect')}>
                        <img src={images.bannerDragonBall} alt="Banner DragonBall" />
                    </div>
                    <div className={cx('effect')}>
                        <img src={images.bannerPokemon} alt="Banner Pokemon" />
                    </div>
                </div>
                {listCategoryAndProduct && listCategoryAndProduct.map((categoryItem, index) => (
                    <div key={index} className={cx('list_product')}>
                        <CategoryList to={categoryItem.category.slug} title={categoryItem.category.category_name} listProducts={categoryItem.products} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;