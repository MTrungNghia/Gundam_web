import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

function Search() {
    const [textSearch, setTextSearch] = useState("");
    const navigate = useNavigate();

    function handleSubmitSearch() {

        navigate(`/search/${textSearch}`);
        setTextSearch("");
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            // Nếu phím nhấn là Enter, thực hiện tìm kiếm
            handleSubmitSearch();
        }
    };

    return (
        <div className={cx('search')}>
            <input
                value={textSearch}
                placeholder="Nhập từ khóa..."
                spellCheck={false}
                onKeyDown={handleKeyDown}
                onChange={(e) => { setTextSearch(e.target.value) }}
            />
            <button type="submit" onClick={handleSubmitSearch} className={cx('search-btn')} onMouseDown={e => e.preventDefault()}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </div>
    );
}

export default Search;