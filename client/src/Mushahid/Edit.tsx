import axios from "axios";
import React, { useState } from "react";
import "../Mushahid.css";

function Edit({ val, blogData, blogPosts, setBlogPosts, editId, setEditId }) {

    const [editValue, setEditValue] = useState(val.description);

    const storeEdit = (event) => {
        setEditValue(event.target.value);
    };

    async function update() {

        const edv = editValue.trim();

        if (edv.length == 0) {
            alert('Your Updated value contain nothing do you want to delete the post');
            setEditId(null);
            return;
        }
        await axios.post(`http://localhost:3333/blog/${val.id}/edit`, { description: editValue })

        val.description = editValue;
        blogData[editId] = val;
        setBlogPosts(blogData)
        setEditId(null);

    }

    return (
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
    )
}

export default Edit;