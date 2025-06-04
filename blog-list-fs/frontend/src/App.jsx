import { useState, useEffect} from "react";
import Blog from "./Blog";
import NewBlog from "./NewBlog";
import Login from "./Login";
import Notification from "./Notification";
import loginService from "./services/login";
import blogService from "./services/blogs";
import Togglable from "./Togglable";

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (!user) {
      setBlogs([])
      return;
    } else {
      blogService
        .getAll(user.id)
        .then((blogs) => setBlogs(blogs))
        .catch((error) => {
          setErrorMessage(`${error} : Could not load blogs`);
        });
    }
  }, [user, blogs]);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
    }
  }, []);

  const onBlogUpdate = async (blogFromServer) => {
    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === blogFromServer.id ? blogFromServer : blog
      )
    );
  };
  const onBlogDelete = (blogToBeDeleted) => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== blogToBeDeleted.id ))
  }
  
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
      }, 6000);
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
          <Togglable buttonLabel="New Blog">
            <NewBlog
              user={user}
              setErrorMessage={setErrorMessage}
              setSuccessMessage={setSuccessMessage}
            />
          </Togglable>
          <Blog
            blogs={blogs}
            user={user}
            setErrorMessage={setErrorMessage}
            onBlogUpdate={onBlogUpdate}
            onBlogDelete={onBlogDelete}
          />
        </div>
      )}
    </main>
  );
}

export default App;
