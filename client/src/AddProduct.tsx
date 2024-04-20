import React, { useEffect, useState } from 'react';
import uniqid from 'uniqid';
interface Product {
    productId: string;
    productName: string;
    productDescription: string;
    productPrice: number|"";
    productCategory: string;
    productStatus: string;

}


const AddProduct = () => {
    const getProduct = () => {
        let data = localStorage.getItem('Products');
        if (data) {
            return JSON.parse(data);
        }
        else return [];
    }
    const [productInfo, setProductInfo] = useState<Product>({
        productId: uniqid(),
        productName: "",
        productDescription: "",
        productPrice: "",
        productCategory: "cat1",
        productStatus: "inStock"
    });
    const [products, setProducts] = useState<Product[]>(getProduct());
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
        if (productInfo.productName === "" || productInfo.productDescription === "" || productInfo.productPrice === "" || productInfo.productCategory === "" || productInfo.productStatus === "") {
            alert("Please fill all the fields");
            return;
        }
        setProducts([...products, productInfo ]);
        alert("Product Added Successfully");
        setProductInfo({
            productId: uniqid(),
            productName: "",
            productDescription: "",
            productPrice: "",
            productCategory: "cat1",
            productStatus: "inStock"
        });
    }
    

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    return (
        <div className="flex items-center justify-center ">
            <div className="flex flex-col min-w-[40vw]">
                <h1 className="rounded-t-lg border text-2xl p-2">Add Product</h1>
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
                            <option value="inStock">In Stock </option>
                            <option value="outoOfStock">Out of Stock</option>
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

export default AddProduct;