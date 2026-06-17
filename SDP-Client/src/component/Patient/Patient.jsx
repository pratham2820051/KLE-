import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Patient.scss";
import "../Location/Location.scss";

import { useLanguage } from "../../context/LanguageContext";
import { t } from "../../translations";

import * as XLSX from "xlsx/xlsx.mjs";

/* load the codepage support library for extended support with older formats  */
import { set_cptable } from "xlsx";
import * as cptable from "xlsx/dist/cpexcel.full.mjs";

set_cptable(cptable);

function Patient({ setLoading, camp, patient, faculty }) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [translatedPatients, setTranslatedPatients] = useState(null);

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
    var obj = [...JSON.parse(JSON.stringify(patient))];

    console.log(obj);

    for (const i of obj) {
      if (i.complaints && i.complaints.length !== 0) {
        i.drug = i?.complaints[0].drug;
        i.age_of_first_use = i?.complaints[0].age_of_first_use;
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

    // const download = (jsonArray, name, index) => {
    // console.log(jsonArray)
    // let djson = copy(obj)
    // const invoiceAdder = parseInt(index) + parseInt(invoiceNumber)
    // for (var j of djson) {
    //   delete j["XCode"]
    //   j["InvoiceNo"] = j["InvoiceNo"] + '-' + invoiceAdder
    //   j["InvoiceDate"] = customDate
    // }
    var worksheet = XLSX.utils.json_to_sheet(obj);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet);
    XLSX.writeFile(wb, `patientdata.xlsx`);
    // };

    // console.log(obj)
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query on input change
  };

  const handleClearBtn = () => {
    setSearchQuery("");
  };

  const filteredPatients = patient ? patient.filter((data) => {
    if (!data || !data.name) return false;
    const translatedData = translatedPatients?.find(tp => tp._id === data._id) || data;
    const nameToSearch = (translatedData.translatedName || data.name || '');
    // Check if nameToSearch exists before calling toLowerCase()
    if (!nameToSearch) return false;
    if (searchQuery && !nameToSearch.toLowerCase().includes(searchQuery.toLowerCase())) return false;
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
                    <th scope="row">{data.patientId}</th>
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
              <th scope="col">{t('patientId', language)}</th>
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
                    <th scope="row">{data.patientId}</th>
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
                      <button
                        className="edit-btn"
                        onClick={() => navigate(`/patient/${data._id}`)}
                      >
                        <i className="bi bi-eye"></i>
                      </button>
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
