import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { OnlineUserContext, useCategoryContext } from "../../App";
import axios from "axios";
import port from '../../Port'

interface indProductInterface {
  prouductid: number,
  userid: number,
  productname: string,
  productdescription:string,
  productprice: number,
  productcategory: string,
  productstatus: string
}

// interface categoryInterface {
//     // userid: number;
//     categoryname: string;
//     // categorydescription: string;
// }


const EditProduct: React.FC = ({ }) => {
  let temp = localStorage.getItem("token")
  let token: {token:string};
  if (temp) token = JSON.parse(temp);
  else return <h1 className="text-3xl ">No user data found</h1>;
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentLoginUser } = useContext<any>(OnlineUserContext);
  const loginUserID = currentLoginUser.userid;
  const {category, setCategory} = useCategoryContext();
  const [productInfo, setProductInfo] = useState<indProductInterface>(
    {} as indProductInterface
  );
  const [loading, setLoading] = useState<boolean>(false);
  const location  = useLocation();

  const fatcData = async () => {
    if(category.length <=0)
    {
        setLoading(true);
        try {
            const res = await axios.get(`${port}/category/${loginUserID}`, {
                headers: {
                    Authorization: `Bearer ${token.token}`,
                    "Content-Type": "application/json",
                }
            })
            setCategory(res.data.categories);
            localStorage.setItem("category", JSON.stringify(res.data.categories));
        } catch (error) {
            alert("Something went wrong finding the category")
        }finally {
            setLoading(false);
        }
    }

   
  }
  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      productInfo.productname === "" ||
      productInfo.productdescription === "" ||
      productInfo.productprice === 0 ||
      productInfo.productcategory === "" ||
      productInfo.productstatus === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${port}/editproduct/${id}`, productInfo,{
        headers: {
            Authorization: `Bearer ${token.token}`,
            "Content-Type": "application/json",
        }
    })
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
    alert("Product Update Successfully");
    navigate("/showProducts");
  };

  useEffect(() => {
    setProductInfo(location.state.product);
    fatcData();
}, []);
  return (
    <div className="flex items-center justify-center ">
      <div className="flex flex-col min-w-[40vw]">
        <h1 className="rounded-t-lg border text-2xl p-2">Edit Product</h1>
        <form
          className="flex flex-col gap-4 p-4  rounded-b-lg items-center justify-center bg-gray-200 border"
          onSubmit={handleSubmit}
        >
          <input
            className="w-full px-2 py-1 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
            type="text"
            placeholder="Product Name"
            value={productInfo.productname}
            onChange={(e) =>
              setProductInfo({ ...productInfo, productname: e.target.value })
            }
            required
          />
          <input
            className="w-full px-2 py-1 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
            type="text"
            placeholder="Product Description"
            value={productInfo.productdescription}
            onChange={(e) =>
              setProductInfo({
                ...productInfo,
                productdescription: e.target.value,
              })
            }
            required
          />
          <input
            className="w-full px-2 py-1 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
            type="number"
            min="0"
            placeholder="Product Price"
            value={productInfo.productprice}
            onChange={(e) =>
              setProductInfo({
                ...productInfo,
                productprice: parseFloat(e.target.value),
              })
            }
            required
          />
          {/* <input type="" placeholder="Product Category" />
           */}
          <span className="flex justify-between items-center w-full bg-white px-2 py-1 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out">
            Select Product Category
            <select
              // className="ml-1 py-2 px-4 border "
              className="w-[40%] px-2 py-1 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
              value={productInfo.productcategory}
              onChange={(e) =>
                setProductInfo({
                  ...productInfo,
                  productcategory: e.target.value,
                })
              }
              required
            >
              <option value="">Select Category </option>
              {category.map((item, idx) => {
                return (
                  <option key={idx} value={`${item.categoryname}`}>
                    {item.categoryname}{" "}
                  </option>
                );
              })}
            </select>
          </span>
          <span className="flex justify-between  items-center w-full bg-white px-2 py-1 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out">
            Select Product Status
            <select
              className="w-[40%] px-1 py-1 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
              // value={userInfo.accountType}
              value={productInfo.productstatus}
              onChange={(e) =>
                setProductInfo({
                  ...productInfo,
                  productstatus: e.target.value,
                })
              }
              required
            >
              <option value="In Stock">In Stock </option>
              <option value="Out Of Stock">Out of Stock</option>
            </select>
          </span>
          <button
            disabled={loading}  
            className={`px-4 py-2 rounded-md transition duration-300 ease-in-out ${loading
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            type="submit"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
