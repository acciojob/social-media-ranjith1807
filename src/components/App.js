import React from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  useParams,
  useHistory
} from "react-router-dom";

function NavigationBar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Posts</Link></li>
        <li><Link to="/users">Users</Link></li>
        <li><Link to="/notifications">Notifications</Link></li>
      </ul>
    </nav>
  );
}

function Home({ posts, setPosts }) {
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [content, setContent] = React.useState("");

  const addPost = () => {
    if (!title || !author || !content) return;
    const newPost = {
      id: Date.now(),
      title,
      author,
      content,
      reactions: [0, 0, 0, 0, 0]
    };
    setPosts([newPost, ...posts]);
    setTitle("");
    setAuthor("");
    setContent("");
  };

  const addReaction = (postId, index) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const reactions = [...post.reactions];
          reactions[index]++;
          return { ...post, reactions };
        }
        return post;
      })
    );
  };

  return (
    <div className="App">
      <h1>GenZ</h1>
      
  

      <br />
      <input
        id="postTitle"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <br />
      <select
        id="postAuthor"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      >
        <option value="">Select User</option>
        <option value="John">John</option>
        <option value="Sarah">Sarah</option>
        <option value="Banu">Banu</option>
      </select>
      <br />
      <br />
      <textarea
        id="postContent"
        placeholder="Post Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <br />
      <form>
        <button type="button" onClick={addPost}>
           Save Post
        </button>
      </form>

      <hr />

      <div className="posts-list">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>

            <div></div>

            <div>
              <button onClick={() => addReaction(post.id, 0)}>
                👍 {post.reactions[0]}
              </button>

              <button onClick={() => addReaction(post.id, 1)}>
                ❤️ {post.reactions[1]}
              </button>

              <button onClick={() => addReaction(post.id, 2)}>
                🎉 {post.reactions[2]}
              </button>

              <button onClick={() => addReaction(post.id, 3)}>
                🚀 {post.reactions[3]}
              </button>

              <button onClick={() => addReaction(post.id, 4)}>
                👀 {post.reactions[4]}
              </button>
            </div>

            <Link className="button" to={`/posts/${post.id}`}>
              View Post
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function Users() {
  return (
    <div>
      <h1>Users</h1>

      <div className="post">
        <h3>
          <Link to="/users/1">John</Link>
        </h3>
      </div>

      <div className="post">
        <h3>
          <Link to="/users/2">Sarah</Link>
        </h3>
      </div>

      <div className="post">
        <h3>
          <Link to="/users/3">Banu</Link>
        </h3>
      </div>
    </div>
  );
}

function UserPosts({ posts }) {
  const { userId } = useParams();

  const users = {
    1: "John",
    2: "Sarah",
    3: "Banu"
  };

  const userName = users[userId];

  const userPosts = posts.filter(
    (post) => post.author === userName
  );

  return (
    <div>
      <h1>{userName}'s Posts</h1>
      
    

      <br />

      {userPosts.map((post) => (
        <div className="post" key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

function Notifications() {
  const [items, setItems] = React.useState([]);

  return (
    <div>
      <h1>Notifications</h1>
      
     

      <br />
      <button
        className="button"
        onClick={() =>
          setItems([
            "New Notification",
            "Post Updated",
            "Reaction Added"
          ])
        }
      >
        Refresh Notifications
      </button>

      <section className="notificationsList">
        {items.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </section>
    </div>
  );
}

function SinglePostPage({ posts, setPosts }) {
  const { postId } = useParams();
  const history = useHistory();

  const post = posts.find(
    (p) => p.id === Number(postId)
  );

  const [title, setTitle] = React.useState(post?.title || "");
  const [content, setContent] = React.useState(post?.content || "");

  const savePost = () => {
    setPosts(
      posts.map((p) =>
        p.id === Number(postId)
          ? { ...p, title, content }
          : p
      )
    );

    history.push("/");
  };

  return (
    <div className="post">
      <h2>Single Post</h2>
      

      <br />

      <button className="button">Edit Post</button>

      <br />
      <br />

      <input
        id="postTitle"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <textarea
        id="postContent"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br />
      <br />

      <button type="button" onClick={savePost}>
         Save Post
      </button>
    </div>
  );
}

function App() {
  const [posts, setPosts] = React.useState([
    {
      id: 1,
      title: "First Post",
      author: "John",
      content: "Hello World",
      reactions: [0, 0, 0, 0, 0]
    },
    {
      id: 2,
      title: "Second Post",
      author: "Sarah",
      content: "Second Content",
      reactions: [0, 0, 0, 0, 0]
    }
  ]);

  return (
    <BrowserRouter>
      <NavigationBar />
      
      <Switch>
        <Route exact path="/">
          <Home posts={posts} setPosts={setPosts} />
        </Route>

        <Route exact path="/users">
          <Users posts={posts} />
        </Route>

        <Route exact path="/users/:userId">
          <UserPosts posts={posts} />
        </Route>

        <Route exact path="/notifications">
          <Notifications />
        </Route>

        <Route exact path="/posts/:postId">
          <SinglePostPage
            posts={posts}
            setPosts={setPosts}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;