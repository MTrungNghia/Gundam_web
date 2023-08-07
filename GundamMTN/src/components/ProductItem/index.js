import styles from "./ProductItem.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Image from "../Image";

const cx = classNames.bind(styles);

function ProductItem({
    product,
    colum4,
    big,
}) {
    const classes = cx('wrapper', { colum4, big });
    let price = 0;
    if (product.price) {
        price = Number(product.price).toLocaleString();
    }
    return (
        <Link to={`/${product.slug}`} title={product.product_name} className={classes}>
            <div className={cx('img-title')}>
                <Image src={`http://localhost:8000${product.image}`} alt={product.product_name} />
            </div>
            <h4 className={cx('title')}>{product.product_name}</h4>
            {product.price ?
                (<span className={cx('price')}>
                    <>{price}₫</>
                </span>)
                :
                <span className={cx('price-text')}>
                    Liên hệ
                </span>
            }
        </Link>
    );
}

export default ProductItem;