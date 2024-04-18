import React, { useState } from "react";
import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { Dropdown } from "react-bootstrap";

function Mushahid() {

    let data = JSON.parse(localStorage.getItem('data'));

    const [blogs, setBlogs] = useState(data);
    const [whoIsLoggedIn, setWhoIsLoggedIn] = useState("ahsan");

    const [showBlogs, setShowBlogs] = useState(true);
    const [showBlogInputBox, setShowBlogInputBox] = useState(false);
    const [showCreatButton, setShowCreatButton] = useState(true);
    const [blogTitel, setBlogTitel] = useState("");
    const [postBody, setPostBody] = useState("");


    if (data == null) {
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

    console.log(blogs);

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

        const newPost = {
            title: blogTitel,
            body: postBody,
            author: whoIsLoggedIn
        }

        let localData = JSON.parse(localStorage.getItem('data'));

        localData['blogs'].push(newPost);

        localStorage.setItem('data', JSON.stringify(localData));

        setBlogs(localData);

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
                    showCreatButton && (whoIsLoggedIn != 'nobody') &&
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
            <div>
                {
                    showBlogs && blogs.blogs.map((val) => (
                        <>
                            <br />
                            {/* <b>{val.title} {" "} </b>
                            <small>(author: {val.author})</small> */}
                            

                            <div style={{ border: '1px solid gray', margin: '8px', padding: '8px' }}>
                                <b>{val.title} {" "} </b>
                                <small>(author: {val.author})</small>
                                
                                <p>{val.body}</p>
                                <button style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                                <button style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                            </div>
                        </>
                    ))
                }
            </div>
        </>
    )
}

export default Mushahid;