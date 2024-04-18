import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

const Add = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // const [isNavitage, setIsNavitage] = useState(false);

    const onSubmit = (data) => {
        console.log(data)
        // const uuid = uuidv4();
        // const AmountBDT=1000
        // const formData = { ...data, AmountBDT };

        // const already = JSON.parse(localStorage.getItem(formData.accountNumber))
        // if(already){
        //   alert('This Account Number is already in use');
        //   return;
        // }

        // console.log('accountNumber : ',formData.accountNumber)
        // localStorage.setItem(data.accountNumber , JSON.stringify(formData));
        //   reset(); 
        //  setIsNavitage(true);

    };

    console.log('hello')

    // if (isNavitage) {
    //     return <Navigate to="/" replace></Navigate>
    // }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title:
                </label>
                <input
                    className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? 'border-red-500' : ''}`}
                    id="title"
                    type="text"
                    placeholder="Enter title"
                    {...register("title", { required: true })}
                />
                {errors.title && <p className="text-red-500 text-xs italic">This field is required</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description:
                </label>
                <textarea
                    className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.description ? 'border-red-500' : ''}`}
                    id="description"
                    placeholder="Enter description"
                    {...register("description", { required: true })}
                />
                {errors.description && <p className="text-red-500 text-xs italic">This field is required</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
                    Priority:
                </label>
                <select
                    className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.priority ? 'border-red-500' : ''}`}
                    id="priority"
                    {...register("priority", { required: true })}
                >
                    <option value="">Select Priority</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                {errors.priority && <p className="text-red-500 text-xs italic">Please select priority</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
                    Tags:
                </label>
                <input
                    className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.tags ? 'border-red-500' : ''}`}
                    id="tags"
                    type="text"
                    placeholder="Enter tags"
                    {...register("tags", { required: true })}
                />
                {errors.tags && <p className="text-red-500 text-xs italic">This field is required</p>}
            </div>

            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Create Bank Account
                </button>
            </div>
        </form>
    );
};

export default Add;
