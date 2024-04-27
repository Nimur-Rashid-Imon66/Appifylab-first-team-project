import axios from "axios";
import React, { useContext, useState } from "react";
import { OnlineUserContext } from "../App";
import "../Mushahid.css";
import { InputContext } from "./Blogs";
import { BlogContext } from "./BlogData";

function InputBox() {

    const { isOpentInputBox, setIsOpenInputBox } = useContext(InputContext);
    const { blogData, setBlogData } = useContext(BlogContext);
    
    const [blogTitel, setBlogTitel] = useState(null);
    const [postBody, setPostBody] = useState(null);

    const { currentLoginUser, setCurrentLoginUser } = useContext(OnlineUserContext);

    const storeTitle = (event) => {
        setBlogTitel(event.target.value);
    };

    const storePost = (event) => {
        setPostBody(event.target.value);
    };

    async function storeBlog() {
        
        const obj = {
            title: blogTitel,
            description: postBody,
            author: currentLoginUser.username
        }
        
        const Title = (blogTitel).trim();
        const Body = (postBody).trim();

        if (Title.length == 0 || Body.length == 0) {
            alert('Titel and Body cannot be null or empty');
            return;
        }
        await axios.post("http://localhost:3333/blog/post",
            obj
        );

        setBlogData(blogData.unshift(obj));
        setIsOpenInputBox(false);
    }

    return (
        <div>
            <div className="form-group">
                <label>Titel</label>
                <br />
                <input
                    onChange={storeTitle}
                    value={blogTitel}
                    type="text"
                    placeholder="titel"
                />
                <label>Post Body</label>
                <br />
                <textarea
                    onChange={storePost}
                    value={postBody}
                    placeholder="body..."
                />
            </div>
            <button onClick={storeBlog} type="button" className="btn">
                post
            </button>
        </div>
    )
}

export default InputBox;