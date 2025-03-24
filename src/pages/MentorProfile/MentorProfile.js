import React from 'react';
import { useParams } from 'react-router-dom';
import withFetch from '../../hoc/withFetch';
import './MentorProfile.scss';

const mockTimeSlots = Array.from({ length: 10 }, (_, i) => ({
  id: `slot-${i}`,
  date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString(),
  startTime: '10:00',
  endTime: '11:00',
  isBooked: Math.random() > 0.7,
}));

const MentorProfile = ({mentor}) => {

  const handleBooking = (slot) => {
    alert(`Booking confirmed for ${slot.date} at ${slot.startTime}`);
  };

  if (!mentor) return <div className="error-message">Mentor not found</div>;

  return (
    <div className="container">
      <div className="profile-container">
        <div className="profile-header">
          <img
            src={mentor.avatar_url}
            alt={`${mentor.login}'s avatar`}
            className="profile-avatar"
          />
          <div className="profile-info">
            <h1>{mentor.name || mentor.login}</h1>
            {mentor.bio && <p>{mentor.bio}</p>}
            <div className="profile-details">
              {mentor.location && (
                <div className="profile-detail">
                  <span>Location:</span>
                  <span>{mentor.location}</span>
                </div>
              )}
              {mentor.company && (
                <div className="profile-detail">
                  <span>Company:</span>
                  <span>{mentor.company}</span>
                </div>
              )}
              <div className="profile-detail">
                <span>Followers:</span>
                <span>{mentor.followers}</span>
              </div>
              {mentor.blog && (
                <div className="profile-detail">
                  <a href={mentor.blog.startsWith('http') ? mentor.blog : `https://${mentor.blog}`}
                     target="_blank"
                     rel="noopener noreferrer">
                    Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="time-slots">
          <h2>Available Time Slots</h2>
          <div className="slot-grid">
            {mockTimeSlots.map(slot => (
              <div
                key={slot.id}
                className={`slot ${slot.isBooked ? 'booked' : ''}`}
              >
                <div>
                  <p>{slot.date}</p>
                  <p>{slot.startTime} - {slot.endTime}</p>
                </div>
                <button
                  onClick={() => !slot.isBooked && handleBooking(slot)}
                  disabled={slot.isBooked}
                  className="book-button"
                >
                  {slot.isBooked ? 'Booked' : 'Book'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MentorProfileWrapper = () => {
  const { username } = useParams();
  const url = `https://api.github.com/users/${username}`;

  const mapDataToProps = (data) => ({ mentor: data });

  const WrappedMentorProfile = withFetch({
    url, 
    mapDataToProps, 
    errorMsg: "Failed to fetch mentor details. Please try again later."
  })(MentorProfile);
  return <WrappedMentorProfile />;
};


export default MentorProfileWrapper;