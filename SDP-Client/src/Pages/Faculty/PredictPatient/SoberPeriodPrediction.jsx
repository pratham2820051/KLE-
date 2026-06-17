import React, { useState } from "react";
import axios from "axios";
import "./soberPeriodPrediction.scss";
import { SOBER_PERIOD } from "./../../../utils/apiConstant.js";
import { useNavigate } from "react-router";
import { useLanguage } from "../../../context/LanguageContext";
import { t } from "../../../translations";

const SoberPeriodPrediction = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    "Marital Status": -1,
    "smoking/smokeless": -1,
    "Motivation factor": -1,
    "Willingness for treatment": -1,
    "Sugar(mg)": -1,
    "Risk Level": -1,
    "RCA_liked the effect and wanted more of it": -1,
    MPPR_no: -1,
    "Number of relapses (based on period of treatment)": 0,
    "Period of sober": 0,
  });
  const [outputData, setOutputData] = useState(null);

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "number") {
      // For number inputs, parse as float and handle empty values
      const numValue = value === "" ? 0 : parseFloat(value, 10);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: isNaN(numValue) ? 0 : numValue,
      }));
    } else {
      // For radio buttons, convert string values to numbers, keep -1 for no selection
      const numValue = value === "" ? -1 : parseInt(value, 10);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: isNaN(numValue) ? -1 : numValue,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // console.log("hello");
      console.log("Form : ", formData);
      const response = await axios.post(SOBER_PERIOD, formData);
      // console.log("data sent");

      setOutputData(response.data.result);
      // console.log(outputData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="question-box">
      <div className="header1">
        <i
          class="bi bi-arrow-left-square-fill"
          onClick={() => {
            navigate(-1);
          }}
        ></i>
      </div>
      <form onSubmit={handleSubmit}>
        <div class="question">
          <label>{t('areYouMarried', language)}</label>
          <div>
            <input
              type="radio"
              name="Marital Status"
              value="0"
              checked={formData["Marital Status"] === 0}
              onChange={handleInputChange}
            />{" "}
            {t('yes', language)}
          </div>

          <div>
            <input
              type="radio"
              name="Marital Status"
              value="1"
              checked={formData["Marital Status"] === 1}
              onChange={handleInputChange}
            />{" "}
            {t('no', language)}
          </div>
        </div>

        <div class="question">
          <label>{t('doYouSmoke', language)}</label>
          <div>
            <input
              type="radio"
              name="smoking/smokeless"
              value="0"
              checked={formData["smoking/smokeless"] === 0}
              onChange={handleInputChange}
            />{" "}
            {t('yes', language)}
          </div>

          <div>
            <input
              type="radio"
              name="smoking/smokeless"
              value="1"
              checked={formData["smoking/smokeless"] === 1}
              onChange={handleInputChange}
            />{" "}
            {t('no', language)}
          </div>
        </div>

        <div class="question">
          <label>{t('motivationFactor', language)}</label>
          <div>
            <input
              type="radio"
              name="Motivation factor"
              value="0"
              checked={formData["Motivation factor"] === 0}
              onChange={handleInputChange}
            />{" "}
            {t('moderate', language)}
          </div>

          <div>
            <input
              type="radio"
              name="Motivation factor"
              value="1"
              checked={formData["Motivation factor"] === 1}
              onChange={handleInputChange}
            />{" "}
            {t('severe', language)}
          </div>
          <div>
            <input
              type="radio"
              name="Motivation factor"
              value="2"
              checked={formData["Motivation factor"] === 2}
              onChange={handleInputChange}
            />{" "}
            {t('willing', language)}
          </div>
        </div>

        <div class="question">
          <label>{t('willingnessForTreatment', language)}</label>
          <div>
            <input
              type="radio"
              name="Willingness for treatment"
              value="0"
              checked={formData["Willingness for treatment"] === 0}
              onChange={handleInputChange}
            />{" "}
            {t('willing', language)}
          </div>

          <div>
            <input
              type="radio"
              name="Willingness for treatment"
              value="1"
              checked={formData["Willingness for treatment"] === 1}
              onChange={handleInputChange}
            />{" "}
            {t('ambivalent', language)}
          </div>

          <div>
            <input
              type="radio"
              name="Willingness for treatment"
              value="2"
              checked={formData["Willingness for treatment"] === 2}
              onChange={handleInputChange}
            />{" "}
            {t('unwilling', language)}
          </div>
        </div>

        <div class="question">
          <label>{t('sugar', language)}</label>
          <div>
            <input
              type="radio"
              name="Sugar(mg)"
              value="0"
              checked={formData["Sugar(mg)"] === 0}
              onChange={handleInputChange}
            />{" "}
            {t('normal', language)}
          </div>

          <div>
            <input
              type="radio"
              name="Sugar(mg)"
              value="1"
              checked={formData["Sugar(mg)"] === 1}
              onChange={handleInputChange}
            />{" "}
            {t('no', language)}
          </div>

          <div>
            <input
              type="radio"
              name="Sugar(mg)"
              value="2"
              checked={formData["Sugar(mg)"] === 2}
              onChange={handleInputChange}
            />{" "}
            {t('diabetic', language)}
          </div>
        </div>

        <div class="question">
          <label>{t('riskLevel', language)}</label>
          <div>
            <input
              type="radio"
              name="Risk Level"
              value="1"
              checked={formData["Risk Level"] === 1}
              onChange={handleInputChange}
            />{" "}
            {t('lowRisk', language)}
          </div>

          <div>
            <input
              type="radio"
              name="Risk Level"
              value="2"
              checked={formData["Risk Level"] === 2}
              onChange={handleInputChange}
            />{" "}
            {t('mediumRisk', language)}
          </div>

          <div>
            <input
              type="radio"
              name="Risk Level"
              value="3"
              checked={formData["Risk Level"] === 3}
              onChange={handleInputChange}
            />{" "}
            {t('highRisk', language)}
          </div>

          <div>
            <input
              type="radio"
              name="Risk Level"
              value="4"
              checked={formData["Risk Level"] === 4}
              onChange={handleInputChange}
            />{" "}
            {t('veryHighRisk', language)}
          </div>
        </div>

        <div class="question">
          <label>{t('reasonContinueOptions', language)}</label>
          <div>
            <input
              type="radio"
              name="RCA_liked the effect and wanted more of it"
              value="0"
              checked={
                formData["RCA_liked the effect and wanted more of it"] === 0
              }
              onChange={handleInputChange}
            />{" "}
            {t('no', language)}
          </div>

          <div>
            <input
              type="radio"
              name="RCA_liked the effect and wanted more of it"
              value="1"
              checked={
                formData["RCA_liked the effect and wanted more of it"] === 1
              }
              onChange={handleInputChange}
            />{" "}
            {t('yes', language)}
          </div>
        </div>

        <div class="question">
          <label>{t('presentMedicalProblem', language)}</label>
          <div>
            <input
              type="radio"
              name="MPPR_no"
              value="0"
              checked={formData["MPPR_no"] === 0}
              onChange={handleInputChange}
            />{" "}
            {t('no', language)}
          </div>

          <div>
            <input
              type="radio"
              name="MPPR_no"
              value="1"
              checked={formData["MPPR_no"] === 1}
              onChange={handleInputChange}
            />{" "}
            {t('yes', language)}
          </div>
        </div>

        {/* <div class="question">
          <label>{t('totalNumberOfRelapses', language)}</label>
          <div>
            <input
              type="radio"
              name="Number of relapses (based on period of treatment)"
              value="0"
              checked={
                formData[
                  "Number of relapses (based on period of treatment)"
                ] === 0
              }
              onChange={handleInputChange}
            />{" "}
            {t('stage0', language)}
          </div>

          <div>
            <input
              type="radio"
              name="Number of relapses (based on period of treatment)"
              value="1"
              checked={
                formData[
                  "Number of relapses (based on period of treatment)"
                ] === 1
              }
              onChange={handleInputChange}
            />{" "}
            {t('stage1', language)}
          </div>
        </div> */}

        <div class="question">
          <label>
            {t('totalNumberOfRelapses', language)}
          </label>
          <div>
            <input
              type="number"
              name="Number of relapses (based on period of treatment)"
              value={
                formData["Number of relapses (based on period of treatment)"]
              }
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div class="question">
          <label>{t('periodOfSoberGroup', language)} :</label>
          <div>
            <input
              type="number"
              name="Period of sober"
              value={formData["Period of sober"]}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <button type="submit">{t('submit', language)}</button>
      </form>
      {outputData && (
        <div className="output-box">
          <h4>{t('periodOfSoberGroup', language)}: {outputData}</h4>
        </div>
      )}
    </div>
  );
};

export default SoberPeriodPrediction;
