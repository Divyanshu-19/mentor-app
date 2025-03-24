import React from 'react';
import { Link } from 'react-router-dom';
import './UserCard.scss';

const UserCard = ({ user }) => {

  return (
    <Link to={`/mentor/${user.login}`} className="mentor-card">
      <div className="mentor-header">
        <img 
          src={user.avatar_url} 
          alt={`${user.login}'s avatar`}
          className="mentor-avatar"
        />
        <div>
          <h3 className="mentor-name">{user.name || user.login}</h3>
          {user.bio && <p className="mentor-bio">{user.bio}</p>}
        </div>
      </div>
      <div className="mentor-stats">
        {user.location && <span>{user.location}</span>}
        {user.company && <span>{user.company}</span>}
        {user.followers && <span>{user.followers} followers</span>}
      </div>
    </Link>
  );
};

export default UserCard;