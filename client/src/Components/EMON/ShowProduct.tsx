import { useContext, useEffect, useState } from 'react';
import Product from './Product';
import { OnlineUserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { set } from 'react-hook-form';
interface ProductInterface {
    loginUserID: string;
    productId: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    productCategory: string;
    productStatus: string;

}

const ShowProduct = () => {
    const navigate = useNavigate();
    const { currentLoginUser, setCurrentLoginUser } = useContext(OnlineUserContext);
    console.log(currentLoginUser);
    const loginUserID = currentLoginUser.userid
    const getProduct = () => {
        let data = localStorage.getItem('products');
        if (data) {
            return JSON.parse(data);
            // return newData = newData.filter((item: { loginUserID: string }) => item.loginUserID === loginUserID);  
        }
        else return [];
    }
    const getIndividualProduct = () => {
        let data = localStorage.getItem('products');
        if (data) {
            const newData:ProductInterface[] = JSON.parse(data);
            return newData.filter((item) => item.loginUserID === loginUserID);  
        }
        else return [];
    }
    const [products, setProducts] = useState<ProductInterface[]>(getProduct());
    const [individualProduct, setIndividualProduct] = useState<ProductInterface[]>(getIndividualProduct());


    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
        setIndividualProduct(getIndividualProduct());
    }, [products]);
    
    return (
        <div>
            <table>
                <thead>
                    <tr className="border p-2 border-black ">
                        <th className="border p-2 border-black ">Product Name</th>
                        <th className="border p-2 border-black ">Product Description</th>
                        <th className="border p-2 border-black ">Product Price</th>
                        <th className="border p-2 border-black "> Product Category</th>
                        <th className="border p-2 border-black ">Product Status</th>
                        <th className="border p-2 border-black ">Action</th>
                    </tr>
                    
                        {individualProduct.map((product, index) => {
                            return (
                                <Product key={index} product={product} products={products} setPorducts={setProducts} />
                            );
                        })}
                    
                </thead>
            </table>
        </div>
    );
};

export default ShowProduct;
