import React, { useState } from "react";
// import AddMenu from './AddMenu/AddMenu';
import "./Dashboard.scss";
import Navbar from "./Navbar/Navbar";
import Faculty from "./Faculty/Faculty";
import Camp from "./Camp/Camp";
import Patient from "./Patient/Patient";
import { useNavigate, Navigate, useLocation } from "react-router";
import { useEffect } from "react";
import Home from "./Home/Home";
import Loader from "./Loader/Loader";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../translations";
import {
  ADD_PATIENT,
  GET_CAMP,
  GET_FACULTY,
  GET_LOCATIONS,
  GET_UNALLOCATED_PATIENTS,
} from "../utils/apiConstant";
import axios from "axios";

// import Orders from './Orders/Orders';

function Dashboard() {
  const { language } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(true);
  const [selected, setSelected] = useState("home");
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/admin" || location.pathname === "/admin/home") {
      setSelected("home");
    } else if (location.pathname === "/admin/location") {
      setSelected("location");
    } else if (location.pathname === "/admin/faculty") {
      setSelected("faculty");
    } else if (location.pathname === "/admin/camp") {
      setSelected("camp");
    } else if (location.pathname === "/admin/patient") {
      setSelected("patient");
    }
  }, [location.pathname]);

  const [faculty, setFaculty] = useState([]);
  const [loc, setLoc] = useState([]);
  const [camp, setCamp] = useState([]);
  const [patient, setPatient] = useState([]);
  const [unallocatedPatients, setUnallocatedPatients] = useState([]);

  const auth = localStorage.getItem("auth");
  const headers = {
    Authorization: `Bearer ${auth}`,
  };

  const getFaculty = async () => {
    try {
      const response = await axios.get(GET_FACULTY, { headers: headers });
      if (response.data && response.data.users) {
        localStorage.setItem("faculty", JSON.stringify(response.data.users));
        setFaculty(response.data.users);
      } else {
        console.error("Invalid faculty data format:", response.data);
        setFaculty([]);
      }
    } catch (err) {
      console.error("Error fetching faculty:", err.response?.status, err.message);
      setFaculty([]);
      // Don't show error to user for dashboard data loading
    }
  };

  const getLocation = async () => {
    await axios
      .get(GET_LOCATIONS, { headers: headers })
      .then((res) => {
        console.log(res);
        setLoc(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCamp = async () => {
    await axios
      .get(GET_CAMP, { headers: headers })
      .then((res) => {
        console.log("Camps : ", res);
        setCamp(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPatient = async () => {
    try {
      const response = await axios.get(ADD_PATIENT, { headers: headers });
      if (response.data && response.data.data) {
        localStorage.setItem("patientList", JSON.stringify(response.data.data));
        setPatient(response.data.data);
      } else {
        console.error("Invalid patient data format:", response.data);
        setPatient([]);
      }
    } catch (err) {
      console.error("Error fetching patients:", err.response?.status, err.message);
      setPatient([]);
      // Don't show error to user for dashboard data loading
    }
  };

  const getUnallocatedPatients = async () => {
    try {
      const response = await axios.get(GET_UNALLOCATED_PATIENTS, { headers: headers });
      if (response.data && response.data.data) {
        console.log("Unallocated patients loaded:", response.data.data.length);
        setUnallocatedPatients(response.data.data);
      } else {
        console.error("Invalid unallocated patients data format:", response.data);
        setUnallocatedPatients([]);
      }
    } catch (err) {
      console.error("Error fetching unallocated patients:", err.response?.status, err.message);
      setUnallocatedPatients([]);
      // Don't show error to user for dashboard data loading
    }
  };

  const getData = async () => {
    setLoading(true);

    getFaculty();
    getCamp();
    getLocation();
    getPatient();
    getUnallocatedPatients();

    setLoading(false);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <div className="dashboard has-navbar">
      <Navbar isDashboard={true} menuOpen={menuOpen} />
      {auth ? null : <Navigate replace to="/" />}
      <div className={menuOpen ? `sidebar` : "sidebar close"}>
        <ul className="nav-links">
          <li>
            <i
              className="bx bx-menu"
              onClick={() => setMenuOpen(!menuOpen)}
            ></i>
          </li>
          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setSelected("home");
                navigate("/admin/home");
              }}
            >
              <i className="bx bx-grid-alt"></i>
              <span className="link_name">{t('dashboard', language)}</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="/admin/home">
                  {t('dashboard', language)}
                </a>
              </li>
            </ul>
          </li>

          {/* <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/admin/location");
                setSelected("location");
              }}
            >
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className="link_name">Locations</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Locations
                </a>
              </li>
            </ul>
          </li> */}
          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/admin/faculty");
                setSelected("faculty");
              }}
            >
              <i className="bx bx-line-chart"></i>
              <span className="link_name">{t('counsellor', language)}</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="/admin/faculty">
                  {t('faculty', language)}
                </a>
              </li>
            </ul>
          </li>

          {/* ALLOCATE PATIENTS — temporarily hidden
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/admin/camp");
                setSelected("camp");
              }}
            >
              <i className="bx bx-compass"></i>
              <span className="link_name">{t('allocatePatients', language)}</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="/admin/camp">
                  {t('camp', language)}
                </a>
              </li>
            </ul>
          </li>
          */}
          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/admin/patient");
                setSelected("patient");
              }}
            >
              <i className="bx bx-history"></i>
              <span className="link_name">{t('patients', language)}</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="/admin/patient">
                  {t('patientsHistory', language)}
                </a>
              </li>
            </ul>
          </li>

          <li>
            <div className="profile-details">
              <div className="profile-content">
                <i class="bi bi-person-fill"></i>
              </div>
              <div className="name-job">
                <div className="profile_name">{t('admin', language)}</div>
                <div className="job">{t('authorizer', language)}</div>
              </div>
              <i
                className="bx bx-log-out"
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                  window.location.reload(false);
                }}
              ></i>
            </div>
          </li>
        </ul>
      </div>

      <section className="home-section">
        {loading ? <Loader /> : null}
        {selected === "home" ? (
          <Home
            setLoading={setLoading}
            locCount={loc.length}
            campCount={camp.length}
            patientCount={patient.length}
            facCount={faculty.filter(f => f.role !== 'admin').length}
            adminCount={faculty.filter(f => f.role === 'admin').length}
            patients={patient}
          />
        ) : null}

        {/* {selected === "location" ? (
          <Location
            setLoading={setLoading}
            location={loc}
            setTrigger={setTrigger}
          />
        ) : null} */}

        {selected === "faculty" ? (
          <Faculty
            setLoading={setLoading}
            faculty={faculty}
            setTrigger={setTrigger}
          />
        ) : null}
        {/* ALLOCATE PATIENTS — temporarily hidden
        {selected === "camp" ? (
          <Camp
            setLoading={setLoading}
            location={loc}
            unallocatedPatientsList={unallocatedPatients}
            faculty={faculty}
            setTrigger={setTrigger}
          />
        ) : null}
        */}
        {selected === "patient" ? (
          <Patient
            setLoading={setLoading}
            patient={patient}
            camp={camp}
            faculty={faculty}
            setTrigger={setTrigger}
          />
        ) : null}
      </section>
    </div>
  );
}

export default Dashboard;
