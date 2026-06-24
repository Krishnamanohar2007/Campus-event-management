import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from "../api/axios";

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('student')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await api.post('/auth/register', { email, password, name, role });
      alert('Registration successful! Please login.');
      navigate('/login');
      console.log(response.data);
    }
    catch(error){
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">student</option>
          <option value="organizer">organizer</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register