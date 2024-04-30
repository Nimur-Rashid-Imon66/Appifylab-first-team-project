import React, { useContext, useEffect, useState } from 'react';
import { OnlineUserContext, useCategoryContext } from '../../App';
import axios from 'axios';
import port from '../../Port';

// interface categoryInterface {
//     categoryname: string;
// }
const AddProductCategory = () => {
    // let category:categoryInterface[] = [];
    let tempTkn = localStorage.getItem("token")
    let token: {token:string};
    if (tempTkn) token = JSON.parse(tempTkn);
    else return <h1 className="text-3xl ">No user data find</h1>;

    // let tempCat :string|null = localStorage.getItem("category");
    // let category:categoryInterface[];
    // if (tempCat) category = JSON.parse(tempCat);
    // else category = [];
    const {category, setCategory} = useCategoryContext();
 
    const { currentLoginUser } = useContext<any>(OnlineUserContext);
    const loginUserID = currentLoginUser.userid
    const [categoryInfo, setCategoryInfo] = useState({
        userid: loginUserID,
        categoryname: "",
        categorydescription: ""
    });
    const [loading, setLoading] = useState<boolean>(false);
    const fatcData = async () => {
        if(category.length <=0 )
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
    const addCategory = async () => {
        setLoading(true);
        try {
            await axios.post(`${port}/addcategory`, categoryInfo,
                {
                    headers: {
                    Authorization: `Bearer ${token.token}`,
                    "Content-Type": "application/json",
                    },
                }
            );
            setLoading(false);
            category.push({ categoryname: categoryInfo.categoryname });
            setCategory(category);
            localStorage.setItem("category", JSON.stringify(category));
            alert("Category added successfully");
            setCategoryInfo({
                userid: loginUserID,
                categoryname: "",
                categorydescription: ""
            })
        } catch (error: any) {
            alert( error.response.data.message);
        }
        finally {
            setLoading(false);
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
    useEffect(() => { 
        fatcData();
    } , []);
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