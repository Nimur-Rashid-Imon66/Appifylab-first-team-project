import React, { useState } from 'react';
interface Product {
    productId: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    productCategory: string;
    productStatus: string;

}

const ShowProduct = () => {
    const getProduct = () => {
        let data = localStorage.getItem('Products');
        if (data) {
            return JSON.parse(data);
        }
        else return [];
    }
    const [products, setProducts] = useState<Product[]>(getProduct());

    return (
        <div>
            
        </div>
    );
};

export default ShowProduct;