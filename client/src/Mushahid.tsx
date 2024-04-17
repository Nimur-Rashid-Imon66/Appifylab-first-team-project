import React, { useState } from "react";

function Mushahid() {

    const [showBlogs, setShowBlogs] = useState(true);
    const [showBlogInputBox, setShowBlogInputBox] = useState(false);
    const [showCreatButton, setShowCreatButton] = useState(true);
    const [blogTitel, setBlogTitel] = useState("");
    const [postBody, setPostBody] = useState("");

    const storeTitle = (event) => {
        setBlogTitel(event.target.value);
    }

    const storePost = (event) => {
        setPostBody(event.target.value);
    }

    function openBlogInputBox() {
        setShowBlogInputBox(true);
        setShowCreatButton(false)
        setShowBlogs(false)
    }

    function storeBlog() {

        alert(blogTitel);
        alert(postBody);
        setPostBody("");
        setBlogTitel("");
        setShowBlogInputBox(false);
        setShowCreatButton(true);
        setShowBlogs(true)

    }

    return (
        <>
            {
                showCreatButton &&
                <button onClick={openBlogInputBox} type="button" className="btn">Write a Blog</button>
            }

            {
                showBlogInputBox && (
                    <div>
                        <div className="form-group">
                            <label>Titel</label>
                            <br />
                            <input onChange={storeTitle} value={blogTitel} type="text" placeholder="titel" />
                            <label>Post Body</label>
                            <br />
                            <textarea onChange={storePost} value={postBody} placeholder="body..." />
                        </div>
                        <button onClick={storeBlog} type="button" className="btn">post</button>
                    </div>
                )
            }

            {
                showBlogs && <h1>No blog to show @ahsan please create user</h1>
            }
        </>
    )
}

export default Mushahid;