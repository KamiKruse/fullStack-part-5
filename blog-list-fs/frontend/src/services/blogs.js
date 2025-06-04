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
let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}
const create = async blogObj => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  try {
     const response = await axios.post(baseUrl, blogObj, config);
     return response.data;
  } catch (error) {
    throw new Error(`${error} : Error creating blogs`);
  }
}

const update = async blog => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const { id } = blog 
  try {
    const response = await axios.put(`${baseUrl}/${id}`, blog, config)
    return response.data
  } catch(error){
    throw new Error(`${error} : Error updating likes`);
  }
}

const deleteBlog = async blog => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const { id } = blog
  try {
     const response = await axios.delete(`${baseUrl}/${id}`, config);
     return response.data
  } catch (error) {
    throw new Error(`${error} : Error deleting blog`);
  }
}
export default { getAll, create, setToken, update, deleteBlog };
