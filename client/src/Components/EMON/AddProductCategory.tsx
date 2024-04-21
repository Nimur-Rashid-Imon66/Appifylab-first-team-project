import React, { useContext, useState } from 'react';
import { OnlineUserContext } from '../../App';


const AddProductCategory = () => {
    const { currentLoginUser, setCurrentLoginUser } =
    useContext(OnlineUserContext);
    const loginUserID = parseInt(currentLoginUser);
    console.log(loginUserID);

    const [userId, setUserId] = useState(101); //user info coming from login
    const [productCategory, setProductCategory] = useState([
        {
            loginUserID: loginUserID,
            categoryName: "cat1",
            categoryDescription: "All cat1 items"
        },
        {
            loginUserID: loginUserID,
            categoryName: "cat2",
            categoryDescription: "All types of cat2"
        },
        {
            loginUserID: loginUserID,
            categoryName: "cat3",
            categoryDescription: "All types of cat3"
        }
    ]); // product category info coming from user product list

    const [categoryInfo, setCategoryInfo] = useState({
        loginUserID: loginUserID,
        categoryName: "",
        categoryDescription: ""
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (productCategory.filter((category) => category.categoryName.toLowerCase() === categoryInfo.categoryName.toLowerCase()).length > 0) {
            alert("Category already exists");
            return;
        }
        setProductCategory([...productCategory, categoryInfo]);
        setCategoryInfo({
            loginUserID: loginUserID,
            categoryName: "",
            categoryDescription: ""
        });
        console.log(userId,categoryInfo);
    }
    return (
        <div className='flex flex-col min-w-[100vw] min-h-[100vh] items-center justify-center'>
            <h1 className='text-xl md:text-2xl font-semibold p-4 border rounded-t-lg  min-w-[50vw]'>Add Product Category</h1>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-4 p-4 min-w-[50vw] rounded-b-lg items-center justify-center bg-gray-200 border'
            >
                <input
                    className='w-full px-2 py-1 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out'
                    type="text"
                    placeholder="Category Name"
                    value={categoryInfo.categoryName}
                    onChange={(e) => setCategoryInfo({ ...categoryInfo, categoryName: e.target.value })}
                    required
                />
                <input
                    className='w-full px-2 py-1 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out'
                    type="text"
                    placeholder="Category Description"
                    value={categoryInfo.categoryDescription}
                    onChange={(e) => setCategoryInfo({ ...categoryInfo, categoryDescription: e.target.value })}
                    required
                />
                <button
                    type="submit"
                    className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out'
                >Add Category</button>
            </form>
        </div>
    );
}; 

export default AddProductCategory;