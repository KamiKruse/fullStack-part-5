import blogService from './services/blogs'
import { useState } from 'react'
import NewBlogForm from './NewBlogForm'

export default function NewBlog(props) {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })
  const handleBlog = async (event) => {
    event.preventDefault()
    try {
      blogService.setToken(props.user.token)
      const response = await blogService.create(newBlog)
      if (response) {
        setNewBlog({
          title: '',
          author: '',
          url: '',
        })
        props.setSuccessMessage(
          `a new blog ${newBlog.title} by ${newBlog.author} added`
        )
        setTimeout(() => {
          props.setSuccessMessage(null)
        }, 4000)
      }
    } catch (error) {
      props.setErrorMessage(error)
      setTimeout(() => {
        props.setErrorMessage(null)
      }, 4000)
    }
  }
  const handleOnTitleChange = (e) => {
    setNewBlog((prev) => ({
      ...prev,
      title: e.target.value,
    }))
  }
  const handleOnAuthorChange = (e) => {
    setNewBlog((prev) => ({
      ...prev,
      author: e.target.value,
    }))
  }
  const handleOnURLChange = (e) => {
    setNewBlog((prev) => ({
      ...prev,
      url: e.target.value,
    }))
  }
  return (
    <>
      <h2>Add Blogs</h2>
      <NewBlogForm
        handleBlog={handleBlog}
        newBlog={newBlog}
        handleOnTitleChange={handleOnTitleChange}
        handleOnAuthorChange={handleOnAuthorChange}
        handleOnURLChange={handleOnURLChange}
      />
    </>
  )
}
