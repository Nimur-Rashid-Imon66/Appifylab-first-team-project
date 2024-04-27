import React from "react";


function ShowBlogs() {
    return (
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
    )
}

export default ShowBlogs;