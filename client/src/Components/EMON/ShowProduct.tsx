import { useEffect, useState } from 'react';
import Product from './Product';
interface ProductInterface {
    productId: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    productCategory: string;
    productStatus: string;

}

const ShowProduct = () => {
    const getProduct = () => {
        let data = localStorage.getItem('products');
        if (data) {
            return JSON.parse(data);
        }
        else return [];
    }
    const [products, setProducts] = useState<ProductInterface[]>(getProduct());

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    },[products]);
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
                                <Product key={index} product={product} products={products} setPorducts={setProducts} />
                            );
                        })}
                    
                </thead>
            </table>
        </div>
    );
};

export default ShowProduct;