import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import BasicInfo from "../../component/FacultyPanel/AddPatient/BasicInfo";
import BasicInfo2 from "../../component/FacultyPanel/AddPatient/BasicInfo2";
import BasicInfo3 from "../../component/FacultyPanel/AddPatient/BasicInfo3";
import BasicInfo4 from "../../component/FacultyPanel/AddPatient/BasicInfo4";
import BasicInfo5 from "../../component/FacultyPanel/AddPatient/BasicInfo5";
import PredictionModels from "../../component/FacultyPanel/AddPatient/PredictionModel";

import Loader from "../../component/Loader/Loader";
import "./AddPatientPage.scss";
import TabChange from "../../component/TabChange/TabChange";

const tabList = [
  {
    name: "basicInfo",
    step: 1,
  },
  {
    name: "medicalHistory",
    step: 2,
  },
  {
    name: "familyHistory",
    step: 3,
  },
  {
    name: "pastTreatmentHistory",
    step: 4,
  },
  {
    name: "counsellorSection",
    step: 5,
  },
  {
    name: "predictionModels",
    step: 6,
  },
];

function AddPatientPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  console.log("AddPatientPage - URL params id:", id);

  // Reset data when step changes to avoid conflicts
  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

  return (
    <div className="add-patient">
      {loading && <Loader />}
      <div className="header" style={{ width: "60%", margin: "auto", paddingTop: "20px", display: "flex", justifyContent: "flex-start" }}>
        <i
          className="bi bi-arrow-left-square-fill"
          style={{ fontSize: "25px", cursor: "pointer" }}
          onClick={() => {
            const isAdmin = !!localStorage.getItem("auth");
            navigate(isAdmin ? "/admin/home" : "/faculty");
          }}
        ></i>
      </div>
      <TabChange tabList={tabList} setStep={handleStepChange} step={step} />

      {step === 1 && (
        <BasicInfo
          prevData={false}
          setData={setData}
          data={data}
          setStep={setStep}
        />
      )}

      {step === 2 && (
        <BasicInfo2
          prevData={false}
          setData={setData}
          data={data}
          setStep={setStep}
          setLoading={setLoading}
        />
      )}

      {step === 3 && (
        <BasicInfo3
          prevData={false}
          setData={setData}
          data={data}
          setStep={setStep}
          setLoading={setLoading}
        />
      )}

      {step === 4 && (
        <BasicInfo4
          prevData={false}
          setData={setData}
          data={data}
          setStep={setStep}
          setLoading={setLoading}
        />
      )}

      {step === 5 && (
        <BasicInfo5
          prevData={false}
          setData={setData}
          data={data}
          setStep={setStep}
          setLoading={setLoading}
        />
      )}

      {step === 6 && <PredictionModels />}
    </div>
  );
}

export default AddPatientPage;
