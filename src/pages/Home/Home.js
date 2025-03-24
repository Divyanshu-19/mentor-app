import React, { useState } from 'react';
import UserCard from '../../components/UserCard';
import withFetch from '../../hoc/withFetch';
import './Home.scss';

const Home = ({users}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.login.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <header className="header">
        <h1 className="header-main">Find Tech Mentor</h1>
        <p className="header-main">{users.length} experienced developers found</p>
      </header>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search mentors by name..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredUsers.length === 0 ? (
        <div className="error-message">
          <p>No mentors found matching your search.</p>
        </div>
      ) : (
        <div className="mentor-grid">
          {filteredUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};


const HomeWrapper = withFetch({
  url: "https://api.github.com/users?per_page=30",
  errorMsg: "Failed to fetch mentors. Please try again later",
  mapDataToProps: (data) => ({users: data})
})(Home)

export default HomeWrapper;