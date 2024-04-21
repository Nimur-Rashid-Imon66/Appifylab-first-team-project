import { Link } from "react-router-dom";

interface ProductInterface {
    productId: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    productCategory: string;
    productStatus: string;
}

interface ProductProps {
    product: ProductInterface;
    products: ProductInterface[];
    setPorducts:React.Dispatch<React.SetStateAction<ProductInterface[]>>
}
const Product:React.FC<ProductProps> = ({ product,products,setPorducts}) => {
    return (
        <tr>
            <td className="border p-2 border-black ">{product.productName}</td>
            <td className="border p-2 border-black ">{product.productDescription}</td>
            <td className="border p-2 border-black ">{product.productPrice}</td>
            <td className="border p-2 border-black ">{product.productCategory}</td>
            <td className="border p-2 border-black ">{product.productStatus}</td>
            <td className="border p-2 border-black flex gap-2" >
                <Link
                    // to={{ pathname: '/editProduct', state: { porduct: product } }}
                    className="bg-green-400 p-1 rounded"
                    // params={{ product: product }}
                    // Add the 'state' property to the type of the 'to' prop
                    // by updating the 'LinkProps' interface
                    to={{ pathname: `/editProduct/${product.productId}` }}
                >
                    Edit
                </Link>
                <button
                    className="bg-red-400 p-1 rounded"
                    onClick={() => {
                        console.log(product.productId);
                        const newProducts = products.filter((item) => item.productId !== product.productId);
                        console.log(newProducts);
                        setPorducts(newProducts);
                    }}
                >
                    Delete</button>
            </td>
        </tr>
    );
};

export default Product;