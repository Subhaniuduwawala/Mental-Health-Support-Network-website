import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Admin.css";

const Admin = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editType, setEditType] = useState(null);
  const [formData, setFormData] = useState({});
  const [newAppointment, setNewAppointment] = useState({});
  const [newMessage, setNewMessage] = useState({});
  const [newCounselor, setNewCounselor] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [editImagePreview, setEditImagePreview] = useState("");
  const [music, setMusic] = useState([]);
  const [newMusic, setNewMusic] = useState({});
  const [audioPreview, setAudioPreview] = useState("");

  // Handle image file selection and convert to base64
  const handleImageChange = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        if (isEdit) {
          setEditImagePreview(base64String);
          setFormData({ ...formData, image: base64String });
        } else {
          setImagePreview(base64String);
          setNewCounselor({ ...newCounselor, image: base64String });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Check if user is admin
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "admin") {
      alert("⚠️ Access Denied: Admin privileges required");
      navigate("/home");
      return;
    }
  }, [navigate]);

  // Fetch both appointments & messages & counselors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [apptRes, msgRes, counselorRes, musicRes] = await Promise.all([
          axios.get("http://localhost:3001/appointments"),
          axios.get("http://localhost:3001/messages"),
          axios.get("http://localhost:3001/counselors"),
          axios.get("http://localhost:3001/music"),
        ]);
        setAppointments(apptRes.data);
        setMessages(msgRes.data);
        setCounselors(counselorRes.data);
        setMusic(musicRes.data);
      } catch (err) {
        console.error(err);
        alert("❌ Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Delete handler
  const handleDelete = async (id, type) => {
    try {
      await axios.delete(`http://localhost:3001/${type}/${id}`);
      if (type === "appointments") {
        setAppointments((prev) => prev.filter((item) => item._id !== id));
      } else if (type === "messages") {
        setMessages((prev) => prev.filter((item) => item._id !== id));
      } else if (type === "counselors") {
        setCounselors((prev) => prev.filter((item) => item._id !== id));
      } else if (type === "music") {
        setMusic((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error(err);
      alert("❌ Delete failed");
    }
  };

  // Update handler
  const handleUpdate = async (id, type) => {
    try {
      console.log(`Updating ${type} with ID:`, id);
      console.log("Data being sent:", formData);
      const response = await axios.put(`http://localhost:3001/${type}/${id}`, formData);
      console.log("Update response:", response.data);
      
      if (type === "appointments") {
        setAppointments((prev) =>
          prev.map((item) => (item._id === id ? { ...item, ...formData } : item))
        );
      } else if (type === "messages") {
        setMessages((prev) =>
          prev.map((item) => (item._id === id ? { ...item, ...formData } : item))
        );
      } else if (type === "counselors") {
        setCounselors((prev) =>
          prev.map((item) => (item._id === id ? { ...item, ...formData } : item))
        );
        alert("✅ Counselor updated successfully!");
      }
      setEditId(null);
      setFormData({});
    } catch (err) {
      console.error("Update error:", err);
      console.error("Error response:", err.response?.data);
      alert(`❌ Update failed: ${err.response?.data?.details || err.response?.data?.error || err.message}`);
    }
  };

  // Create new appointment
  const handleCreateAppointment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/appointments", newAppointment);
      setAppointments([...appointments, res.data]);
      setNewAppointment({});
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create appointment");
    }
  };

  // Create new message
  const handleCreateMessage = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/messages", newMessage);
      setMessages([...messages, res.data]);
      setNewMessage({});
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create message");
    }
  };

  // Create new counselor
  const handleCreateCounselor = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/counselors", newCounselor);
      setCounselors([res.data.counselor, ...counselors]);
      setNewCounselor({});
      setImagePreview("");
      alert("✅ Counselor added successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add counselor");
    }
  };

  // Handle audio file selection
  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 16MB for MongoDB)
      if (file.size > 16 * 1024 * 1024) {
        alert("Audio file size should be less than 16MB");
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('audio/')) {
        alert("Please select a valid audio file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        setAudioPreview(file.name);
        setNewMusic({ 
          ...newMusic, 
          audioData: base64String,
          mimeType: file.type,
          fileSize: `${fileSizeMB} MB`
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Create new music
  const handleCreateMusic = async (e) => {
    e.preventDefault();
    if (!newMusic.audioData) {
      alert("Please select an audio file");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3001/music", newMusic);
      setMusic([res.data.music, ...music]);
      setNewMusic({});
      setAudioPreview("");
      alert("✅ Music added successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add music");
    }
  };

  if (loading) return <p>Loading data...</p>;

  return (
    <div className="admin-page">
      {/* Appointments Section */}
      <section className="admin-section">
        <h2 className="section-title">📅 Appointments Management</h2>

        {/* Add Appointment */}
        <form className="appointment-form" onSubmit={handleCreateAppointment}>
          <h3>📝 Schedule New Appointment</h3>
          <div className="form-grid-2col">
            <div className="form-group">
              <label>Patient Name *</label>
              <input
                type="text"
                placeholder="Enter full name"
                value={newAppointment.name || ""}
                onChange={(e) => setNewAppointment({ ...newAppointment, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                placeholder="email@example.com"
                value={newAppointment.email || ""}
                onChange={(e) => setNewAppointment({ ...newAppointment, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="Phone number"
                value={newAppointment.phone || ""}
                onChange={(e) => setNewAppointment({ ...newAppointment, phone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Session Mode</label>
              <select
                value={newAppointment.mode || ""}
                onChange={(e) => setNewAppointment({ ...newAppointment, mode: e.target.value })}
              >
                <option value="">-- Select Mode --</option>
                <option value="online">🌐 Online</option>
                <option value="inperson">🏢 In-Person</option>
              </select>
            </div>
            <div className="form-group">
              <label>Appointment Date *</label>
              <input
                type="date"
                value={newAppointment.date || ""}
                onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Appointment Time *</label>
              <input
                type="time"
                value={newAppointment.time || ""}
                onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                required
              />
            </div>
            <div className="form-group full-width">
              <label>Counselor Name</label>
              <input
                type="text"
                placeholder="Assigned counselor"
                value={newAppointment.counselor || ""}
                onChange={(e) => setNewAppointment({ ...newAppointment, counselor: e.target.value })}
              />
            </div>
            <div className="form-group full-width">
              <label>Additional Notes</label>
              <textarea
                placeholder="Any special requirements or notes..."
                value={newAppointment.notes || ""}
                onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                rows="3"
              />
            </div>
          </div>
          <button type="submit" className="submit-btn">➕ Schedule Appointment</button>
        </form>

        {/* Appointments Table */}
        <div className="table-container">
          <h3>📊 All Appointments</h3>
          <table className="styled-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Mode</th>
              <th>Counselor</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) =>
              editId === appt._id && editType === "appointments" ? (
                <tr key={appt._id}>
                  {["name", "email",  "phone", "mode", "counselor", "notes"].map((field) => (
                    <td key={field}>
                      <input
                        type={field === "date" ? "date" : field === "time" ? "time" : "text"}
                        value={formData[field] || ""}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                      />
                    </td>
                  ))}
                  <td>
                    <button className="save-btn" onClick={() => handleUpdate(appt._id, "appointments")}>💾 Save</button>
                    <button className="cancel-btn" onClick={() => setEditId(null)}>✖️ Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={appt._id}>
                  <td>{appt.name}</td>
                  <td>{appt.email}</td>
                  <td>{appt.phone}</td>
                  <td>{appt.mode}</td>
                  <td>{appt.counselor}</td>
                  <td>{appt.notes || "—"}</td>
                  <td>
                    <button className="edit-btn" onClick={() => { setEditId(appt._id); setEditType("appointments"); setFormData(appt); }}>✏️ Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(appt._id, "appointments")}>🗑️ Delete</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
          </table>
        </div>
      </section>

      {/* Messages Section */}
      <section className="admin-section">
        <h2 className="section-title">✉️ Messages Management</h2>

        {/* Add Message */}
        <form className="message-form" onSubmit={handleCreateMessage}>
          <h3>📧 Create New Message</h3>
          <div className="form-grid-2col">
            <div className="form-group">
              <label>Sender Name *</label>
              <input
                type="text"
                placeholder="Enter name"
                value={newMessage.name || ""}
                onChange={(e) => setNewMessage({ ...newMessage, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                placeholder="email@example.com"
                value={newMessage.email || ""}
                onChange={(e) => setNewMessage({ ...newMessage, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group full-width">
              <label>Message Content *</label>
              <textarea
                placeholder="Type your message here..."
                value={newMessage.message || ""}
                onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
                required
                rows="4"
              />
            </div>
          </div>
          <button type="submit" className="submit-btn">➕ Send Message</button>
        </form>

        {/* Messages Table */}
        <div className="table-container">
          <h3>📬 All Messages</h3>
          <table className="styled-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) =>
              editId === msg._id && editType === "messages" ? (
                <tr key={msg._id}>
                  <td><input type="text" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></td>
                  <td><input type="email" value={formData.email || ""} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></td>
                  <td><textarea value={formData.message || ""} onChange={(e) => setFormData({ ...formData, message: e.target.value })} /></td>
                  <td className="action-buttons">
                    <button className="save-btn" onClick={() => handleUpdate(msg._id, "messages")}>✓ Save</button>
                    <button className="cancel-btn" onClick={() => setEditId(null)}>✗ Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={msg._id}>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.message}</td>
                  <td className="action-buttons">
                    <button className="edit-btn" onClick={() => { setEditId(msg._id); setEditType("messages"); setFormData(msg); }}>✏️ Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(msg._id, "messages")}>🗑️ Delete</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
          </table>
        </div>
      </section>

      {/* Counselors Section */}
      <section className="admin-section">
        <h2>🧑‍⚕️ Manage Counselors</h2>

        {/* Add New Counselor Form */}
        <form className="counselor-form" onSubmit={handleCreateCounselor}>
          <h3>📋 Add New Counselor</h3>
          <div className="form-grid">
            <div className="form-left">
              <div className="form-group">
                <label>Counselor Name *</label>
                <input
                  type="text"
                  placeholder="e.g., Dr. John Smith"
                  value={newCounselor.name || ""}
                  onChange={(e) => setNewCounselor({ ...newCounselor, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category/Specialization *</label>
                <select
                  value={newCounselor.category || ""}
                  onChange={(e) => setNewCounselor({ ...newCounselor, category: e.target.value })}
                  required
                >
                  <option value="">-- Select Category --</option>
                  <option value="Anxiety & Stress">Anxiety & Stress</option>
                  <option value="Depression & Mood Support">Depression & Mood Support</option>
                  <option value="Career & Life Coaching">Career & Life Coaching</option>
                  <option value="Relationship & Family Therapy">Relationship & Family Therapy</option>
                  <option value="Grief & Loss">Grief & Loss</option>
                  <option value="Self-Esteem & Confidence">Self-Esteem & Confidence</option>
                  <option value="Student & Academic Stress Support">Student & Academic Stress Support</option>
                  <option value="LGBTQ+ Affirmative Support">LGBTQ+ Affirmative Support</option>
                  <option value="Child & Adolescent Therapy">Child & Adolescent Therapy</option>
                  <option value="Mindfulness & Meditation">Mindfulness & Meditation</option>
                  <option value="Addiction Recovery Support">Addiction Recovery Support</option>
                  <option value="Trauma-Informed Care">Trauma-Informed Care</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Experience *</label>
                  <input
                    type="text"
                    placeholder="e.g., 5 years"
                    value={newCounselor.experience || ""}
                    onChange={(e) => setNewCounselor({ ...newCounselor, experience: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Rating (1-5) *</label>
                  <input
                    type="number"
                    placeholder="1-5"
                    min="1"
                    max="5"
                    value={newCounselor.rating || ""}
                    onChange={(e) => setNewCounselor({ ...newCounselor, rating: parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Languages *</label>
                <input
                  type="text"
                  placeholder="e.g., English, Sinhala"
                  value={newCounselor.languages || ""}
                  onChange={(e) => setNewCounselor({ ...newCounselor, languages: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Approach/Therapy Style *</label>
                <input
                  type="text"
                  placeholder="e.g., CBT, Mindfulness"
                  value={newCounselor.approach || ""}
                  onChange={(e) => setNewCounselor({ ...newCounselor, approach: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Quote or Description *</label>
                <textarea
                  placeholder="Enter a meaningful quote or description"
                  value={newCounselor.quote || ""}
                  onChange={(e) => setNewCounselor({ ...newCounselor, quote: e.target.value })}
                  rows="3"
                  required
                />
              </div>
            </div>
            <div className="form-right">
              <div className="image-upload-section">
                <label>Profile Photo *</label>
                <div className="image-preview">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" />
                  ) : (
                    <div className="placeholder">
                      <span>📷</span>
                      <p>No image selected</p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, false)}
                  className="file-input"
                  id="counselor-image"
                />
                <label htmlFor="counselor-image" className="file-label">
                  Choose Image
                </label>
                <p className="hint">Max size: 5MB (JPG, PNG)</p>
              </div>
            </div>
          </div>
          <button type="submit" className="submit-btn">➕ Add Counselor</button>
        </form>

        {/* Counselors Table */}
        <div className="counselors-table-container">
          <h3>📊 All Counselors</h3>
          <table className="counselors-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Category</th>
                <th>Experience</th>
                <th>Languages</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {counselors.map((counselor) =>
                editId === counselor._id && editType === "counselors" ? (
                  <tr key={counselor._id} className="edit-row">
                    <td>
                      <div className="edit-image-cell">
                        {editImagePreview || formData.image ? (
                          <img src={editImagePreview || formData.image} alt="Preview" className="table-image" />
                        ) : (
                          <div className="no-image">No image</div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, true)}
                          className="file-input-small"
                          id={`edit-image-${counselor._id}`}
                        />
                        <label htmlFor={`edit-image-${counselor._id}`} className="change-photo-btn">Change</label>
                      </div>
                    </td>
                    <td><input type="text" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></td>
                    <td>
                      <select value={formData.category || ""} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                        <option value="">-- Select --</option>
                        <option value="Anxiety & Stress">Anxiety & Stress</option>
                        <option value="Depression & Mood Support">Depression & Mood Support</option>
                        <option value="Career & Life Coaching">Career & Life Coaching</option>
                        <option value="Relationship & Family Therapy">Relationship & Family Therapy</option>
                        <option value="Grief & Loss">Grief & Loss</option>
                        <option value="Self-Esteem & Confidence">Self-Esteem & Confidence</option>
                        <option value="Student & Academic Stress Support">Student & Academic Stress Support</option>
                        <option value="LGBTQ+ Affirmative Support">LGBTQ+ Affirmative Support</option>
                        <option value="Child & Adolescent Therapy">Child & Adolescent Therapy</option>
                        <option value="Mindfulness & Meditation">Mindfulness & Meditation</option>
                        <option value="Addiction Recovery Support">Addiction Recovery Support</option>
                        <option value="Trauma-Informed Care">Trauma-Informed Care</option>
                      </select>
                    </td>
                    <td><input type="text" value={formData.experience || ""} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} /></td>
                    <td><input type="text" value={formData.languages || ""} onChange={(e) => setFormData({ ...formData, languages: e.target.value })} /></td>
                    <td><input type="number" min="1" max="5" value={formData.rating || ""} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} /></td>
                    <td className="action-buttons">
                      <button className="save-btn" onClick={() => { handleUpdate(counselor._id, "counselors"); setEditImagePreview(""); }}>✓ Save</button>
                      <button className="cancel-btn" onClick={() => { setEditId(null); setEditImagePreview(""); }}>✗ Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={counselor._id}>
                    <td>
                      {counselor.image ? (
                        <img src={counselor.image} alt={counselor.name} className="table-image" />
                      ) : (
                        <div className="no-image">No photo</div>
                      )}
                    </td>
                    <td>{counselor.name}</td>
                    <td>{counselor.category}</td>
                    <td>{counselor.experience}</td>
                    <td>{counselor.languages}</td>
                    <td className="rating-stars">{"★".repeat(counselor.rating)}{"☆".repeat(5 - counselor.rating)}</td>
                    <td className="action-buttons">
                      <button className="edit-btn" onClick={() => { setEditId(counselor._id); setEditType("counselors"); setFormData(counselor); setEditImagePreview(""); }}>✏️ Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(counselor._id, "counselors")}>🗑️ Delete</button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Music Section */}
      <section className="admin-section">
        <h2 className="section-title">🎵 Music Management</h2>

        {/* Add Music Form */}
        <form className="appointment-form" onSubmit={handleCreateMusic}>
          <h3 style={{ marginBottom: "20px", color: "#555" }}>➕ Add New Music</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                placeholder="Song title"
                value={newMusic.title || ""}
                onChange={(e) => setNewMusic({ ...newMusic, title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Artist *</label>
              <input
                type="text"
                placeholder="Artist name"
                value={newMusic.artist || ""}
                onChange={(e) => setNewMusic({ ...newMusic, artist: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Audio File * (MP3, WAV, OGG - Max 16MB)</label>
              <input
                type="file"
                accept="audio/*"
                onChange={handleAudioChange}
                id="audio-upload"
                className="file-input"
                required={!newMusic.audioData}
              />
              <label htmlFor="audio-upload" className="file-label">
                📁 Choose Audio File
              </label>
              {audioPreview && (
                <div style={{ color: '#fff', marginTop: '10px', fontSize: '14px' }}>
                  ✓ Selected: <strong>{audioPreview}</strong>
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Duration (optional)</label>
              <input
                type="text"
                placeholder="e.g., 3:45"
                value={newMusic.duration || ""}
                onChange={(e) => setNewMusic({ ...newMusic, duration: e.target.value })}
              />
            </div>
          </div>
          <button type="submit" className="submit-btn">➕ Add Music</button>
        </form>

        {/* Music Table */}
        <div className="table-container">
          <h3>📊 All Music</h3>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Artist</th>
                <th>Duration</th>
                <th>File Size</th>
                <th>Upload Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {music.map((item) =>
                editId === item._id && editType === "music" ? (
                  <tr key={item._id}>
                    <td><input type="text" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} /></td>
                    <td><input type="text" value={formData.artist || ""} onChange={(e) => setFormData({ ...formData, artist: e.target.value })} /></td>
                    <td><input type="text" value={formData.duration || ""} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} /></td>
                    <td>{item.fileSize || "Unknown"}</td>
                    <td>{new Date(item.uploadDate).toLocaleDateString()}</td>
                    <td>
                      <button className="save-btn" onClick={() => handleUpdate(item._id, "music")}>💾 Save</button>
                      <button className="cancel-btn" onClick={() => setEditId(null)}>✖️ Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={item._id}>
                    <td>{item.title}</td>
                    <td>{item.artist}</td>
                    <td>{item.duration || "Unknown"}</td>
                    <td>{item.fileSize || "Unknown"}</td>
                    <td>{new Date(item.uploadDate).toLocaleDateString()}</td>
                    <td>
                      <button className="edit-btn" onClick={() => { setEditId(item._id); setEditType("music"); setFormData(item); }}>✏️ Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(item._id, "music")}>🗑️ Delete</button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Admin;
