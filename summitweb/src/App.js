import React, { useEffect, useState } from "react";
import "./App.css";
import TextTranslation from "./TextTranslation";

import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Post, PostStatus } from "./models";
import Amplify from "@aws-amplify/core";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);

function onCreate(title, body) {
  console.log("body = ", body);
  DataStore.save(
    new Post({
      title: title,
      body: body,
      status: PostStatus.ACTIVE
    })
  );
}

function onDeleteAll() {
  DataStore.delete(Post, Predicates.ALL);
}

async function listPosts(setPosts) {
  const posts = await DataStore.query(Post, Predicates.ALL);
  setPosts(posts);
}

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    listPosts(setPosts);
    const subscription = DataStore.observe(Post).subscribe(msg => {
      console.log("subscription-", msg.model, msg.opType, msg.element);
      listPosts(setPosts);
    });

    const handleConnectionChange = () => {
      const condition = navigator.onLine ? "online" : "offline";
      console.log(condition);
      if (condition === "online") {
        listPosts(setPosts);
      }
    };

    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);

    return () => subscription.unsubscribe();
  }, []);

  const onNewButton = () => {
    console.log("title=", title);
    onCreate(title, body);
    listPosts(setPosts);
  };
  const appChange = e => {
    //console.log("title", e.target.value);
    setTitle(e.target.value);
  };

  const bodyChange = e => {
    //console.log("title", e.target.value);
    setBody(e.target.value);
  };
  return (
    <div className="App">
      <header className="App-header">
        <div id="container">
          <h1>React App</h1>
          <ul class="tbl">
            <li>
              <div class="gridbox">
                <p class="tit">
                  <input
                    placeholder="Title"
                    value={title}
                    onChange={appChange}
                  ></input>
                </p>
                <p>
                  <textarea
                    placeholder="body"
                    value={body}
                    onChange={bodyChange}
                  ></textarea>
                </p>
                <div class="btn">
                  <button onClick={onNewButton}>New</button>
                  <button
                    onClick={() => {
                      onDeleteAll();
                      listPosts(setPosts);
                    }}
                  >
                    Delete All
                  </button>
                </div>
              </div>
            </li>

            {posts.map((item, i) => {
              return (
                <li>
                  <div class="gridbox">
                    <p class="tit">{posts[i].title}</p>
                    <p class="bdy">{posts[i].body}</p>
                    <div class="btn">
                       <TextTranslation id={posts[i].id} body={posts[i].body} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div class="btn_area"></div>
        </div>
      </header>
    </div>
  );
}

export default App;
