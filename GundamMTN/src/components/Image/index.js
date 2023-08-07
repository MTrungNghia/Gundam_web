import { useState, forwardRef } from "react";
import classNames from "classnames";
import images from "~/assets/images";

const Image = forwardRef(({ src, alt, className, fallBack: customFallback = images.noImage, ...props }, ref) => {
    const [fallback, setFallback] = useState("");
    const handleError = (e) => {
        setFallback(customFallback);
    }
    // eslint-disable-next-line jsx-a11y/alt-text
    return (
        <img
            className={classNames(className)}
            ref={ref}
            alt={alt}
            src={fallback || src}
            {...props}
            onError={handleError}
            crossOrigin="anonymous"
        />
    );
});


export default Image;