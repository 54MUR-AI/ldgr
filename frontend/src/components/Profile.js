import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    joinedDate: 'January 1, 2023',
    bio: 'Passionate database administrator with a love for blockchain technology.'
  };

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(user);

  const navigate = useNavigate();

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    // Here you would typically send the updated data to the server
    setIsEditing(false);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>{userData.name}</h1>
        <p>{userData.role}</p>
      </div>
      <p className="profile-bio">{userData.bio}</p>
      <button onClick={handleEditToggle} className="edit-button">
        {isEditing ? 'Cancel' : 'Edit Profile'}
      </button>
      {isEditing ? (
        <div className="edit-form">
          <label>Name: <input type="text" name="name" value={userData.name} onChange={handleChange} /></label>
          <label>Email: <input type="email" name="email" value={userData.email} onChange={handleChange} /></label>
          <label>Role: <input type="text" name="role" value={userData.role} onChange={handleChange} /></label>
          <label>Bio: <textarea name="bio" value={userData.bio} onChange={handleChange}></textarea></label>
          <button onClick={handleSave} className="save-button">Save Changes</button>
        </div>
      ) : (
        <div className="profile-details">
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Joined:</strong> {userData.joinedDate}</p>
        </div>
      )}
      <button onClick={handleBackToDashboard} className="back-button">Back to Dashboard</button>
    </div>
  );
};

export default Profile;
