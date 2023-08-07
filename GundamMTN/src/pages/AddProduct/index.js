import classNames from "classnames/bind";
import styles from "./AddProduct.module.scss";
import { useEffect, useState } from "react";
import Button from "~/components/Button";
import axios from "axios";

const cx = classNames.bind(styles);

function AddProduct() {
    const [listCategory, setListCategory] = useState([])

    const [category, setCategory] = useState(null);
    const [productName, setProductName] = useState("");
    const [productDes, setProductDes] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productInventory, setProductInventory] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [Image1, setImage1] = useState(null);
    const [Image2, setImage2] = useState(null);
    const [Image3, setImage3] = useState(null);
    const [Image4, setImage4] = useState(null);
    const [Image5, setImage5] = useState(null);
    const [Image6, setImage6] = useState(null);
    const [Image7, setImage7] = useState(null);
    const [Image8, setImage8] = useState(null);
    const [Image9, setImage9] = useState(null);


    const [selectImageMain, setSelectedImageMain] = useState(null);
    const [selectImage1, setselectImagen1] = useState(null);
    const [selectImage2, setselectImagen2] = useState(null);
    const [selectImage3, setselectImagen3] = useState(null);
    const [selectImage4, setselectImagen4] = useState(null);
    const [selectImage5, setselectImagen5] = useState(null);
    const [selectImage6, setselectImagen6] = useState(null);
    const [selectImage7, setselectImagen7] = useState(null);
    const [selectImage8, setselectImagen8] = useState(null);
    const [selectImage9, setselectImagen9] = useState(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/category/list/")
            .then(function (res) {
                setListCategory(res.data)
            })
            .catch(function (error) {

            })
    }, [])

    function handleImageChange(e, setImage, setSelect) {
        const file = e.target.files[0];
        setImage(file);
        // setSelect(URL.createObjectURL(file));
        setSelect(null);

    }

    function handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append('category', Number(category));
        formData.append('product_name', productName);
        formData.append('description', productDes);
        formData.append('price', productPrice);
        formData.append('inventory', productInventory);
        formData.append('image', productImage);
        formData.append(`ImageList`, Image1);
        formData.append(`ImageList`, Image2);
        formData.append(`ImageList`, Image3);
        formData.append(`ImageList`, Image4);
        formData.append(`ImageList`, Image5);
        formData.append(`ImageList`, Image6);
        formData.append(`ImageList`, Image7);
        formData.append(`ImageList`, Image8);
        formData.append(`ImageList`, Image9);

        // Gửi dữ liệu đến server
        axios.post('http://127.0.0.1:8000/product/create/', formData)
            .then(function (response) {
                // Xử lý phản hồi từ server (nếu cần)
                console.log(response.data);
                alert("thanhf coong");
            })
            .catch(function (error) {
                // Xử lý lỗi (nếu có)
                console.error(error);
                alert("Loi");
            });
    }

    return (<div className={cx('wrapper')}>
        <form className={cx('inner')} onSubmit={handleSubmit}>
            <div className={cx('breadcrumb')}>
                <h5>Thêm sản phẩm </h5>
            </div>
            <div className={cx('content')}>
                <div className={cx('category_product')}>
                    <span>Chọn loại sản phẩm:</span>
                    <select onChange={(e) => { setCategory(e.target.value) }}>
                        <option>__Chọn loại sản phẩm___</option>
                        {listCategory.map((category, index) => (
                            <option key={index} value={category.id} >{category.category_name}</option>
                        ))}
                    </select>
                </div>
                <div className={cx('category_product')}>
                    <span>Tên sản phẩm:</span>
                    <input type="text" value={productName} name="productName" onChange={(e) => setProductName(e.target.value)} />
                </div>
                <div className={cx('category_product')}>
                    <span>Mô tả sản phẩm:</span>
                    <textarea type="text" value={productDes} name="productDes" onChange={(e) => setProductDes(e.target.value)} />
                </div>
                <div className={cx('category_product')}>
                    <span>Giá sản phẩm:</span>
                    <input type="text" value={productPrice} name="productPrice" onChange={(e) => setProductPrice(Number(e.target.value))}
                        onKeyPress={(e) => {
                            const charCode = e.which ? e.which : e.keyCode;
                            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                e.preventDefault();
                            }
                        }}
                    />
                </div>
                <div className={cx('category_product')}>
                    <span>Số lượng sản phẩm:</span>
                    <input type="text" value={productInventory} name="productInventory" onChange={(e) => setProductInventory(Number(e.target.value))}
                        onKeyPress={(e) => {
                            const charCode = e.which ? e.which : e.keyCode;
                            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                e.preventDefault();
                            }
                        }}
                    />
                </div>
                <div className={cx('img_product')}>
                    <span>Ảnh sản phẩm:</span>
                    <input type="file" name="productImage" onChange={(e) => handleImageChange(e, setProductImage, setSelectedImageMain)} />
                    {selectImageMain && (<img src={selectImageMain} alt="Imagea saaa" />)
                    }
                </div>
                <div className={cx('child_image_product')}>
                    <span>Ảnh mô tả thêm về sản phẩm:</span>
                    <ul>
                        <li><input type="file" name="image" onChange={(e) => handleImageChange(e, setImage1, setselectImagen1)} />
                            {selectImage1 && (<img src={selectImage1} alt="Imagea saaa" />)
                            }</li>
                        <li><input type="file" name="image" onChange={(e) => handleImageChange(e, setImage2, setselectImagen2)} />
                            {selectImage2 && (<img src={selectImage2} alt="Imagea saaa" />)
                            }</li>
                        <li><input type="file" name="image" onChange={(e) => handleImageChange(e, setImage3, setselectImagen3)} />
                            {selectImage3 && (<img src={selectImage3} alt="Imagea saaa" />)
                            }</li>
                        <li><input type="file" name="image" onChange={(e) => handleImageChange(e, setImage4, setselectImagen4)} />
                            {selectImage4 && (<img src={selectImage4} alt="Imagea saaa" />)
                            }</li>
                        <li><input type="file" name="image" onChange={(e) => handleImageChange(e, setImage5, setselectImagen5)} />
                            {selectImage5 && (<img src={selectImage5} alt="Imagea saaa" />)
                            }</li>
                        <li><input type="file" name="image" onChange={(e) => handleImageChange(e, setImage6, setselectImagen6)} />
                            {selectImage6 && (<img src={selectImage6} alt="Imagea saaa" />)
                            }</li>
                        <li><input type="file" name="image" onChange={(e) => handleImageChange(e, setImage7, setselectImagen7)} />
                            {selectImage7 && (<img src={selectImage7} alt="Imagea saaa" />)
                            }</li>
                        <li><input type="file" name="image" onChange={(e) => handleImageChange(e, setImage8, setselectImagen8)} />
                            {selectImage8 && (<img src={selectImage8} alt="Imagea saaa" />)
                            }</li>
                        <li><input type="file" name="image" onChange={(e) => handleImageChange(e, setImage9, setselectImagen9)} />
                            {selectImage9 && (<img src={selectImage9} alt="Imagea saaa" />)
                            }</li>
                    </ul>
                </div>
                <Button effect primary type="submit">Thêm sản phẩm</Button>
            </div>
        </form>

    </div>);
}

export default AddProduct;