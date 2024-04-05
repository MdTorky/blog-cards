import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file


function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="App">
      <div className="containers">
        {posts.map(post => (
          <div className="container" key={post.id}>
            <h2 className='container-title'>Cloud And Server</h2>
            <hr />
            <img src={post?.featured_media} className="" />
            <h3>{post?.title.rendered}</h3>
            <p>By <a href={post?._embedded.author[0].url}> {post._embedded.author[0].name}</a> on {formatDate(post.date)}</p>
            <hr />
            <h4>Article</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
