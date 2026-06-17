import React, { useEffect, useState } from "react";
import "./Dashboard.scss";

import axios from "axios";

import { useNavigate } from "react-router";
import { GET_USER_CAMP, BASE_URL, ADD_PATIENT } from "../../../utils/apiConstant";
import { useLanguage } from "../../../context/LanguageContext";
import { t } from "../../../translations";
import klelogo from "../../../assets/logo.png";


function Dashboard() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const auth = localStorage.getItem("facultyAuth") || localStorage.getItem("auth");

  const [locationId, setLocationId] = useState();
  const [patientData, setPatients] = useState([]);
  const [translatedPatients, setTranslatedPatients] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const translateText = async (text, targetLang) => {
    if (!text) return text;
    try {
      const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
      const data = await response.json();
      return data[0][0][0];
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  };

  const headers = {
    Authorization: `Bearer ${auth}`,
  };

  const getCamps = async () => {
    await axios
      .get(GET_USER_CAMP, { headers: headers })
      .then((res) => {
        if (res.data && res.data.data && res.data.data.length > 0) {
          setLocationId(res.data.data[0].locationId);
        } else {
          // Fallback: use the default KLE location
          axios.get(`${BASE_URL}/api/location`, { headers: headers })
            .then(locRes => {
              if (locRes.data?.data?.length > 0) {
                setLocationId(locRes.data.data[0]._id);
              }
            })
            .catch(() => {});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPatients = async () => {
    await axios
      .get(ADD_PATIENT, { headers: headers })
      .then((res) => {
        setPatients(res.data.data);
        localStorage.setItem("patients", JSON.stringify(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPatients();
    getCamps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (language === 'kn' && patientData && patientData.length > 0) {
      const translateData = async () => {
        const translated = await Promise.all(
          patientData.map(async (p) => {
            const translatedName = await translateText(p.name, 'kn');
            const translatedAddress = await translateText(p.address, 'kn');
            const translatedDate = await translateText(p.createdAt.split("T")[0], 'kn');
            return {
              ...p,
              translatedName,
              translatedAddress,
              translatedDate
            };
          })
        );
        setTranslatedPatients(translated);
      };
      translateData();
    } else {
      setTranslatedPatients(null);
    }
  }, [language, patientData]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearBtn = () => {
    setSearchQuery("");
  };

  const filteredPatients = patientData.filter((data) => {
    if (!data || !data.name) return false;
    const name = data.name.toLowerCase();
    const query = searchQuery.toLowerCase();
    return name.includes(query);
  });

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return parts[0][0].toUpperCase();
  };

  return (
    <div className="patientData">
      {/* Top Header */}
      <div className="header">
        <div className="brand-title">
          <img src={klelogo} alt="KLE Logo" style={{ height: "30px", width: "auto" }} />
          KLE Centenary <span>Rehabilitation &amp; De-addiction Unit</span>
        </div>
        <i
          className="bi bi-box-arrow-right"
          title="Logout"
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        ></i>
      </div>

      {/* Patient List Section */}
      <div className="patient-list">
        <div className="header">
          <h6>{t('patientsList', language)}</h6>
          <div className="buttons1">
            <button onClick={() => navigate(`/patientAdd/${locationId}`)}>
              <i className="bi bi-person-plus-fill"></i>
              {t('addPatient', language)}
            </button>

            <div className="input-wrap1">
              <i className="fas fa-search"></i>
              <input
                onChange={handleSearchChange}
                value={searchQuery}
                type="text"
                name="patient-search"
                id="product-search"
                placeholder={t('searchPatients', language)}
              />
              {searchQuery && <i onClick={handleClearBtn} className="fas fa-times"></i>}
            </div>
          </div>
        </div>

        {filteredPatients.length !== 0 ? (
          <div>
            {filteredPatients.map((data, key) => {
              const translatedData = translatedPatients?.find(tp => tp._id === data._id) || data;
              const displayName = translatedData.translatedName || data.name;
              const displayAddress = translatedData.translatedAddress || data.address;
              const displayDate = translatedData.translatedDate || (data.createdAt ? data.createdAt.split("T")[0] : "");
              return (
                <div className="patient" key={key} style={{ animationDelay: `${key * 0.05}s` }}>
                  <div className="patient-avatar">
                    {getInitials(data.name)}
                  </div>
                  <p>
                    <strong>{displayName}</strong>
                    <span className="meta">
                      {displayAddress} · {displayDate}
                      {data.joining_date && (
                        <span> · <i className="bi bi-calendar-check" style={{color:"#003b7a", marginRight:"3px"}}></i>
                        Joined: {new Date(data.joining_date).toLocaleDateString()}</span>
                      )}
                      {data.discharge_date && (
                        <span> · <i className="bi bi-calendar-x" style={{color:"#16a34a", marginRight:"3px"}}></i>
                        Discharged: {new Date(data.discharge_date).toLocaleDateString()}</span>
                      )}
                    </span>
                  </p>
                  <div className="controls">
                    <button
                      title="View Patient"
                      onClick={() => navigate(`/patient/${data._id}`)}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                    <button
                      title="Edit Patient"
                      onClick={() => navigate(`/patient/${data._id}`)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="no-patient">
            {searchQuery ? "No patients match your search" : "No Patients To Display"}
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
