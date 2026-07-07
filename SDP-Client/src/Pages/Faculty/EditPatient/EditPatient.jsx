import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import BasicInfo from "../../../component/FacultyPanel/AddPatient/BasicInfo";
import BasicInfo2 from "../../../component/FacultyPanel/AddPatient/BasicInfo2";
import BasicInfo3 from "../../../component/FacultyPanel/AddPatient/BasicInfo3";
import BasicInfo4 from "../../../component/FacultyPanel/AddPatient/BasicInfo4";
import BasicInfo5 from "../../../component/FacultyPanel/AddPatient/BasicInfo5";
import TabChange from "../../../component/TabChange/TabChange";
import Loader from "../../../component/Loader/Loader";
import axios from "axios";
import { ADD_PATIENT, GET_PATIENT_USER } from "../../../utils/apiConstant";
import { printPatientPDF } from "../../../utils/printPatient";
import FollowUpHistory from "../../../component/FacultyPanel/AddPatient/FollowUpHistory";

const tabList = [{
  name: "basicInfo",
  step: 1
},
{
  name: "medicalHistory",
  step: 2
},
{
  name: "familyHistory",
  step: 3
},
{
  name: "pastTreatmentHistory",
  step: 4
},
{
  name: "counsellorSection",
  step: 5
},
{
  name: "followUpHistory",
  step: 6
}
]

function EditPatient() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const { id } = useParams();

  const [data, setData] = useState({
    _id: id,
  });



  const getPatientData = async () => {
    setLoading(true);
    try {
      const adminToken = localStorage.getItem("auth");
      const facultyToken = localStorage.getItem("facultyAuth");
      const auth = adminToken || facultyToken;
      const isAdmin = !!adminToken;

      if (!auth) {
        setLoading(false);
        navigate("/");
        return;
      }

      const cleanToken = auth.replace(/['"]+/g, '').trim();
      const headers = {
        Authorization: `Bearer ${cleanToken}`,
      };

      const url = ADD_PATIENT;

      const response = await axios.get(url, { headers });
      if (response.data && response.data.data) {
        const patients = response.data.data;
        localStorage.setItem("patients", JSON.stringify(patients));
        
        const found = patients.find(itm => itm._id === id);
        if (found) {
          setData(found);
        } else {
          console.error("Patient not found in fetched list");
        }
      }
    } catch (err) {
      console.error("Error fetching patient details:", err);
      const patData = JSON.parse(localStorage.getItem("patients") || "[]");
      const found = patData.find(itm => itm._id === id);
      if (found) {
        setData(found);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPatientData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="edit-patient">
      {loading && <Loader />}
      <div className="header" style={{ width: "60%", margin: "auto", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <i
          className="bi bi-arrow-left-square-fill"
          style={{ fontSize: "25px", cursor: "pointer", color: "#003b7a" }}
          onClick={() => {
            const isAdmin = !!localStorage.getItem("auth");
            navigate(isAdmin ? "/admin/home" : "/faculty");
          }}
        ></i>
        {data && data.name && (
          <button
            onClick={() => printPatientPDF(data)}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: "#dc2626", color: "#fff", border: "none",
              borderRadius: "8px", padding: "8px 16px", cursor: "pointer",
              fontWeight: 600, fontSize: "0.9rem"
            }}
          >
            <i className="bi bi-file-earmark-pdf-fill"></i>
            Print PDF
          </button>
        )}
      </div>
      {<TabChange tabList={tabList} setStep={setStep} step={step} />}

      {step === 1 ? <BasicInfo prevData={true} data={data} setData={setData} setStep={setStep} setLoading={setLoading} /> : null}
      {step === 2 ? <BasicInfo2 prevData={true} data={data} setData={setData} setStep={setStep} setLoading={setLoading} /> : null}
      {step === 3 ? <BasicInfo3 prevData={true} data={data} setData={setData} setStep={setStep} setLoading={setLoading} /> : null}
      {step === 4 ? <BasicInfo4 prevData={true} data={data} setData={setData} setStep={setStep} setLoading={setLoading} /> : null}
      {step === 5 ? <BasicInfo5 prevData={true} data={data} setData={setData} setStep={setStep} setLoading={setLoading} /> : null}
      {step === 6 ? <FollowUpHistory data={data} setData={setData} setLoading={setLoading} /> : null}


    </div>
  );
}

export default EditPatient;
