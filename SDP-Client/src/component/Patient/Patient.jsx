import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Patient.scss";
import "../Location/Location.scss";
import { useLanguage } from "../../context/LanguageContext";
import { t } from "../../translations";
import * as XLSX from "xlsx/xlsx.mjs";
import { set_cptable } from "xlsx";
import * as cptable from "xlsx/dist/cpexcel.full.mjs";
import { printPatientPDF } from "../../utils/printPatient";
import { formatPatientId } from "../../utils/patientId";
import toast from "react-hot-toast";

set_cptable(cptable);

function Patient({ setLoading, camp, patient, faculty }) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [translatedPatients, setTranslatedPatients] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Function to translate text using Google Translate API
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

  // Store patient data in localStorage when it changes
  useEffect(() => {
    if (patient && patient.length > 0) {
      localStorage.setItem("patients", JSON.stringify(patient));
    }
  }, [patient]);

  // Translate patient data when language is Kannada
  useEffect(() => {
    if (language === 'kn' && patient && patient.length > 0) {
      const translateData = async () => {
        const translated = await Promise.all(
          patient.map(async (p) => {
            const translatedName = await translateText(p.name, 'kn');
            const translatedPhone = await translateText(p.phone, 'kn');
            const facultyName = faculty?.find(f => f._id === p.faculty)?.name || '';
            const translatedFaculty = await translateText(facultyName, 'kn');
            return {
              ...p,
              translatedName,
              translatedPhone,
              translatedFaculty
            };
          })
        );
        setTranslatedPatients(translated);
      };
      translateData();
    } else {
      setTranslatedPatients(null);
    }
  }, [language, patient, faculty]);

  const handleAddPatient = () => {
    navigate("/admin/add-patient");
  };

  const downloadData = () => {
    let listToDownload = patient ? [...patient] : [];

    if (startDate || endDate) {
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      if (end) end.setHours(23, 59, 59, 999);

      listToDownload = listToDownload.filter((p) => {
        const pDateStr = p.joining_date || p.createdAt;
        if (!pDateStr) return false;
        const pDate = new Date(pDateStr);
        if (start && pDate < start) return false;
        if (end && pDate > end) return false;
        return true;
      });
    }

    if (listToDownload.length === 0) {
      toast.error("No patient records found in the selected date range.");
      return;
    }

    var obj = [...JSON.parse(JSON.stringify(listToDownload))];

    console.log(obj);

    for (const i of obj) {
      if (i.complaints && i.complaints.length !== 0) {
        i.drug = i?.complaints[0].drug;
        i.age_of_first_use = i?.complaints[0].age_of_first_use;
        i.frequency_last_30_days = i?.complaints[0].frequency_last_30_days;
        i.quantity_last_30_days = i?.complaints[0].quantity_last_30_days;
        i.route_stration = i?.complaints[0].route_stration;
        i.year_excessive_use = i?.complaints[0].year_excessive_use;
        i.year_use = i?.complaints[0].year_use;
      }

      delete i["complaints"];
      delete i["weeklyReport"];
      delete i["legal_history"];
      delete i["family_history"];
      delete i["family_health_status"];
      delete i["_id"];
    }

    var worksheet = XLSX.utils.json_to_sheet(obj);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet);
    XLSX.writeFile(wb, `patientdata_${startDate || 'all'}_to_${endDate || 'all'}.xlsx`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query on input change
  };

  const handleClearBtn = () => {
    setSearchQuery("");
  };

  const filteredPatients = patient ? patient.filter((data) => {
    if (!data || !data.name) return false;

    // Apply Date Range filter if set
    if (startDate || endDate) {
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      if (end) end.setHours(23, 59, 59, 999);

      const pDateStr = data.joining_date || data.createdAt;
      if (!pDateStr) return false;
      const pDate = new Date(pDateStr);
      if (start && pDate < start) return false;
      if (end && pDate > end) return false;
    }

    const translatedData = translatedPatients?.find(tp => tp._id === data._id) || data;
    const nameToSearch = (translatedData.translatedName || data.name || '');
    if (!nameToSearch) return false;
    const query = searchQuery.toLowerCase();
    if (searchQuery && !nameToSearch.toLowerCase().includes(query) &&
        !formatPatientId(data.patientId).toLowerCase().includes(query) &&
        !String(data.patientId).includes(query) &&
        !(data.phone && data.phone.toLowerCase().includes(query)) &&
        !(data.aadharNumber && data.aadharNumber.toLowerCase().includes(query))) return false;
    return true;
  }) : [];

  return (
    <div className="content">
      <div className="header">
        <h4>{t('patientData', language)}</h4>
      </div>
      <div className="buttons">
        <button
          className="add-btn"
          onClick={(e) => downloadData(e.target.value)}
        >
          {t('downloadCsv', language)}
        </button>

        <button className="add-btn" onClick={handleAddPatient}>
          {t('addPatient', language)}
        </button>

        <div className="date-filter-group">
          <span>From:</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="date-filter-group">
          <span>To:</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {(startDate || endDate) && (
          <button
            className="edit-btn"
            onClick={() => {
              setStartDate("");
              setEndDate("");
            }}
            style={{ padding: "8px 12px", borderColor: "#cbd5e1" }}
          >
            <i className="fas fa-times" style={{ marginRight: "6px" }}></i> Clear Dates
          </button>
        )}

        {/* <input
        type="text"
        placeholder="Search patients..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input" // Add styling as needed
      /> */}

        {/* <input
        onChange={handleSearchChange}
        value={searchQuery}
        type="text"
        name="product-search"
        id="product-search"
        placeholder="Search Patients"
      />
      <i onClick={handleClearBtn} className="fas fa-times"></i>
      
       */}

        <div className="input-wrap">
          <i className="fas fa-search"></i>

          <input
            onChange={handleSearchChange}
            value={searchQuery}
            type="text"
            name="product-search"
            id="product-search"
            placeholder={t('searchPatients', language)}
          />
          <i onClick={handleClearBtn} className="fas fa-times"></i>
        </div>
      </div>

      {/* <div className="table-div">
        <table class="table">
          <thead className="table-header">
            <tr>
              <th scope="col">Patient ID</th>
              <th scope="col">Counseller</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>

              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="table-body">
            {patient &&
              patient.map((data, key) => {
                return (
                  <tr>
                    <th scope="row">{formatPatientId(data.patientId)}</th>
                    <td>
                      <p>
                        {faculty?.map((d, k) => {
                          if (d._id == data.faculty) return d.name;
                        })}
                      </p>
                    </td>
                    <td>
                      <p>{data.name}</p>
                    </td>
                    <td>
                      <p>{data.phone}</p>
                    </td>

                    <td>
                      <button
                        className="edit-btn"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <i class="bi bi-eye"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div> */}

      <div className="table-div">
        <table className="table">
          <thead className="table-header">
            <tr>
              <th scope="col">Patient ID</th>
              <th scope="col">{t('counsellor', language)}</th>
              <th scope="col">{t('name', language)}</th>
              <th scope="col">{t('phone', language)}</th>
              <th scope="col">Joining Date</th>
              <th scope="col">Discharge Date</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="table-body">
            {filteredPatients && filteredPatients.length > 0 ? (
              filteredPatients.map((data, key) => {
                const translatedData = translatedPatients?.find(tp => tp._id === data._id) || data;
                return (
                  <tr key={key}>
                    <th scope="row">{formatPatientId(data.patientId)}</th>
                    <td>
                      {(() => {
                        const matchingFaculty = faculty?.find(d => d._id === data.faculty);
                        return matchingFaculty ? (translatedData.translatedFaculty || matchingFaculty.name) : "N/A";
                      })()}
                    </td>
                    <td>{translatedData.translatedName || data.name}</td>
                    <td>{translatedData.translatedPhone || data.phone}</td>
                    <td>
                      {data.joining_date
                        ? new Date(data.joining_date).toLocaleDateString("en-IN")
                        : <span style={{ color: "#94a3b8" }}>—</span>}
                    </td>
                    <td>
                      {data.discharge_date
                        ? <span style={{ color: "#16a34a", fontWeight: 600 }}>
                            {new Date(data.discharge_date).toLocaleDateString("en-IN")}
                          </span>
                        : <span style={{ color: "#f59e0b", fontWeight: 600, fontSize: "0.75rem" }}>Admitted</span>}
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
                        <button
                          className="edit-btn"
                          onClick={() => navigate(`/patient/${data._id}`)}
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        <button
                          className="edit-btn"
                          title="Download PDF"
                          onClick={() => printPatientPDF(data)}
                          style={{ color: "#dc2626" }}
                        >
                          <i className="bi bi-file-earmark-pdf"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  {t('noPatientsFound', language)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Patient;
