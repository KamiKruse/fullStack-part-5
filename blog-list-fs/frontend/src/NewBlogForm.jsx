export default function NewBlogForm(props){
  return (
    <form onSubmit={props.handleBlog} className="togglableContent">
      <label>Title: </label>
      <input
        value={props.newBlog.title}
        onChange={props.handleOnTitleChange}
        placeholder='Blog Title'
        required
      />
      <label>Author: </label>
      <input
        value={props.newBlog.author}
        onChange={props.handleOnAuthorChange}
        placeholder='Blog Author'
        required
      />
      <label>Url: </label>
      <input
        value={props.newBlog.url}
        onChange={props.handleOnURLChange}
        placeholder='Blog URL'
        required
      />
      <button>Add Blog</button>
    </form>
  )
}
