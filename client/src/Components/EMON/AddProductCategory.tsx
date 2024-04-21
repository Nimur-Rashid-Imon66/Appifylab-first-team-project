import React, { useContext, useEffect, useState } from 'react';
import { OnlineUserContext } from '../../App';
import { useNavigate } from 'react-router-dom';


interface categoryInterface {
    loginUserID: string;
    categoryName: string;
    categoryDescription: string;
}
const AddProductCategory = () => {
    const navigate = useNavigate();
    const { currentLoginUser, setCurrentLoginUser } = useContext(OnlineUserContext);
    console.log(currentLoginUser);
    const loginUserID = currentLoginUser.userid
    const getCategory = () => {
        let data = localStorage.getItem('productCategory');
        if (data) {
            let newData = JSON.parse(data);
            return newData
            // if(data)
            //     return newData = newData.filter((item: { loginUserID: string }) => item.loginUserID === loginUserID);
            // else return [];
            
        }
        else return [];
    }

    const [productCategory, setProductCategory] = useState<categoryInterface[]|[]>(getCategory()); // product category info coming from user product list

    const [categoryInfo, setCategoryInfo] = useState({
        loginUserID: loginUserID,
        categoryName: "",
        categoryDescription: ""
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(loginUserID,'sad')
        if (categoryInfo.categoryName === "" || categoryInfo.categoryDescription === "") {
            alert("Please fill all the fields");
            return;
        }
        if (productCategory&& (productCategory.filter((category) => category.categoryName.toLowerCase() === categoryInfo.categoryName.toLowerCase() && category.loginUserID === loginUserID).length > 0)) {
            alert("Category already exists");
            return;
        }
        setProductCategory([...productCategory, categoryInfo]);
        setCategoryInfo({
            loginUserID: loginUserID,
            categoryName: "",
            categoryDescription: ""
        });
        console.log(loginUserID,categoryInfo);
    }

    useEffect(() => {
        if (!loginUserID)
            navigate('/login');
        localStorage.setItem('productCategory', JSON.stringify(productCategory));

    },[productCategory]);
    return (
        <div className='flex flex-col min-w-[100vw] min-h-[100vh] items-center justify-center'>
            <h1 className='text-xl md:text-2xl font-semibold p-4 border rounded-t-lg  min-w-[50vw]'>Add Product Category { loginUserID}</h1>
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