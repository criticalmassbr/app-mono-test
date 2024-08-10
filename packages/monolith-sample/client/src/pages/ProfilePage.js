import React from 'react';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';

function ProfilePage() {
    return (
        <div className="profile-page">
            <Link to="/" className="back-link">Back to Timeline</Link>
            <Profile />
        </div>
    );
}

export default ProfilePage;
