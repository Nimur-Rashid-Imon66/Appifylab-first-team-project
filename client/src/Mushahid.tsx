import React, { useContext, useEffect, useState } from "react";
import "./Mushahid.css";
import { OnlineUserContext } from "./App";
import axios from "axios";
import { MdDescription } from "react-icons/md";

function Mushahid() {
  // --------------------------------------------------------------------------------
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3333/blog/show');
        setBlogPosts(response.data.blogs);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };
    fetchData();
  }, [blogPosts]);
  // ---------------------------------------------------------------------------------------

  const { currentLoginUser, setCurrentLoginUser } = useContext(OnlineUserContext);
  const whoIsLoggedIn = currentLoginUser.username;

  const [showBlogs, setShowBlogs] = useState(true);
  const [showBlogInputBox, setShowBlogInputBox] = useState(false);
  const [showCreatButton, setShowCreatButton] = useState(true);
  const [blogTitel, setBlogTitel] = useState("");
  const [postBody, setPostBody] = useState("");

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

  async function storeBlog() {
    const newPost = {
      title: blogTitel,
      body: postBody,
      author: whoIsLoggedIn,
    };

    await axios.post("http://localhost:3333/blog/post", {
      title: newPost.title,
      description: newPost.body,
      author: newPost.author
    });
    setBlogPosts(blogPosts)

    setPostBody("");
    setBlogTitel("");
    setShowBlogInputBox(false);
    setShowCreatButton(true);
    setShowBlogs(true);
  }

  async function remove(id, author) {
    if (author != whoIsLoggedIn) {
      alert("Only author can delete the post");
      return;
    }
    else {
      await axios.post(`http://localhost:3333/blog/${id}/delete`);
      setBlogPosts(blogPosts);
    }
  }

  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editPostId, setEditPostId] = useState(null);

  function edit(indx, author, value, id) {
    if (author != whoIsLoggedIn) {
      alert("Only author can edit the post");
      return;
    } else {
      setOpenEdit(true);
      setEditId(indx);
      setEditValue(value);
      setEditPostId(id);
    }
  }

  const storeEdit = (event) => {
    setEditValue(event.target.value);
  };

  async function update() {
    
    await axios.post(`http://localhost:3333/blog/${editPostId}/edit`, { description: editValue })
    setBlogPosts(blogPosts)
    setOpenEdit(false);
    setEditId(null);
    setEditValue('');
    setEditPostId(null);

  }

  return (
    <>
      <div>
        {showCreatButton &&
          whoIsLoggedIn != "nobody" &&
          whoIsLoggedIn != "nobody" && (
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
          blogPosts.map((val, indx) => (
            <>
              <br />
              {/* <b>{val.title} {" "} </b>
                            <small>(author: {val.author})</small> */}

              <div
                style={{
                  border: "1px solid gray",
                  margin: "8px",
                  padding: "8px",
                }}
              >
                {editId != indx && (
                  <>
                    <b>{val.title} </b>
                    <small>(author: {val.author})</small>

                    <p>{val.description}</p>
                    <button
                      onClick={() => edit(indx, val.author, val.description, val.id)}
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
                      onClick={() => remove(val.id, val.author)}
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
                  </>
                )}
                {openEdit && editId == indx && (
                  <>
                    <div className="form-group">
                      <textarea
                        onChange={storeEdit}
                        value={editValue}
                        placeholder="body..."
                      />
                    </div>
                    <button onClick={update} type="button" className="btn">
                      update
                    </button>
                  </>
                )}
              </div>
            </>
          ))}
      </div>
    </>
  );
}

export default Mushahid;
