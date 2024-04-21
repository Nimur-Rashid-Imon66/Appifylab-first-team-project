import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import uniqid from 'uniqid'



interface ProductInterface {
    productId: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    productCategory: string;
    productStatus: string;
}



const EditProduct: React.FC = ({}) => {
    const {id} = useParams();
    
    const getProduct = () => {
        let data = localStorage.getItem('products');
        if (data) {
            return JSON.parse(data);
        }
        else return [];
    }
    const [products, setProducts] = useState<ProductInterface[]>(getProduct());
    const getIndividualProduct = (id: string | undefined) => {
        console.log(id,1)
        if (products && id) {
            const x = products.find((product: ProductInterface) => product.productId === id);
            if (x) return x;
            else return {
                productId: uniqid(),
                productName: "",
                productDescription: "",
                productPrice: 0,
                productCategory: "cat1",
                productStatus: "In Stock" }
        }
        else return {
            productId: uniqid(),
            productName: "",
            productDescription: "",
            productPrice: 0,
            productCategory: "cat1",
            productStatus: "In Stock" }
    }
    const [productInfo, setProductInfo] = useState<ProductInterface>({
            productId: uniqid(),
            productName: "",
            productDescription: "",
            productPrice: 0,
            productCategory: "cat1",
            productStatus: "In Stock" 
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
        if (productInfo.productName === "" || productInfo.productDescription === "" || productInfo.productPrice === 0 || productInfo.productCategory === "" || productInfo.productStatus === "") {
            alert("Please fill all the fields");
            return;
        }
        const newProducts = products.filter((product: ProductInterface) => product.productId !== id);
        setProducts([...newProducts, productInfo ]);
        alert("Product Update Successfully");
        
    }
    

    useEffect(() => {
           console.log(id)
        const x:ProductInterface = getIndividualProduct(id);
        console.log(x)
            if(x) setProductInfo(x)
        
        
    }, []);

    useEffect(() => { 
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]
    )
    return (
        <div className="flex items-center justify-center ">
            <div className="flex flex-col min-w-[40vw]">
                <h1 className="rounded-t-lg border text-2xl p-2">Edit Product</h1>
                <form
                    className='flex flex-col gap-4 p-4  rounded-b-lg items-center justify-center bg-gray-200 border'
                    onSubmit={handleSubmit}
                >
                    <input
                        className='w-full px-2 py-1 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out'
                        type="text"
                        placeholder="Product Name"
                        value={productInfo.productName}
                        onChange={(e) => setProductInfo({ ...productInfo, productName: e.target.value })}
                        required
                    />
                    <input
                        className='w-full px-2 py-1 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out'
                        type="text"
                        placeholder="Product Description"
                        value={productInfo.productDescription}
                        onChange={(e) => setProductInfo({ ...productInfo, productDescription: e.target.value })}
                        required
                    />
                    <input
                        className='w-full px-2 py-1 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out'
                        type="number"
                        min='0'
                        placeholder="Product Price"
                        value={productInfo.productPrice}
                        onChange={(e) => setProductInfo({ ...productInfo, productPrice: parseFloat(e.target.value) })}
                        required
                    />
                    {/* <input type="" placeholder="Product Category" />
                     */}
                     <span className="flex justify-between items-center w-full bg-white px-2 py-1 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out">
                         Select Product Category 
                        <select
                            // className="ml-1 py-2 px-4 border "
                            className='w-[40%] px-2 py-1 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out'
                            value={productInfo.productCategory}
                            onChange={e => setProductInfo({ ...productInfo, productCategory: e.target.value })}
                            required
                
                        >
                            <option value="cat1">cat1 </option>
                            <option value="cat2">cat2</option>
                            <option value="cat3 ">cat3 </option>
                        </select>
                    </span>
                    <span className="flex justify-between  items-center w-full bg-white px-2 py-1 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out" >
                    Select Product Status
                        <select
                            className='w-[40%] px-1 py-1 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out'
                            // value={userInfo.accountType}
                            value={productInfo.productStatus}
                            onChange={e => setProductInfo({ ...productInfo, productStatus: e.target.value })}
                            required
                        >
                            <option value="In Stock">In Stock </option>
                            <option value="Out Of Stock">Out of Stock</option>
                        </select>
                    </span>
                    <button
                        className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out'
                        type="submit">Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;