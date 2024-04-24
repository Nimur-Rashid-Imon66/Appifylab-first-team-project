import React, { useContext, useEffect, useState } from 'react';
import { OnlineUserContext } from '../../App';
import axios from 'axios';



interface categoryInterface {
    userid: number;
    categoryname: string;
    categorydescription: string;
}
const AddProductCategory = () => {
    let category:categoryInterface[] = [];
    const { currentLoginUser, setCurrentLoginUser } = useContext(OnlineUserContext);
    const loginUserID = currentLoginUser.userid
    const [categoryInfo, setCategoryInfo] = useState({
        userid: loginUserID,
        categoryname: "",
        categorydescription: ""
    });
    const addCategory = async () => {
        try {
            console.log(categoryInfo);
            await axios.post(`http://127.0.0.1:3333/addcategory`, categoryInfo);
            alert("Category added successfully");
            setCategoryInfo({
                userid: loginUserID,
                categoryname: "",
                categorydescription: ""
            })
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(loginUserID,'sad')
        if (categoryInfo.categoryname === "" || categoryInfo.categorydescription === "") {
            alert("Please fill all the fields");
            return;
        }
        try {
            const resposne = await axios.get(`http://127.0.0.1:3333/category/${loginUserID}`)
            category = resposne.data.categories;
            const isCategoryExists = category.filter(ct =>ct.categoryname === categoryInfo.categoryname && ct.userid === loginUserID);
            if (isCategoryExists.length) {
                alert("Category already exists");
                return;
            }
            await addCategory();
        }catch (error) {
            console.error("Error fetching categories:", error);
        }
    }
    return (
        <div className='flex flex-col min-w-[100vw] min-h-[100vh] items-center justify-center'>
            <h1 className='text-xl md:text-2xl font-semibold p-4 border rounded-t-lg  min-w-[50vw]'>Add Product Category </h1>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-4 p-4 min-w-[50vw] rounded-b-lg items-center justify-center bg-gray-200 border'
            >
                <input
                    className='w-full px-2 py-1 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out'
                    type="text"
                    placeholder="Category Name"
                    value={categoryInfo.categoryname}
                    onChange={(e) => setCategoryInfo({ ...categoryInfo, categoryname: e.target.value })}
                    required
                />
                <input
                    className='w-full px-2 py-1 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out'
                    type="text"
                    placeholder="Category Description"
                    value={categoryInfo.categorydescription}
                    onChange={(e) => setCategoryInfo({ ...categoryInfo, categorydescription: e.target.value })}
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