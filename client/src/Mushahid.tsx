import React, { useState } from "react";

function Mushahid() {

    const data = JSON.parse(localStorage.getItem('blogs'));

    const [blogs, setBlogs] = useState(data);
    const [whoIsLoggedIn, setWhoIsLoggedIn] = useState("nobody");

    const [showBlogs, setShowBlogs] = useState(true);
    const [showBlogInputBox, setShowBlogInputBox] = useState(false);
    const [showCreatButton, setShowCreatButton] = useState(true);
    const [blogTitel, setBlogTitel] = useState("");
    const [postBody, setPostBody] = useState("");


    if (data === null) {
        const cratingData = {
           blogs: [
                {
                "title": "example_title",
                "body": "this example body for blog",
                "author": "nobody"
                }
            ]
        };
        localStorage.setItem('data', JSON.stringify(cratingData));
    }

    console.log('okk')

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
            <div>
                {
                    showCreatButton &&
                    <button onClick={openBlogInputBox} type="button" className="btn">Write a Blog</button>
                }
            </div>

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
            {/* <div>
                {
                    showBlogs && blogs.map((val) => (
                        <>
                            <b>{val.title}</b>
                            <small>Blog by {val.author}</small>
                            <p>{val.body}</p>
                        </>
                    ))
                }
            </div> */}
        </>
    )
}

export default Mushahid;