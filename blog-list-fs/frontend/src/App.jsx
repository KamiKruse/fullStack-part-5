import { useState, useEffect } from "react";
import Blog from "./Blog";
import NewBlog from "./NewBlog";
import Login from "./Login";
import Notification from "./Notification";
import loginService from "./services/login";
import blogService from "./services/blogs";

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (!user) {
      return;
    } else {
      blogService.getAll(user.id).then((blogs) => setBlogs(blogs));
    }
  }, [user, blogs]);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setErrorMessage(null);
      setSuccessMessage("Successfuly logged in");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 2000);
    } catch {
      setErrorMessage(`Wrong username or password`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };
  const handleBlog = async (event) => {
    event.preventDefault();
    try {
      blogService.setToken(user.token);
      const response = await blogService.create(newBlog);
      if (response) {
        setNewBlog({
          title: "",
          author: "",
          url: "",
        });
        setSuccessMessage(
          `a new blog ${newBlog.title} by ${newBlog.author} added`
        );
        setTimeout(() => {
          setSuccessMessage(null);
        }, 4000);
      }
    } catch (error) {
      setErrorMessage(error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    }
  };
  const handleLogOut = () => {
    window.localStorage.removeItem("loggedInUser");
    location.reload();
  };
  return (
    <main>
      {user === null ? (
        <Login
          handleSubmit={handleSubmit}
          onUserNameChange={(e) => setUsername(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          username={username}
          password={password}
          error={errorMessage}
        />
      ) : (
        <div>
          <h1>Blog Page</h1>
          {successMessage || errorMessage ? (
            <Notification success={successMessage} err={errorMessage} />
          ) : null}
          <p>{user.name} logged in</p>
          <button onClick={handleLogOut}>logout</button>
          <NewBlog
            handleBlog={handleBlog}
            newBlog={newBlog}
            onTitleChange={(e) =>
              setNewBlog((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            onAuthorChange={(e) =>
              setNewBlog((prev) => ({
                ...prev,
                author: e.target.value,
              }))
            }
            onURLChange={(e) =>
              setNewBlog((prev) => ({
                ...prev,
                url: e.target.value,
              }))
            }
            error={errorMessage}
            success={successMessage}
          />
          <Blog blogs={blogs} />
        </div>
      )}
    </main>
  );
}

export default App;
