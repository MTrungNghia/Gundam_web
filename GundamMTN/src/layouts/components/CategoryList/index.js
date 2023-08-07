import classNames from "classnames/bind";
import styles from "./CategoryList.module.scss";
import ProductItem from "~/components/ProductItem";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function CategoryList({
    to,
    title,
    listProducts
}) {
    const url = `category/${to}`;
    return (
        <div className={cx('wrapper')}>
            <Link to={url} title={title} className={cx('title')}>
                <span>{title}</span>
            </Link>
            <div className={cx('list-product')}>
                {listProducts.map((product, index) => (
                    <ProductItem key={index} colum4 product={product} />
                ))}
            </div>
        </div>
    );
}

export default CategoryList;