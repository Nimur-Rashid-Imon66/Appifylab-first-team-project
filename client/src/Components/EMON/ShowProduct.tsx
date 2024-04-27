import { useContext, useEffect, useState } from 'react';
import Product from './Product';
import { OnlineUserContext } from '../../App';
import axios from 'axios';
import port from '../../Port';


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
    const { currentLoginUser } = useContext<any>(OnlineUserContext);
    console.log(currentLoginUser);
    const loginUserID = currentLoginUser.userid

    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
   
    const fetchData = async () => {
        try {
            setLoading(true);
            await axios
            .get(`${port}/product/${loginUserID}`)
            .then((e) => {
                console.log(e.data.products)
                setProducts(e.data.products);
            })
            setLoading(false);
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
                        
                    {
                        loading ? <tr className="text-3xl ">Loading...</tr>
                        :products.map((product, index) => {
                            return (
                                <Product key={index} product={product} products={ products} setProducts={setProducts} />   
                            );
                        })
                    }
                    
                </thead>
            </table>
        </div>
    );
};

export default ShowProduct;
