import { useEffect, useState, useMemo } from "react";
import Blog from "./Blog";
import blogService from "./services/blogs";

export default function BlogList(props) {
  const [isHidden, setIsHidden] = useState({});
  const [localLikes, setLocalLikes] = useState({});

  const sortedPropEntries = useMemo(() => {
    if (!props.blogs || props.blogs.length === 0) {
      return [];
    }
    const getEffectiveLikes = (blog) => {
      return localLikes[blog.id] !== undefined
        ? localLikes[blog.id]
        : blog.likes;
    };

    const copiedBlogs = [...props.blogs];
    return copiedBlogs.sort((a, b) => {
      return getEffectiveLikes(b) - getEffectiveLikes(a);
    });
  }, [props.blogs, localLikes]);

  useEffect(() => {
    if (props.blogs && props.blogs.length > 0) {
      const initialLikes = props.blogs.reduce((acc, blog) => {
        acc[blog.id] = blog.likes;
        return acc;
      }, {});
      setLocalLikes(initialLikes);
    } else {
      setLocalLikes({});
    }
  }, [props.blogs]);

  const toggleVisible = (id) => {
    setIsHidden((prev) => {
      return { ...prev, [id]: !prev[id] };
    });
  };

  const handleLikes = async (id) => {
    const originalBlog = props.blogs.find((blog) => blog.id === id);
    if (!originalBlog) {
      props.setErrorMessage(`Blog with ${id} does not exist`)
      return
    }
    const originalLikes =
      localLikes[id] !== undefined ? localLikes[id] : originalBlog.likes;
    const updatedLikes = originalLikes + 1;
   
    const payload = { ...originalBlog, likes: updatedLikes };
    try {
      if (props.user && props.user.token) {
        blogService.setToken(props.user.token);
      }
      const response = await blogService.update(payload);
      if (props.onBlogUpdate) {
        props.onBlogUpdate(response);
      }
      setLocalLikes((prev) => ({
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
      setLocalLikes((prev) => ({
        ...prev,
        [id]: originalLikes,
      }));
    }
  };

  if (!sortedPropEntries || !Array.isArray(sortedPropEntries)) {
    console.error(
      "sortedPropEntries is not an array before rendering map:",
      sortedPropEntries
    );
    return <p>Error: Blogs data is currently unavailable.</p>; // Or some other fallback UI
  }

  const handleDelete = async (id) => {
    const findBlog = props.blogs.find((blog) => blog.id === id);
    if (!findBlog) {
      props.setErrorMessage(`Blog with ${id} does not exist`);
    }
    try {
      if (props.user && props.user.token) {
        blogService.setToken(props.user.token);
      }
      await blogService.deleteBlog(findBlog);
      props.onBlogDelete(findBlog);
    } catch (error) {
      console.error(
        "Error updating blog:",
        error.response?.data || error.message
      );
      if (props.setErrorMessage) {
        props.setErrorMessage(
          error.response?.data?.error || "Failed to delete blog"
        );
        setTimeout(() => {
          props.setErrorMessage(null);
        }, 4000);
      }
    }
  };

  return (
    <>
      <h2>Blogs</h2>
      <ul style={{ margin: '0', padding: '0' }}>
        {sortedPropEntries.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            style={{
              border: '1px solid black',
              listStyle: 'none',
              padding: '8px',
              marginBottom: '16px',
            }}
            className='blog'
            isHidden={isHidden}
            toggleVisible={toggleVisible}
            localLikes={localLikes}
            handleLikes={handleLikes}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </>
  )
}
