import { useContext, useEffect, useState } from 'react';
import Product from './Product';
import { OnlineUserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { set } from 'react-hook-form';
import axios from 'axios';
interface ProductInterface {
    userid: number;
    prouductid: number;
    productname: string;
    productdescription: string;
    productprice: number;
    productcategory: string;
    productstatus: string;

}

const ShowProduct = () => {
    const navigate = useNavigate();
    const { currentLoginUser, setCurrentLoginUser } = useContext(OnlineUserContext);
    console.log(currentLoginUser);
    const loginUserID = currentLoginUser.userid

    const [products, setProducts] = useState<ProductInterface[]>([]);
    const fetchData = async () => {
        try {
            await axios
            .get(`http://127.0.0.1:3333/product/${loginUserID}`)
            .then((e) => {
                console.log(e.data.products)
                setProducts(e.data.products);
            })
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    
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
                    
                        {products.map((product, index) => {
                            return (
                                <Product key={index} product={product} products={ products} setProducts={setProducts} />
                            );
                        })}
                    
                </thead>
            </table>
        </div>
    );
};

export default ShowProduct;
