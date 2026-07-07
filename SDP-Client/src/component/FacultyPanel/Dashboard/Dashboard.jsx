import React, { useEffect, useState } from "react";
import "../../Dashboard.scss"; // reuse admin sidebar styles
import "./Dashboard.scss";     // counsellor-specific overrides
import axios from "axios";
import { useNavigate } from "react-router";
import { GET_USER_CAMP, BASE_URL, ADD_PATIENT } from "../../../utils/apiConstant";
import { useLanguage } from "../../../context/LanguageContext";
import { t } from "../../../translations";
import klelogo from "../../../assets/logo.png";
import Navbar from "../../Navbar/Navbar";
import { printPatientPDF } from "../../../utils/printPatient";
import { formatPatientId } from "../../../utils/patientId";

function Dashboard() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const auth = localStorage.getItem("facultyAuth") || localStorage.getItem("auth");
  const headers = { Authorization: `Bearer ${auth}` };
  
  const [menuOpen, setMenuOpen] = useState(true);
  const [selected, setSelected] = useState("dashboard");
  const [locationId, setLocationId] = useState();
  const [patientData, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // "all" | "admitted" | "discharged"

  const getCamps = async () => {
    try {
      const res = await axios.get(GET_USER_CAMP, { headers });
      if (res.data?.data?.length > 0) {
        setLocationId(res.data.data[0].locationId);
      } else {
        const locRes = await axios.get(`${BASE_URL}/api/location`, { headers });
        if (locRes.data?.data?.length > 0) setLocationId(locRes.data.data[0]._id);
      }
    } catch (err) { console.log(err); }
  };

  const getPatients = async () => {
    try {
      const res = await axios.get(ADD_PATIENT, { headers });
      setPatients(res.data.data || []);
      localStorage.setItem("patients", JSON.stringify(res.data.data || []));
    } catch (err) { console.log(err); }
  };

  useEffect(() => {
    getPatients();
    getCamps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredPatients = patientData.filter((data) => {
    if (!data?.name) return false;
    const query = searchQuery.toLowerCase();
    const matchesSearch = (
      data.name.toLowerCase().includes(query) ||
      formatPatientId(data.patientId).toLowerCase().includes(query) ||
      String(data.patientId).includes(query) ||
      (data.phone && data.phone.toLowerCase().includes(query)) ||
      (data.aadharNumber && data.aadharNumber.toLowerCase().includes(query))
    );
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "admitted" && !data.discharge_date) ||
      (statusFilter === "discharged" && !!data.discharge_date);
    return matchesSearch && matchesStatus;
  });

  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    return parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : parts[0][0].toUpperCase();
  };

  return (
    <div className="dashboard has-navbar">
      <Navbar isDashboard={true} menuOpen={menuOpen} />

      {/* Sidebar */}
      <div className={menuOpen ? "sidebar" : "sidebar close"}>
        <ul className="nav-links">
          <li>
            <i className="bx bx-menu" onClick={() => setMenuOpen(!menuOpen)}></i>
          </li>

          {/* Dashboard */}
          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" onClick={(e) => { e.preventDefault(); setSelected("dashboard"); }}>
              <i className="bx bx-grid-alt"></i>
              <span className="link_name">Dashboard</span>
            </a>
            <ul className="sub-menu blank">
              <li><a className="link_name" href="#">Dashboard</a></li>
            </ul>
          </li>

          {/* Patients */}
          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" onClick={(e) => { e.preventDefault(); setSelected("patients"); }}>
              <i className="bx bx-user"></i>
              <span className="link_name">{t('patients', language)}</span>
            </a>
            <ul className="sub-menu blank">
              <li><a className="link_name" href="#">{t('patients', language)}</a></li>
            </ul>
          </li>

          {/* Profile / Logout */}
          <li>
            <div className="profile-details">
              <div className="profile-content">
                <i className="bi bi-person-fill"></i>
              </div>
              <div className="name-job">
                <div className="profile_name">Counsellor</div>
                <div className="job">Staff</div>
              </div>
              <i
                className="bx bx-log-out"
                onClick={() => { localStorage.clear(); navigate("/"); }}
              ></i>
            </div>
          </li>
        </ul>
      </div>

      {/* Main section */}
      <section className="home-section">

        {/* ── Dashboard Stats ── */}
        {selected === "dashboard" && (
          <div className="admin-home">
            <div className="header">
              <h6>
                Welcome, Counsellor!
                <span>Rehabilitation &amp; De-addiction Unit, KLE Centenary Charitable Hospital</span>
              </h6>
              <div className="header-badge">Active Session</div>
            </div>

            <div className="data-box">
              <div className="stat-card">
                <div className="stat-icon"><i className="fas fa-user-injured"></i></div>
                <div className="stat-content">
                  <h6>{patientData.length}</h6>
                  <p>Total Patients</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><i className="fas fa-user-check"></i></div>
                <div className="stat-content">
                  <h6>{patientData.filter(p => p.discharge_date).length}</h6>
                  <p>Discharged</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><i className="fas fa-procedures"></i></div>
                <div className="stat-content">
                  <h6>{patientData.filter(p => !p.discharge_date).length}</h6>
                  <p>Admitted</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Patients List ── */}
        {selected === "patients" && (
          <div className="content">
            <div className="header">
              <h4>{t('patientsList', language)}</h4>
              <div className="buttons">
                {/* Status Filter */}
                <div style={{ display: "flex", gap: "6px" }}>
                  {["all", "admitted", "discharged"].map(f => (
                    <button
                      key={f}
                      onClick={() => setStatusFilter(f)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "8px",
                        border: "1px solid",
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        transition: "all 0.2s",
                        background: statusFilter === f
                          ? f === "admitted" ? "#f59e0b"
                          : f === "discharged" ? "#16a34a"
                          : "#003b7a"
                          : "#fff",
                        color: statusFilter === f ? "#fff" : "#64748b",
                        borderColor: statusFilter === f
                          ? f === "admitted" ? "#f59e0b"
                          : f === "discharged" ? "#16a34a"
                          : "#003b7a"
                          : "#e2e8f0",
                      }}
                    >
                      {f === "all" ? "All" : f === "admitted" ? "Admitted" : "Discharged"}
                    </button>
                  ))}
                </div>
                <button className="add-btn" onClick={() => navigate(`/patientAdd/${locationId}`)}>
                  <i className="bi bi-person-plus-fill"></i> {t('addPatient', language)}
                </button>
                <div className="input-wrap">
                  <i className="fas fa-search"></i>
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="text"
                    name="patient-search"
                    id="product-search"
                    placeholder={t('searchPatients', language)}
                  />
                  {searchQuery && <i onClick={() => setSearchQuery("")} className="fas fa-times"></i>}
                </div>
              </div>
            </div>

            <div className="table-div">
              <table className="table">
                <thead className="table-header">
                  <tr>
                    <th scope="col">Patient ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Joining Date</th>
                    <th scope="col">Discharge Date</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {filteredPatients.length > 0 ? filteredPatients.map((data, key) => (
                    <tr key={key}>
                      <th scope="row">{formatPatientId(data.patientId)}</th>
                      <td>{data.name}</td>
                      <td>{data.address}</td>
                      <td>
                        {data.joining_date
                          ? new Date(data.joining_date).toLocaleDateString("en-IN")
                          : <span style={{ color: "#94a3b8" }}>—</span>}
                      </td>
                      <td>
                        {data.discharge_date
                          ? <span style={{ color: "#16a34a", fontWeight: 600 }}>{new Date(data.discharge_date).toLocaleDateString("en-IN")}</span>
                          : <span style={{ color: "#f59e0b", fontWeight: 600, fontSize: "0.75rem" }}>Admitted</span>}
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
                          <button className="edit-btn" title="View Patient" onClick={() => navigate(`/patient/${data._id}`)}>
                            <i className="bi bi-eye"></i>
                          </button>
                          <button className="edit-btn" title="Edit Patient" onClick={() => navigate(`/patient/${data._id}`)}>
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button className="edit-btn" title="Download PDF" onClick={() => printPatientPDF(data)} style={{ color: "#dc2626" }}>
                            <i className="bi bi-file-earmark-pdf"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan="6" className="text-center py-4">
                      {searchQuery ? "No patients match your search" : "No Patients To Display"}
                    </td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
