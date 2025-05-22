import axios from "axios";

const baseUrl = "/api/blogs";

const getAll = async (userId) => {
  let arr = [];
  try {
    const response = await axios.get(baseUrl);
    const blogs = await response.data;
    for (const blog of blogs) {
      if (blog.user === undefined) {
        continue;
      } else {
        if (blog.user.id === userId) {
          arr.push(blog);
        }
      }
    }
    return arr;
  } catch (error) {
    throw new Error(`${error} : Error getting blogs`);
  }
};

export default { getAll };
