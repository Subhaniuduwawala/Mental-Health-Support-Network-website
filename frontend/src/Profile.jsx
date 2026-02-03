import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    profileImage: ''
  });

  const userId = localStorage.getItem('userId');

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/profile/${userId}`);
      if (response.data.user) {
        setFormData({
          name: response.data.user.name || '',
          email: response.data.user.email || '',
          phone: response.data.user.phone || '',
          bio: response.data.user.bio || '',
          profileImage: response.data.user.profileImage || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }

    try {
      setSaving(true);
      setError('');
      const response = await axios.put(`http://localhost:3001/profile/${userId}`, formData);
      
      if (response.data.Status === 'Success') {
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="profile-container"><div className="loading">Loading...</div></div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {formData.profileImage ? (
              <img src={formData.profileImage} alt={formData.name} />
            ) : (
              <div className="avatar-placeholder">
                {formData.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <div className="profile-title">
            <h1>{formData.name}</h1>
            <p className="email">{formData.email}</p>
            {formData.role && <span className="role-badge">{formData.role}</span>}
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {!isEditing ? (
          <div className="profile-view">
            <div className="profile-section">
              <div className="info-grid">
                <div className="info-item">
                  <label>Phone</label>
                  <p>{formData.phone || 'Not provided'}</p>
                </div>
              </div>

              {formData.bio && (
                <div className="bio-section">
                  <label>Bio</label>
                  <p>{formData.bio}</p>
                </div>
              )}
            </div>

            <button
              className="btn btn-primary edit-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                className="form-control"
                disabled
              />
              <small>Email cannot be changed</small>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your phone number"
              />
            </div>


            <div className="form-group">
              <label htmlFor="profileImage">Profile Image URL</label>
              <input
                type="url"
                id="profileImage"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                className="form-control"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="form-control"
                rows="4"
                placeholder="Write a brief bio about yourself..."
              ></textarea>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setIsEditing(false);
                  fetchProfile();
                }}
                disabled={saving}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;
