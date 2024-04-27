import React, { createContext, useContext, useState } from "react";
import Edit from "./Edit";
import axios from "axios";
import "../Mushahid.css";
import { BlogContext } from "./BlogData";

const InputContext = createContext();
export { InputContext };
    
function Show({ val, indx }) {

    const { blogData, setBlogData } = useContext(BlogContext);

    const [editId, setEditId] = useState(null);

    const { currentLoginUser, setCurrentLoginUser } = useContext(OnlineUserContext);

    async function remove(id, author, indx) {
        if (author != currentLoginUser.username) {
            alert("Only author can delete the post");
            return;
        }
        else {
            await axios.post(`http://localhost:3333/blog/${id}/delete`);
            blogData.splice(indx, 1);
            setBlogData(blogData);
        }
    }

    return (
        <>
            <b>{val.title} </b>
            <small>(author: {val.author})</small>

            {editId != indx && (<>
                <p>{val.description}</p>
                <button
                    onClick={() => setEditId(indx)}
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
                >
                    Delete
                </button>
            </>)
            }

            {editId == indx && (
                <Edit val={val} indx={indx}
                    editId={editId} setEditId={setEditId} />)}
        </>
    )
}

export default Show;