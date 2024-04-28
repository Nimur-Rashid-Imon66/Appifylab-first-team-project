import React, { useContext, useState } from 'react';
import { OnlineUserContext } from '../../App';
import axios from 'axios';
import port from '../../Port';



// interface categoryInterface {
//     userid: number;
//     categoryname: string;
//     categorydescription: string;
// }
const AddProductCategory = () => {
    // let category:categoryInterface[] = [];
    const token = JSON.parse(localStorage.getItem("token"));
    const { currentLoginUser } = useContext<any>(OnlineUserContext);
    const loginUserID = currentLoginUser.userid
    const [categoryInfo, setCategoryInfo] = useState({
        userid: loginUserID,
        categoryname: "",
        categorydescription: ""
    });
    const [loading, setLoading] = useState<boolean>(false);
    const addCategory = async () => {
        try {
            setLoading(true);
            await axios.post(`${port}/addcategory`, categoryInfo,
                {
                    headers: {
                    Authorization: `Bearer ${token.token}`,
                    "Content-Type": "application/json",
                    },
                }
            );
            setLoading(false);
            alert("Category added successfully");
            setCategoryInfo({
                userid: loginUserID,
                categoryname: "",
                categorydescription: ""
            })
        } catch (error: any) {
            alert( error.response.data.message);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (categoryInfo.categoryname === "" || categoryInfo.categorydescription === "") {
            alert("Please fill all the fields");
            return;
        }
        await addCategory();
        
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
                    disabled={loading}
                    type="submit"
                    className={`px-4 py-2 rounded-md transition duration-300 ease-in-out ${loading
                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                    >Add Category</button>
            </form>
        </div>
    );
}; 

export default AddProductCategory;