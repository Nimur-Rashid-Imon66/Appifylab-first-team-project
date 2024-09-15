import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import uniqid from "uniqid";
import { OnlineUserContext } from "../../App";
import axios from "axios";

  interface ProductInterface {
    userid: number;
    prouductid: number;
    productname: string;
    productdescription: string;
    productprice: number|"";
    productcategory: string;
    productstatus: string;

}

interface indProductInterface {
  prouductid: number,
  userid: number,
  productname: string,
  productdescription:string,
  productprice: number,
  productcategory: string,
  productstatus: string
}

interface categoryInterface {
    userid: number;
    categoryname: string;
    categorydescription: string;
}


const EditProduct: React.FC = ({}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentLoginUser, setCurrentLoginUser } =
    useContext(OnlineUserContext);
  console.log(currentLoginUser);
  const loginUserID = currentLoginUser.userid;
  const [category, setCategory] = useState<categoryInterface[]>([]);
  const [productInfo, setProductInfo] = useState<indProductInterface>({});

  const fatcData = async () => {
    await axios
        .get(`http://127.0.0.1:3333/category/${loginUserID}`)
        .then((e) => {
            console.log(e.data.categories)
            setCategory(e.data.categories);
        })
  }
  const individualProductData = async () => {
    await axios
    .get(`http://127.0.0.1:3333/indproduct/${id}`)
    .then((e:any) => {
      console.log(e.data.product[0])
      setProductInfo(e.data.product[0])
    })
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

    await axios.post(`http://127.0.0.1:3333/editproduct/${id}`,productInfo)
    alert("Product Update Successfully");
    navigate("/showProducts");
  };

  useEffect(() => {
    fatcData();
    individualProductData();
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
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
