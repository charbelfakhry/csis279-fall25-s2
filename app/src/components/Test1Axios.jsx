import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Test1Axios = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getTypiData();
    }, []);

    const getTypiData = async () => {
        try {
            const result = await axios.get('https://jsonplaceholder.typicode.com/posts');
            if (result.status === 200) {
                setData(result.data);
            } else {
                alert('Error fetching information')
            }
        } catch (e) {
            alert(`Error fetching information ${e}`);
        }
    }

    return (
        <>
            <h3>Typi data</h3>
            <table className="table table-dark w-100">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Title</th>
                        <th>Body</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(post => (
                            <tr key={post.id}>
                               <td>{post.id}</td>
                               <td>{post.userId}</td>
                               <td>{post.title}</td>
                               <td>{post.body}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );

}

export default Test1Axios;