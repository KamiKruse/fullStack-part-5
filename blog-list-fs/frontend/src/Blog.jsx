export default function Blog(props) {
  return (
    <>
      <h2>Blogs</h2>
      <ul>
        {props.blogs.map((blog) => (
          <li
            key={blog.id}
            id={blog.id}
            title={blog.title}
            author={blog.author}
          >
            {blog.title} by {blog.author}
          </li>
        ))}
      </ul>
    </>
  );
}
