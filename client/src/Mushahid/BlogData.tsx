import { createContext, useEffect, useState } from "react";
import Blogs from "./Blogs";
import axios from "axios";
import "../Mushahid.css";

const BlogContext = createContext();
export { BlogContext };

function BlogData() {

    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3333/blog/show');
                setBlogData(response.data.blogs)

            } catch (error) {
                console.error('Error fetching blog posts:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <>

            <BlogContext.Provider value={{ blogData, setBlogData }}>
                <Blogs />
            </BlogContext.Provider>
        </>
    );
}

export default BlogData;