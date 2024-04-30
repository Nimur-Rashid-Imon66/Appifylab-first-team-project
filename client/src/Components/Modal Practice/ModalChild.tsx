import React from 'react';

interface ModalChildProps {
    setModal : React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalChild = ({ setModal }: ModalChildProps) => {
    const handleClose = () => {
        console.log("close");
        setModal(prv =>!prv)
    }
    return (
        <div
            className="flex flex-col items-center justify-center w-[100vw] h-[100vh] bg-gray-300 bg-opacity-50 fixed top-0 left-0 z-50 "
        >
            <div className="w-[100vw] h-[100vh] opacity-0 relative"
             onClick={handleClose}
            ></div>
            <div className='flex flex-col items-center gap-5 w-[50vw] bg-white rounded-lg text-black absolute pb-4'>
                <button className='max-w-[50px] self-end text-4xl hover:text-red-600 hover:bg-white' onClick={handleClose}>
                    &times;
                </button>
              
                <div className='flex flex-col items-center'>
                    <h1 className='text-3xl font-bold mb-5'>Modal</h1>
                    <p className='px-2 text-center'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores inventore alias provident nostrum suscipit voluptates ut architecto numquam magnam ipsum?</p>
                </div>
                
                <button className='max-w-[50px] bg-green-400 text-lg hover:bg-green-300'>Save</button>
    
            </div>
        </div>
    );
};

export default ModalChild;