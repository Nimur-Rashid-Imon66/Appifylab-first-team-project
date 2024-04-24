import React, { useContext, useEffect, useState } from "react";
import "./Mushahid.css";
import { OnlineUserContext } from "./App";

function Mushahid() {
  let data = JSON.parse(localStorage.getItem("data"));
<<<<<<< HEAD

  const [blogs, setBlogs] = useState(data);
  const { currentLoginUser } = useContext(OnlineUserContext);
  const whoIsLoggedIn = currentLoginUser.username;

  const [showBlogs, setShowBlogs] = useState(true);
  const [showBlogInputBox, setShowBlogInputBox] = useState(false);
  const [showCreatButton, setShowCreatButton] = useState(true);
  const [blogTitel, setBlogTitel] = useState("");
  const [postBody, setPostBody] = useState("");

  if (data == null) {
    const creatingData = {
      blogs: [
        {
          title: "example_title",
          body: "this example body for blog",
          author: "nobody",
        },
      ],
    };
    localStorage.setItem("data", JSON.stringify(creatingData));
  }

  const storeTitle = (event) => {
    setBlogTitel(event.target.value);
  };

  const storePost = (event) => {
    setPostBody(event.target.value);
  };

  function openBlogInputBox() {
    setShowBlogInputBox(true);
    setShowCreatButton(false);
    setShowBlogs(false);
  }

  function storeBlog() {
    const newPost = {
      title: blogTitel,
      body: postBody,
      author: whoIsLoggedIn,
    };

    let localData = JSON.parse(localStorage.getItem("data"));
    localData.blogs.push(newPost);
    localStorage.setItem("data", JSON.stringify(localData));

    setBlogs(localData);
    setPostBody("");
    setBlogTitel("");
    setShowBlogInputBox(false);
    setShowCreatButton(true);
    setShowBlogs(true);
  }

  function remove(indx, author) {
    if (author !== whoIsLoggedIn) {
      alert("Only author can delete the post");
      return;
    }

    const updatedBlogs = blogs.blogs.filter((_, index) => index !== indx);
    localStorage.setItem("data", JSON.stringify({ blogs: updatedBlogs }));
    setBlogs({ blogs: updatedBlogs });
=======

  const [blogs, setBlogs] = useState(data);

  const { currentLoginUser, setCurrentLoginUser } =
        useContext(OnlineUserContext);
    
  const whoIsLoggedIn = currentLoginUser.username;

  const [showBlogs, setShowBlogs] = useState(true);
  const [showBlogInputBox, setShowBlogInputBox] = useState(false);
  const [showCreatButton, setShowCreatButton] = useState(true);
  const [blogTitel, setBlogTitel] = useState("");
  const [postBody, setPostBody] = useState("");

  if (data == null) {
    const cratingData = {
      blogs: [
        {
          title: "example_title",
          body: "this example body for blog",
          author: "nobody",
        },
      ],
    };
    localStorage.setItem("data", JSON.stringify(cratingData));
  }

  console.log(blogs);

  console.log("okk");

  const storeTitle = (event) => {
    setBlogTitel(event.target.value);
  };

  const storePost = (event) => {
    setPostBody(event.target.value);
  };

  function openBlogInputBox() {
    setShowBlogInputBox(true);
    setShowCreatButton(false);
    setShowBlogs(false);
  }

  function storeBlog() {
    const newPost = {
      title: blogTitel,
      body: postBody,
      author: whoIsLoggedIn,
    };

    let localData = JSON.parse(localStorage.getItem("data"));

    localData["blogs"].push(newPost);

    localStorage.setItem("data", JSON.stringify(localData));

    setBlogs(localData);

    setPostBody("");
    setBlogTitel("");
    setShowBlogInputBox(false);
    setShowCreatButton(true);
    setShowBlogs(true);
  }

  function remove(indx, author) {
    if (author != whoIsLoggedIn) {
      alert("Only author can delete the post");
      return;
    }

    blogs.blogs.splice(indx, 1);
    localStorage.setItem("data", JSON.stringify(blogs));
    setBlogs(JSON.parse(localStorage.getItem("data")));
>>>>>>> 5dc6263cf31131e19fc24b5acb23002f48475dfb
  }

  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  function edit(indx, author, value) {
    if (author !== whoIsLoggedIn) {
      alert("Only author can edit the post");
      return;
    }

    setOpenEdit(true);
    setEditId(indx);
    setEditValue(value);
  }

  const storeEdit = (event) => {
    setEditValue(event.target.value);
  };

  function update() {
    blogs.blogs[editId]["body"] = editValue;
    localStorage.setItem("data", JSON.stringify(blogs));
    setBlogs(blogs);

    setOpenEdit(false);
    setEditId(null);
    setEditValue("");
  }

  return (
    <>
      <div>
        {showCreatButton && whoIsLoggedIn !== "nobody" && (
          <button onClick={openBlogInputBox} type="button" className="btn">
            Write a Blog
          </button>
        )}
      </div>

      {showBlogInputBox && (
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
      )}
      <div>
        {showBlogs &&
          blogs.blogs.map((val, indx) => (
            <div
              key={indx}
              style={{
                border: "1px solid gray",
                margin: "8px",
                padding: "8px",
              }}
            >
              <b>{val.title} </b>
              <small>(author: {val.author})</small>
              <p>{val.body}</p>
              <button
                onClick={() => edit(indx, val.author, val.body)}
                style={{
                  height: "30px",
                  width: "120px",
                  marginRight: "5px",
                  padding: "5px 10px",
                  backgroundColor: "#ffc107",
                  color: "black",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => remove(indx, val.author)}
                style={{
                  height: "30px",
                  width: "120px",
                  padding: "5px 10px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
      {openEdit && (
        <div className="form-group">
          <textarea
            onChange={storeEdit}
            value={editValue}
            placeholder="body..."
          />
          <button onClick={update} type="button" className="btn">
            update
          </button>
        </div>
      )}
    </>
  );
}

export default Mushahid;