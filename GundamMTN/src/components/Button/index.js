import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    small = false,
    disabled = false,
    effect = false,
    children,
    leftIcon,
    rightIcon,
    className,
    onClick,
    ...passProps
}) {
    var Comp = "button";
    const props = {
        onClick,
        ...passProps,
    };
    // if (disabled) {
    //     Object.key(props).forEach((key) => {
    //         if (key.startsWith('on') && typeof props[key] === 'function') {
    //             delete props[key]
    //         }
    //     })
    // }
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    var classes = cx("wrapper", {
        primary,
        outline,
        text,
        small,
        disabled,
        effect,
        [className]: className,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;