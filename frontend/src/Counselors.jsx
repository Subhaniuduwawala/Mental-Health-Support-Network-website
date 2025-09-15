// Counselors.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Counselors.css";
import heroVideo from "./assets/hero-video2.mp4";
import image24 from "./assets/image24.jpg";
import image25 from "./assets/image25.jpg";
import image26 from "./assets/image26.jpg";
import image27 from "./assets/image27.jpg";
import image28 from "./assets/image28.jpg";
import image29 from "./assets/image29.jpg";
import image30 from "./assets/image30.jpg";
import image31 from "./assets/image31.jpg";
import image32 from "./assets/image32.jpg";
import image33 from "./assets/image33.jpg";
import image34 from "./assets/image34.jpg";
import image35 from "./assets/image35.jpg";
import image36 from "./assets/image36.jpg";

const API = "http://localhost:3001/appointments";

const ALL_COUNSELORS = [
  { name: "Mr. Ravi Fernando", category: "Career & Life Coaching", experience: "10 years", languages: "English, Tamil", approach: "Solution-Focused Brief Therapy, Goal Setting", quote: "Guiding you to rediscover purpose and balance in both career and life.", rating: 3, image: image25 },
  { name: "Ms. Tharushi Jayawardena", category: "Relationship & Family Therapy", experience: "5 years", languages: "Sinhala", approach: "Emotionally Focused Therapy (EFT)", quote: "Helping couples and families improve emotional connection and communication.", rating: 2, image: image27 },
  { name: "Dr. Ashani Dias", category: "Grief & Loss", experience: "12 years", languages: "English, Sinhala", approach: "Narrative Therapy, Supportive Counseling", quote: "Supporting you through loss with empathy, patience, and presence.", rating: 3, image: image28 },
  { name: "Mr. Samoneera Wijesinghe", category: "Self-Esteem & Confidence", experience: "6 years", languages: "Sinhala, Tamil", approach: "Positive Psychology, Strength-Based Therapy", quote: "Helping you discover your inner strengths and self-worth.", rating: 2, image: image26 },
  { name: "Ms. Ishara Senanayake", category: "Student & Academic Stress Support", experience: "4+ years", languages: "Sinhala, English", approach: "Cognitive-Behavioral Techniques, Time Management Coaching", quote: "Helping students handle academic pressure while building resilience.", rating: 2, image: image29 },
  { name: "Mr. Kaween de Silva", category: "LGBTQ+ Affirmative Support", experience: "6 years", languages: "English", approach: "Humanistic Therapy, Identity-affirming conversations", quote: "Providing a safe, inclusive space to talk openly and heal freely.", rating: 2, image: image31 },
  { name: "Ms. Nadeesha Perera", category: "Anxiety & Stress", experience: "7 years", languages: "Sinhala, English", approach: "CBT, Mindfulness", quote: "Equipping you with practical tools to quiet the mind.", rating: 4, image: image34 },
  { name: "Mr. Harith Senarath", category: "Depression & Mood Support", experience: "8 years", languages: "Sinhala", approach: "Behavioral Activation, Supportive Therapy", quote: "Small steps forward can change the direction of your life.", rating: 4, image: image32 },
  { name: "Dr. Menaka Wijeratne", category: "Child & Adolescent Therapy", experience: "11 years", languages: "English, Sinhala", approach: "Play Therapy, Family Systems", quote: "Creating safe spaces where young minds feel seen and heard.", rating: 5, image: image33 },
  { name: "Ms. Piumi Ranasinghe", category: "Mindfulness & Meditation", experience: "6 years", languages: "English", approach: "MBSR, Breathwork", quote: "Come back to the present—where calm and clarity live.", rating: 4, image: image35 },
  { name: "Mr. Sanjaya Jayasuriya", category: "Addiction Recovery Support", experience: "9 years", languages: "Sinhala, English", approach: "Motivational Interviewing, Relapse Prevention", quote: "Recovery is possible—and you don’t have to do it alone.", rating: 4, image: image36 },
  { name: "Ms. Dinithi Abeysekara", category: "Trauma-Informed Care", experience: "10 years", languages: "Sinhala", approach: "EMDR-informed, Stabilization Skills", quote: "Gentle healing that respects your pace and your story.", rating: 5, image: image30 },
];

