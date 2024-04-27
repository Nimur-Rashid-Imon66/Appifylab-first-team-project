import React, { createContext, useContext, useState } from "react";
import Show from "./Show";
import "../Mushahid.css";
import { BlogContext } from "./BlogData";
import InputBox from "./InputBox";

const InputContext = createContext();
export { InputContext };
    
function Blogs() {
    
    const { blogData, setBlogData } = useContext(BlogContext);

    const [isOpentInputBox, setIsOpenInputBox] = useState(false);

    function openInputBox() {
        setIsOpenInputBox(true);
    }
    console.log(blogData);
    return (
        <>
            <div>
                <button onClick={openInputBox} type="button" className="btn">
                    Write a Blog
                </button>
            </div>

            {(isOpentInputBox == true) && (
                <InputContext.Provider value={{ isOpentInputBox, setIsOpenInputBox }}>
                    <InputBox />
                </InputContext.Provider>
            )}
            <div>
                {(isOpentInputBox == false) &&
                    blogData.map((val, indx) => (
                        <>
                            <br />

                            <div style={{ border: "1px solid gray", margin: "8px", padding: "8px", }} >

                                <Show val={val} indx={indx}/>

                            </div>
                        </>
                    ))}
            </div>
        </>
    )
}

export default Blogs;