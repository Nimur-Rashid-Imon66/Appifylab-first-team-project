import { useContext, useEffect, useState } from "react";
import "../Mushahid.css";
import { OnlineUserContext } from "../App";
import axios from "axios";

function Mushahid() {

  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    console.log('ok')
  }, []);

  console.log(blogPosts);

  const { currentLoginUser, setCurrentLoginUser } = useContext(OnlineUserContext);
  
  const [showBlogs, setShowBlogs] = useState(true);
  const [showBlogInputBox, setShowBlogInputBox] = useState(false);
  const [blogTitel, setBlogTitel] = useState();
  const [postBody, setPostBody] = useState();

  const storeTitle = (event) => {
    setBlogTitel(event.target.value);
  };

  const storePost = (event) => {
    setPostBody(event.target.value);
  };

  function openBlogInputBox() {
    setShowBlogInputBox(true);
    setShowBlogs(false);
  }

  async function storeBlog() {
    const newPost = {
      title: blogTitel,
      description: postBody,
      author: currentLoginUser.username,
    };

    const Title = (newPost.title).trim();
    const Body = (newPost.description).trim();

    if (Title.length == 0 || Body.length == 0) {
      alert('Titel and Body cannot be null or empty');
      return;
    }
    setIsLoading(true);
    await axios.post("http://localhost:3333/blog/post", {
      title: newPost.title,
      description: newPost.description,
      author: newPost.author
    });
    blogPosts.unshift(newPost)
    setBlogPosts(blogPosts);

    setPostBody("");
    setBlogTitel("");
    setShowBlogInputBox(false);
    setShowBlogs(true);
    setIsLoading(false);
  }

  async function remove(id, author, indx) {
    if (author != currentLoginUser.username) {
      alert("Only author can delete the post");
      return;
    }
    else {
      setIsLoading(true);
      await axios.post(`http://localhost:3333/blog/${id}/delete`);
      
      const newArray = blogPosts.filter((_, index) => index !== indx);
      setBlogPosts(newArray);
      setIsLoading(false);
    }
  }
  
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editPostId, setEditPostId] = useState(null);

  const storeEdit = (event) => {
    setEditValue(event.target.value);
  };

  function edit(indx, author, value, id) {
    if (author != currentLoginUser.username) {
      alert("Only author can edit the post");
      return;
    } else {
      setOpenEdit(true);
      setEditId(indx);
      setEditValue(value);
      setEditPostId(id);
    }
  }

  async function update() {

    const edv = editValue.trim();

    if (edv.length == 0) {
      alert('Your Updated value contain nothing do you want to delete the post');
      setOpenEdit(false);
      setEditId(null);
      setEditValue('');
      setEditPostId(null);
      return;
    }
    setIsLoading(true);
    await axios.post(`http://localhost:3333/blog/${editPostId}/edit`, { description: editValue })
    blogPosts[editId].description = editValue;
    setBlogPosts(blogPosts)
    setOpenEdit(false);
    setEditId(null);
    setEditValue('');
    setEditPostId(null);
    setIsLoading(false);

  }

  return (
    <>
      <div>
        <button onClick={openBlogInputBox} type="button" className="btn" disabled={isLoading}>
          Write a Blog
        </button>
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
             {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </div>
      )}
      <div>
        {showBlogs &&
          blogPosts.map((val, indx) => (
            <>
              <br />

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
                      disabled={isLoading}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => remove(val.id, val.author, indx)}
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
                      disabled={isLoading}
                    >
                     {isLoading ? 'Loading...' : 'Delete'}
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
                    <button onClick={update} disabled={isLoading} type="button" className="btn">
                       {isLoading ? 'Loading...' : 'update'}
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
