import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestAxios = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [newPost, setNewPost] = useState(null);

  // GET request example
  // use effect is on creation of the components
  // after the ui of this page is created
  // the useEffect will be called.
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => setData(response.data))
    .catch(error => console.error('Error fetching data: ', error));
  }

  // POST request example
  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      title: title,
      body: body,
      userId: 1
    };

    axios.post('https://jsonplaceholder.typicode.com/posts', postData)
      .then(response => {
        setNewPost(response.data);
        setTitle('');
        setBody('');
      })
      .catch(error => console.error('Error posting data: ', error));
  };

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <textarea
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {newPost && (
        <div>
          <h3>New Post Created</h3>
          <p>Title: {newPost.title}</p>
          <p>Body: {newPost.body}</p>
        </div>
      )}
    </div>
  );
};

export default TestAxios;
