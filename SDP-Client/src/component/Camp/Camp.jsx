import React, { useState, useEffect } from "react";
import "../Location/Location.scss";
import PatientModal from "../Modal/PatientModal";
import { useLanguage } from "../../context/LanguageContext";
import { t } from "../../translations";

function Camp({
  setLoading,
  unallocatedPatientsList,
  faculty,
  location,
  setTrigger,
}) {
  const [showModal, setShowModal] = useState(false);
  //   const [trigger, setTrigger] = useState();
  const [data, setData] = useState();

  const [unallocatedPatients, setUnallocatedPatients] = useState([]);
  const [translatedPatients, setTranslatedPatients] = useState(null);

  const { language } = useLanguage();

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

  useEffect(() => {
    if (unallocatedPatientsList) {
      var obj = [];
      for (var i of unallocatedPatientsList) {
        const a = {
          value: i._id,
          label: i.name,
          patientId: i.patientId,
        };
        if (!i.isAdmin) {
          obj.push(a);
        }
      }

      setUnallocatedPatients(obj);
    }
  }, [unallocatedPatientsList]);

  // Translate patient data when language is Kannada
  useEffect(() => {
    if (language === 'kn' && unallocatedPatientsList && unallocatedPatientsList.length > 0) {
      const translateData = async () => {
        const translated = await Promise.all(
          unallocatedPatientsList.map(async (p) => {
            const translatedName = await translateText(p.name, 'kn');
            return {
              ...p,
              translatedName
            };
          })
        );
        setTranslatedPatients(translated);
      };
      translateData();
    } else {
      setTranslatedPatients(null);
    }
  }, [language, unallocatedPatientsList]);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className="content">
      <PatientModal
        showModal={showModal}
        setShowModal={setShowModal}
        data={data}
        setData={setData}
        setTrigger={setTrigger}
        location={location}
        unallocatedPatients={unallocatedPatients}
        faculties={faculty}
      />
      <div className="header">
        <h4>{t('nonAllocatedPatients', language)}</h4>
        <button className="add-btn" onClick={openModal}>
          {t('allocatePatient', language)}
        </button>
      </div>

      <div className="table-div">
        <table class="table">
          <thead className="table-header">
            <tr>
              <th scope="col">{t('patientId', language)}</th>
              {/* <th scope="col">Name</th> */}
              {/* <th scope="col">Location</th> */}
              <th scope="col">{t('patient', language)}</th>
              {/* <th scope="col">Start Date</th>
              <th scope="col">End Date</th> */}
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="table-body">
            {unallocatedPatientsList &&
              unallocatedPatientsList.filter(data => data).map((data, key) => {
                const translatedData = translatedPatients?.find(tp => tp._id === data._id) || data;
                return (
                  <tr key={key}>
                    <th scope="row">{data.patientId}</th>
                    <td>
                      <p>{translatedData.translatedName || data.name}</p>
                    </td>

                    {
                      /* <td>
                      <p>
                        {location &&
                          location?.map((d, k) => {
                            if (d._id == (data.locationId || '')) return <>{d.name}</>;
                          })}
                      </p>
                    </td>*/
                      <td>
                        {" "}
                        {data?.unallocatedPatientsList?.map((patientId, k) => {
                          for (var i of unallocatedPatients) {
                            console.log("i: ", i);
                            if (patientId === i.value) return <p key={k}>{i.label}</p>;
                          }
                          return null;
                        })}{" "}
                      </td>
                    }
                    {/* <td>
                      <p>{data.startDate.split("T")[0]}</p>
                    </td>

                    <td>
                      <p>{data.endDate.split("T")[0]}</p>

                      {/* {data.createdAt.setDate(data.createdAt.getDate() + 7).split("T")[0]} 
                    </td> */}

                    {/* <td>
                      <button
                        className="edit-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          setData(data);
                          openModal();
                        }}
                      >
                        <i class="bi bi-pencil-square"></i>
                      </button>
                    </td> */}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Camp;
