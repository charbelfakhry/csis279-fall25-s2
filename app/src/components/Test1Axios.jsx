import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Test1Axios = () => {
    const [data, setData] = useState([]);


    const [formData,setFormData] = useState({
        id: '',
        userId: '',
        title: '',
        body: ''
    });

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

    const addItem = () => {
        
        const item = {
            id: formData.id,
            userId: formData.userId,
            title: formData.title,
            body: formData.body
        }
        setData(prevData => [...prevData, item]);

    }

    const handleChange = (event) =>{
        const {name, value} = event.target;
        
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
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
            <div className='row'>
                <div className='col'>
                    <label style={{fontWeight: 'bold'}}>id: </label>
                    <input type='text' name='id' onChange={handleChange} />
                </div>
                <div className='col'>
                    <label style={{fontWeight: 'bold'}}>UserId: </label>
                    <input type='text' name='userId' onChange={handleChange} />
                </div>
                <div className='col'>
                    <label style={{fontWeight: 'bold'}}>Title: </label>
                    <input type='text' name='title' onChange={handleChange} />
                </div>
                <div className='col'>
                    <label style={{fontWeight: 'bold'}}>body: </label>
                    <input type='text' name='body' onChange={handleChange} />
                </div>
                <div className='col'>
                    <button className='btn btn-success' onClick={()=>addItem()}>Add Item</button>
                </div>
            </div>
        </>
    );

}

export default Test1Axios;