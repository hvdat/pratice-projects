import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const tabs = ["posts", "albums", "users"];
  const [post, setPost] = useState([]);
  const [type, setType] = useState("");

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [type]);

  return (
    <div className="App">
      {tabs.map((tab) => (
        <button
          style={type === tab ? { backgroundColor: "pink" } : {}}
          key={tab}
          onClick={() => setType(tab)}
        >
          {tab}
        </button>
      ))}
      <div>
        <ul>
          {post.map((e) => (
            <li>{e.title || e.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