// helpers
const fmtDisplay = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString([], { year: "numeric", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" });
};
const getDatePart = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};
const getTimePart = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
};
const pickId = (obj) => obj?.id || obj?._id || obj?.appointmentId;

const Counselors = () => {
  const INITIAL_COUNT = 6;
  const LOAD_STEP = 6;

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // appointments + edit
  const [appointments, setAppointments] = useState([]);
  const [loadingList, setLoadingList] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState(null); // server id preferred
  const [editSaving, setEditSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "", email: "", phone: "", mode: "", counselor: "",
    date: "", time: "", notes: "",
  });

  const visibleCounselors = ALL_COUNSELORS.slice(0, visibleCount);
  const canShowMore = visibleCount < ALL_COUNSELORS.length;

  const handleShowMore = () => setVisibleCount((c) => Math.min(c + LOAD_STEP, ALL_COUNSELORS.length));
  const handleShowLess  = () => setVisibleCount(INITIAL_COUNT);
  const scrollToList = () => document.querySelector("#counselors-list")?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Load from backend (returns mapped list so callers can immediately use it)
  const loadAppointments = async () => {
    try {
      setLoadingList(true);
      const res = await axios.get(API);
      const list = Array.isArray(res.data) ? res.data : [];
      const mapped = list.map((r) => {
        const serverId = pickId(r) ?? null;
        return {
          id: serverId ?? `tmp-${Math.random().toString(36).slice(2, 9)}`,
          serverId,                    // keep real id for updates
          name: r.name,
          email: r.email,
          phone: r.phone,
          mode: r.mode,
          counselor: r.counselor,
          startAt: r.startAt,
          notes: r.notes || "",
        };
      });
      setAppointments(mapped);
      return mapped;
    } catch (e) {
      console.error("GET /appointments failed:", e?.response?.status, e?.response?.data || e?.message);
      setAppointments([]);
      return [];
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => { loadAppointments(); }, []);

  // ADD
  const handleAppointment = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const dateStr = form.date.value;
    const timeStr = form.time.value;
    const phone = form.phone.value.trim();
    const mode = form.mode.value;
    const counselor = form.counselor.value;
    const notes = form.notes.value.trim();

    // hours validation
    const day = new Date(`${dateStr}T00:00:00`).getDay();
    const [hh, mm] = timeStr.split(":").map(Number);
    if (day === 0 || day === 6) return setError("❌ Appointments can only be booked Monday to Friday.");
    if (hh < 9 || hh > 16 || (hh === 16 && mm > 0)) return setError("❌ Appointments can only be booked between 9:00 AM and 4:00 PM.");

    const startAtLocalISO = `${dateStr}T${timeStr}:00`;

    try {
      setLoading(true);
      const res = await axios.post(API, { name, email, phone, mode, counselor, notes, startAt: startAtLocalISO });

      if (res?.status === 201) {
        setSuccess("✅ Appointment booked successfully!");
        const created = res?.data && typeof res.data === "object" ? res.data : null;
        const serverId = created ? pickId(created) : null;

        if (serverId) {
          setAppointments((prev) => [
            { id: serverId, serverId, name, email, phone, mode, counselor, startAt: startAtLocalISO, notes },
            ...prev,
          ]);
        } else {
          await loadAppointments(); // ensure rows have real ids
        }
        form.reset();
      } else {
        setError(res?.data?.error || "❌ Failed to book appointment");
      }
    } catch (err) {
      console.error("POST /appointments failed:", err?.response?.status, err?.response?.data || err?.message);
      setError(err?.response?.data?.error || err?.message || "❌ Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  // EDIT open
  const openEdit = (row) => {
    setEditId(row.serverId || row.id); // prefer real id
    setEditForm({
      name: row.name || "",
      email: row.email || "",
      phone: row.phone || "",
      mode: row.mode || "",
      counselor: row.counselor || "",
      date: getDatePart(row.startAt) || "",
      time: getTimePart(row.startAt) || "",
      notes: row.notes || "",
    });
    setEditOpen(true);
  };

  // Single place to try various update endpoints/methods
  const updateAppointment = async (id, payload) => {
    // include id in body for full-replacement backends like json-server (PUT)
    const body = { id, ...payload };
    const attempts = [
      { method: "put",   url: `${API}/${id}`,        data: body },
      { method: "patch", url: `${API}/${id}`,        data: payload },
      { method: "post",  url: `${API}/${id}`,        data: payload },             // some servers accept POST for update
      { method: "post",  url: `${API}/update/${id}`, data: payload },             // common pattern
      { method: "put",   url: `http://localhost:3001/appointment/${id}`, data: body },   // singular route
      { method: "patch", url: `http://localhost:3001/appointment/${id}`, data: payload },
    ];
    let lastErr = null;
    for (const a of attempts) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const resp = await axios[a.method](a.url, a.data);
        return { ok: true, resp, tried: a };
      } catch (e) {
        lastErr = e;
        // keep trying next options; also log for debugging
        console.warn(`Update attempt failed: ${a.method.toUpperCase()} ${a.url}`, e?.response?.status, e?.response?.data || e?.message);
      }
    }
    return { ok: false, error: lastErr };
  };

  // EDIT save
  const saveEdit = async () => {
    setError(""); setSuccess("");

    // hours validation
    const day = new Date(`${editForm.date}T00:00:00`).getDay();
    const [hh, mm] = (editForm.time || "00:00").split(":").map(Number);
    if (day === 0 || day === 6) return setError("❌ Appointments can only be booked Monday to Friday.");
    if (hh < 9 || hh > 16 || (hh === 16 && mm > 0)) return setError("❌ Appointments can only be booked between 9:00 AM and 4:00 PM.");

    // resolve real id (avoid tmp- ids)
    let realId = editId;
    if (!realId || String(realId).startsWith("tmp-")) {
      const latest = await loadAppointments();
      const match = latest.find((r) => r.id === editId) || latest.find((r) => r.serverId === editId);
      if (match?.serverId) realId = match.serverId;
    }
    if (!realId || String(realId).startsWith("tmp-")) {
      return setError("❌ Could not determine record id to update. Please refresh and try again.");
    }

    const payload = {
      name: editForm.name.trim(),
      email: editForm.email.trim(),
      phone: editForm.phone.trim(),
      mode: editForm.mode,
      counselor: editForm.counselor,
      notes: editForm.notes.trim(),
      startAt: `${editForm.date}T${editForm.time}:00`,
    };

    try {
      setEditSaving(true);
      const result = await updateAppointment(realId, payload);
      if (!result.ok) {
        const er = result.error;
        console.error("All update attempts failed:", er?.response?.status, er?.response?.data || er?.message);
        return setError(
          `❌ Update failed${
            er?.response?.status ? ` (HTTP ${er.response.status})` : ""
          }: ${er?.response?.data?.error || er?.message || "Unknown error"}`
        );
      }

      // refresh from server so UI shows latest data
      await loadAppointments();
      setSuccess("✅ Appointment updated.");
      setEditOpen(false);
      setEditId(null);
    } catch (e) {
      console.error("saveEdit unexpected error:", e);
      setError(e?.response?.data?.error || e?.message || "❌ Failed to update appointment");
    } finally {
      setEditSaving(false);
    }
  };

  return (
    <div className="counselors-page">
      {/* Hero */}
      <section className="hero2" aria-label="Welcome banner">
        <video src={heroVideo} autoPlay muted loop playsInline className="hero-video2" />
        <div className="hero-overlay2" />
        <div className="hero-content2">
          <h1>Your Mental Health Matters</h1>
          <p>Connect with qualified, compassionate counselors in a safe and confidential space.</p>
          <div className="hero-cta-row2">
            <button className="hero-btn2" onClick={scrollToList}>Meet Our Counselors</button>
            <a className="hero-link2" href="#appointment">Book an Appointment →</a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="counselors-hero">
        <div className="hero-left">
          <img src={image24} alt="A supportive counseling session" />
        </div>
        <div className="hero-right">
          <h2>Meet Our Caring Professionals</h2>
          <p>Our team provides compassionate, confidential care. Choose support that fits your needs
            from stress relief to deep emotional healing.</p>
          <ul>
            <li>Anxiety & Stress Counsellors</li>
            <li>Depression & Mood Support</li>
            <li>Relationship & Family Therapy</li>
            <li>Student & Academic Stress Support</li>
            <li>Grief & Loss Counsellors</li>
            <li>Self-Esteem & Confidence Coaching</li>
            <li>LGBTQ+ Affirmative Support</li>
            <li>Child & Adolescent Therapy</li>
            <li>Career & Life Coaching</li>
            <li>Mindfulness & Meditation Experts</li>
          </ul>
        </div>
      </section>

      {/* Cards */}
      <section id="counselors-list" className="counselors-list" aria-label="Counselor profiles">
        {visibleCounselors.map((c, index) => (
          <article key={index} className="counselor-card" aria-labelledby={`c-name-${index}`}>
            <div className="card-top">
              <span className="category-badge" title={c.category}>{c.category}</span>
              <img src={c.image} alt={`${c.name} profile`} className="counselor-img" />
            </div>
            <h3 id={`c-name-${index}`}>{c.name}</h3>
            <div className="card-content">
              <ul className="counselor-meta">
                <li className="meta-line"><strong>Experience:</strong> {c.experience}</li>
                <li className="meta-line"><strong>Languages:</strong> {c.languages}</li>
                <li className="meta-line"><strong>Approach:</strong> {c.approach}</li>
              </ul>
              <blockquote className="counselor-quote">“{c.quote}”</blockquote>
              <div className="card-bottom">
                <div className="rating"><span className="stars">{"★".repeat(c.rating)}{"☆".repeat(5 - c.rating)}</span></div>
                <button className="outline-btn" onClick={() => document.querySelector("#appointment")?.scrollIntoView({ behavior: "smooth" })}>
                  Book with {c.name.split(" ")[0]}
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Show more / less */}
      <div className="load-more-row">
        {canShowMore ? (
          <button className="load-more-btn" onClick={handleShowMore}>Show More</button>
        ) : visibleCount > INITIAL_COUNT ? (
          <button className="load-more-btn" onClick={handleShowLess}>Show Less</button>
        ) : null}
      </div>

      {/* ADD form */}
      <section id="appointment" className="appointment-section" aria-label="Appointment booking">
        <h2>Get An Appointment</h2>
        <p className="appt-note">We operate Monday–Friday, from <strong>9:00 AM</strong> to <strong>4:00 PM</strong>. Kindly avoid Saturday and Sunday.</p>

        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
        {success && <p style={{ color: "green", fontWeight: "bold" }}>{success}</p>}

        <form className="appointment-form" onSubmit={handleAppointment}>
          <input type="text" placeholder="Your Name" name="name" required />
          <input type="email" placeholder="Your Email" name="email" required />
          <input type="date" name="date" required aria-label="Preferred date" />
          <input type="time" name="time" required aria-label="Preferred time" />
          <input type="tel" placeholder="Phone Number" name="phone" required />
          <select name="mode" required aria-label="Session mode">
            <option value="">Mode of Session</option>
            <option value="online">Online</option>
            <option value="inperson">In-Person</option>
          </select>
          <select name="counselor" required aria-label="Select Counselor">
            <option value="">Choose Counselor</option>
            {ALL_COUNSELORS.map((c, i) => (
              <option key={i} value={c.name}>{c.name} — {c.category}</option>
            ))}
          </select>
          <textarea name="notes" placeholder="Tell us briefly what you'd like support with (optional)" />
          <button type="submit" disabled={loading}>{loading ? 'Booking…' : 'Get An Appointment'}</button>
        </form>
      </section>

      {/* LIST + EDIT (table) */}
      <section className="appointment-list-section" aria-label="Your appointments" style={{ marginTop: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <h2 style={{ margin: 20 }}>Appointments</h2>
          {loadingList && <span style={{ fontSize: 14, opacity: 0.8 }}>Loading…</span>}
        </div>

        <div style={{ overflowX: "auto", marginTop: 12, marginLeft: 20, marginRight: 20, marginBottom: 40 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1000 }}>
            <thead>
              <tr style={{ background: "#677fe0ff" }}>
                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e5e7eb" }}>Name</th>
                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e5e7eb" }}>Email</th>
                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e5e7eb" }}>Phone</th>
                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e5e7eb" }}>Mode</th>
                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e5e7eb" }}>Counselor</th>
                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e5e7eb" }}>When</th>
                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e5e7eb" }}>Notes</th>
                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e5e7eb" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ padding: 12, color: "#6b7280" }}>No appointments found.</td>
                </tr>
              ) : (
                appointments.map((a) => (
                  <tr key={a.id} style={{ borderBottom: "1px solid #505cdaff" }}>
                    <td style={{ padding: 10 }}>{a.name}</td>
                    <td style={{ padding: 10 }}>{a.email}</td>
                    <td style={{ padding: 10 }}>{a.phone}</td>
                    <td style={{ padding: 10, textTransform: "capitalize" }}>{a.mode}</td>
                    <td style={{ padding: 10 }}>{a.counselor}</td>
                    <td style={{ padding: 10 }}>{fmtDisplay(a.startAt)}</td>
                    <td style={{ padding: 10, maxWidth: 220, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.notes}</td>
                    <td style={{ padding: 10 }}>
                      <button className="outline-btn" onClick={() => openEdit(a)} aria-label={`Edit appointment of ${a.name}`}>Edit</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* EDIT MODAL */}
      {editOpen && (
        <div
          aria-modal="true"
          role="dialog"
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 16 }}
          onClick={(e) => { if (e.target === e.currentTarget) setEditOpen(false); }}
        >
          <div style={{ background: "#3148baff", borderRadius: 12, padding: 16, width: 800 }}>
            <h3 style={{ marginTop: 0, color: "#f4f4fbff" }}>Edit Appointment</h3>

            <div className="grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <input type="text" placeholder="Name" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} required />
              <input type="email" placeholder="Email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} required />
              <input type="tel" placeholder="Phone" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} required />
              <select value={editForm.mode} onChange={(e) => setEditForm({ ...editForm, mode: e.target.value })} required>
                <option value="">Mode of Session</option>
                <option value="online">Online</option>
                <option value="inperson">In-Person</option>
              </select>
              <select value={editForm.counselor} onChange={(e) => setEditForm({ ...editForm, counselor: e.target.value })} required>
                <option value="">Choose Counselor</option>
                {ALL_COUNSELORS.map((c, i) => (
                  <option key={i} value={c.name}>{c.name} — {c.category}</option>
                ))}
              </select>
              <input type="date" value={editForm.date} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} required />
              <input type="time" value={editForm.time} onChange={(e) => setEditForm({ ...editForm, time: e.target.value })} required />
              <textarea style={{ gridColumn: "1 / -1" }} placeholder="Notes (optional)" value={editForm.notes} onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })} />
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
              <button className="outline-btn" onClick={() => setEditOpen(false)}>Cancel</button>
              <button onClick={saveEdit} disabled={editSaving} className="hero-btn" style={{ opacity: editSaving ? 0.7 : 1 }}>
                {editSaving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Counselors;
