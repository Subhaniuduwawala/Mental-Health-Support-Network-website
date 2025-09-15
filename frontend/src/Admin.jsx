import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

const Admin = () => {
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editType, setEditType] = useState(null);
  const [formData, setFormData] = useState({});
  const [newAppointment, setNewAppointment] = useState({});
  const [newMessage, setNewMessage] = useState({});

  // Fetch both appointments & messages
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [apptRes, msgRes] = await Promise.all([
          axios.get("http://localhost:3001/appointments"),
          axios.get("http://localhost:3001/messages"),
        ]);
        setAppointments(apptRes.data);
        setMessages(msgRes.data);
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
      } else {
        setMessages((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error(err);
      alert("❌ Delete failed");
    }
  };

  // Update handler
  const handleUpdate = async (id, type) => {
    try {
      await axios.put(`http://localhost:3001/${type}/${id}`, formData);
      if (type === "appointments") {
        setAppointments((prev) =>
          prev.map((item) => (item._id === id ? { ...item, ...formData } : item))
        );
      } else {
        setMessages((prev) =>
          prev.map((item) => (item._id === id ? { ...item, ...formData } : item))
        );
      }
      setEditId(null);
      setFormData({});
    } catch (err) {
      console.error(err);
      alert("❌ Update failed");
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

  if (loading) return <p>Loading data...</p>;

  return (
    <div className="admin-page">
      {/* Appointments Section */}
      <section className="admin-section">
        <h2>📅 All Appointments</h2>

        {/* Add Appointment */}
        <form className="create-form" onSubmit={handleCreateAppointment}>
          <h3>Add Appointment</h3>
          <input
            type="text"
            placeholder="Name"
            value={newAppointment.name || ""}
            onChange={(e) => setNewAppointment({ ...newAppointment, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newAppointment.email || ""}
            onChange={(e) => setNewAppointment({ ...newAppointment, email: e.target.value })}
            required
          />
          <input
            type="date"
            value={newAppointment.date || ""}
            onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
            required
          />
          <input
            type="time"
            value={newAppointment.time || ""}
            onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={newAppointment.phone || ""}
            onChange={(e) => setNewAppointment({ ...newAppointment, phone: e.target.value })}
          />
          <select
            value={newAppointment.mode || ""}
            onChange={(e) => setNewAppointment({ ...newAppointment, mode: e.target.value })}
          >
            <option value="">Mode</option>
            <option value="online">Online</option>
            <option value="inperson">In-Person</option>
          </select>
          <input
            type="text"
            placeholder="Counselor"
            value={newAppointment.counselor || ""}
            onChange={(e) => setNewAppointment({ ...newAppointment, counselor: e.target.value })}
          />
          <textarea
            placeholder="Notes"
            value={newAppointment.notes || ""}
            onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
          />
          <button type="submit">➕ Add</button>
        </form>

        {/* Table */}
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
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
                  {["name","email","date","time","phone","mode","counselor","notes"].map((field) => (
                    <td key={field}>
                      <input
                        type={field === "date" ? "date" : field === "time" ? "time" : "text"}
                        value={formData[field] || ""}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                      />
                    </td>
                  ))}
                  <td>
                    <button onClick={() => handleUpdate(appt._id, "appointments")}>Save</button>
                    <button onClick={() => setEditId(null)}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={appt._id}>
                  <td>{appt.name}</td>
                  <td>{appt.email}</td>
                  <td>{new Date(appt.date).toLocaleDateString()}</td>
                  <td>{appt.time}</td>
                  <td>{appt.phone}</td>
                  <td>{appt.mode}</td>
                  <td>{appt.counselor}</td>
                  <td>{appt.notes || "—"}</td>
                  <td>
                    <button onClick={() => { setEditId(appt._id); setEditType("appointments"); setFormData(appt); }}>Edit</button>
                    <button onClick={() => handleDelete(appt._id, "appointments")}>Delete</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </section>

      {/* Messages Section */}
      <section className="admin-section">
        <h2>✉️ All Messages</h2>

        {/* Add Message */}
        <form className="create-form" onSubmit={handleCreateMessage}>
          <h3>Add Message</h3>
          <input
            type="text"
            placeholder="Name"
            value={newMessage.name || ""}
            onChange={(e) => setNewMessage({ ...newMessage, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newMessage.email || ""}
            onChange={(e) => setNewMessage({ ...newMessage, email: e.target.value })}
            required
          />
          <textarea
            placeholder="Message"
            value={newMessage.message || ""}
            onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
            required
          />
          <button type="submit">➕ Add</button>
        </form>

        {/* Table */}
        <table className="data-table">
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
                  <td>
                    <button onClick={() => handleUpdate(msg._id, "messages")}>Save</button>
                    <button onClick={() => setEditId(null)}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={msg._id}>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.message}</td>
                  <td>
                    <button onClick={() => { setEditId(msg._id); setEditType("messages"); setFormData(msg); }}>Edit</button>
                    <button onClick={() => handleDelete(msg._id, "messages")}>Delete</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Admin;
