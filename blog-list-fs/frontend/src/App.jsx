import { useState, useEffect } from "react";
import Blog from "./Blog";
import loginService from "./services/login";
import blogService from "./services/blogs";

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if(!user){
      setErrorMessage('valid user not found')
      return
    } else {
      blogService.getAll(user.id).then((blogs) => setBlogs(blogs));
    }
    
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Log in</button>
    </form>
  );
  return (
    <main>
      <h1>Log in to application</h1>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <h2>Blogs</h2>
          <ul>
            {blogs.map((blog) => (
              <Blog key={blog.id} id={blog.id} title={blog.title} author={blog.author} />
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}

export default App;
