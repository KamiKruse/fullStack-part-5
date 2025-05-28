import blogService from "./services/blogs";
import { useState } from "react";

export default function NewBlog(props) {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  const handleBlog = async (event) => {
    event.preventDefault();
    try {
      blogService.setToken(props.user.token);
      const response = await blogService.create(newBlog);
      if (response) {
        setNewBlog({
          title: "",
          author: "",
          url: "",
        });
        props.setSuccessMessage(
          `a new blog ${newBlog.title} by ${newBlog.author} added`
        );
        setTimeout(() => {
          props.setSuccessMessage(null);
        }, 4000);
      }
    } catch (error) {
      props.setErrorMessage(error);
      setTimeout(() => {
        props.setErrorMessage(null);
      }, 4000);
    }
  };
  return (
    <>
      <h2>Add Blogs</h2>
      <form onSubmit={handleBlog}>
        <label>Title: </label>
        <input
          value={newBlog.title}
          onChange={(e) =>
            setNewBlog((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
          required
        />
        <label>Author: </label>
        <input
          value={newBlog.author}
          onChange={(e) =>
            setNewBlog((prev) => ({
              ...prev,
              author: e.target.value,
            }))
          }
          required
        />
        <label>Url: </label>
        <input
          value={newBlog.url}
          onChange={(e) =>
            setNewBlog((prev) => ({
              ...prev,
              url: e.target.value,
            }))
          }
          required
        />
        <button>Add Blog</button>
      </form>
    </>
  );
}
