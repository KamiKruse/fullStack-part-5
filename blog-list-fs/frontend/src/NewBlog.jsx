export default function NewBlog(props) {
  return (
    <>
      <h2>Add Blogs</h2>
      <form onSubmit={props.handleBlog}>
        <label>Title: </label>
        <input
          value={props.newBlog.title}
          onChange={props.onTitleChange}
          required
        />
        <label>Author: </label>
        <input
          value={props.newBlog.author}
          onChange={props.onAuthorChange}
          required
        />
        <label>Url: </label>
        <input
          value={props.newBlog.url}
          onChange={props.onURLChange}
          required
        />
        <button>Add Blog</button>
      </form>
    </>
  );
}
