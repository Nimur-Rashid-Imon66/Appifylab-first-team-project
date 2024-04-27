import axios from "axios";
import { Link } from "react-router-dom";
import port from "../../Port";

interface ProductInterface {
    userid: number;
    prouductid: number;
    productname: string;
    productdescription: string;
    productprice: number;
    productcategory: string;
    productstatus: string;
}

interface ProductProps {
    product: ProductInterface;
    products: ProductInterface[];
    setProducts:React.Dispatch<React.SetStateAction<ProductInterface[]>>
}


const Product: React.FC<ProductProps> = ({ product, products, setProducts }) => {
    const handleDelete = async() => {
        await axios.post(`${port}/deleteproduct/${product.prouductid}`)
        setProducts(products.filter((p)=>p.prouductid!==product.prouductid))
    }
    
    return (
        <tr>
            <td className="border p-2 border-black ">{product.productname}</td>
            <td className="border p-2 border-black ">{product.productdescription}</td>
            <td className="border p-2 border-black ">{product.productprice}</td>
            <td className="border p-2 border-black ">{product.productcategory}</td>
            <td className="border p-2 border-black ">{product.productstatus}</td>
            <td className="border p-2 border-black flex gap-2" >
                <Link
                    className="bg-green-400 p-1 rounded"
                    to={{ pathname: `/editProduct/${product.prouductid}` }}
                    state={{product:product}}
                >
                    Edit 
                </Link>
                <button
                    className="bg-red-400 p-1 rounded"
                    onClick={handleDelete}
                >
                    Delete</button>
            </td>
        </tr>
    );
};

export default Product;