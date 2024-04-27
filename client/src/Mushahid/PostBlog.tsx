import React from "react";

function PostBlog{
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

export default PostBlog;