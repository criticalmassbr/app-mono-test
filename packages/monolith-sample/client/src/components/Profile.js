import React from 'react';

function Profile() {
  return (
    <div className="profile">
      <div className="profile-pic">
        <img src="https://via.placeholder.com/150" alt="Profile" />
      </div>
      <div className="profile-details">
        <h2>John Doe</h2>
        <p>Software Engineer at Example Corp.</p>
        <ul>
          <li>Edit Profile</li>
          <li>Settings</li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
