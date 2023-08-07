import classNames from "classnames/bind";
import styles from "./CategoryItem.module.scss";
import { Link } from "react-router-dom";
import Image from "../Image";

const cx = classNames.bind(styles);
function CategoryItem({
    to,
    img,
    title
}) {

    const url = `category/${to}`;
    return (
        <Link title={title} to={url} className={cx('wrapper')}>
            <div className={cx('img')}>
                <Image src={img} alt={title} />
            </div>
            <span className={cx('title')}>{title}</span>
        </Link>
    );
}

export default CategoryItem;