import { useEffect, useState } from "react";
import blogService from "./services/blogs";

export default function Blog(props) {
  const [isHidden, setIsHidden] = useState({});
  const [likes, setLikes] = useState({});
  const [localLikes, setLocalLikes] = useState({});

  useEffect(() => {
    if (props.blogs && props.blogs.length > 0) {
      const initialLikes = props.blogs.reduce((acc, blog) => {
        acc[blog.id] = blog.likes;
        return acc;
      }, {})
      setLocalLikes(initialLikes);
    }else {
      setLocalLikes({})
    }
  }, [props.blogs]);

  const toggleVisible = (id) => {
    setIsHidden((prev) => {
      return { ...prev, [id]: !prev[id] };
    });
  };

  const handleLikes = async (id) => {
    const originalBlog = props.blogs.find(blog => blog.id === id)
    const originalLikes = localLikes[id] !== undefined ? localLikes[id] : originalBlog.likes
    const updatedLikes = originalLikes + 1
    setLikes((prev) => {
      return { ...prev, [id]: updatedLikes };
    });
    
    if (!originalBlog) {
      props.setErrorMessage(`Blog with ${id} does not exist`);
      setLikes((prev) => ({
        ...prev,
        [id]: (prev[id] || 1) - 1,
      }));
      return;
    }
    const payload = { ...originalBlog, likes: updatedLikes };
    try {
      if (props.user && props.user.token) {
        blogService.setToken(props.user.token);
      }
      const response = await blogService.update(payload);
      props.onBlogUpdate(response);
      if(props.onBlogUpdate){
        props.onBlogUpdate(response)
      }
      setLikes((prev) => ({
        ...prev,
        [response.id]: response.likes,
      }));
    } catch (error) {
      console.error(
        "Error updating blog:",
        error.response?.data || error.message
      );
      if (props.setErrorMessage) {
        props.setErrorMessage(
          error.response?.data?.error || "Failed to update like"
        );
        setTimeout(() => {
          props.setErrorMessage(null);
        }, 4000);
      }
      setLikes((prev) => ({
        ...prev,
        [id]: (prev[id] || 1) - 1,
      }));
    }
  };

  return (
    <>
      <h2>Blogs</h2>
      <ul style={{ margin: "0", padding: "0" }}>
        {props.blogs.map((blog) => (
          <li
            key={blog.id}
            id={blog.id}
            title={blog.title}
            author={blog.author}
            style={{
              border: "1px solid black",
              listStyle: "none",
              padding: "8px",
              marginBottom: "16px",
            }}
          >
            {blog.title} by {blog.author}
            <button onClick={() => toggleVisible(blog.id)}>
              {isHidden[blog.id] ? "hide" : "view"}
            </button>
            {isHidden[blog.id] && (
              <>
                <div>
                  <span>URL: </span> {blog.url}{" "}
                </div>
                <div>
                  <span>Likes: </span>{" "}
                  {localLikes[blog.id] !== undefined
                    ? localLikes[blog.id]
                    : blog.likes}
                  <button onClick={() => handleLikes(blog.id)}>Like</button>
                </div>
                <div>
                  <span>User: </span> {blog.user.username}{" "}
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
