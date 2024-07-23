// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:5000/admin/users');
                setUsers(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUsers();
    }, [users]);
    const handleblock=async(id)=>{
        try{
           await axios.post('http://localhost:5000/admin/block/:id',
            {id})
        }catch(err){
            console.error(err);
        }
    }
    const handleunblock=async(id)=>{
        try{
          await axios.post('http://localhost:5000/admin/unblock/:id',{id})
        }catch(err){
            console.error(err);
        }
    }
    const handleDelete=async(id)=>{
        try{
          await axios.post('http://localhost:5000/admin/delete/:id',{id})
        }catch(err){
            console.error(err);
        }
    }
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <ul>
  {users.map(user => (
    <li key={user._id}>
      {user.username} {user.fname} {user.lname} {user.subscribed ? 'Yes' : 'No'}
      {user.subscribed === true ? (
        <button onClick={() => handleblock(user._id)}>Block</button>
      ) : (
        <button onClick={() => handleunblock(user._id)}>Unblock</button>
      )}
      <button onClick={() => handleDelete(user._id)}>Delete</button>
      <br />
    </li>
  ))}
</ul>
        </div>
    );
};

export default Dashboard;
