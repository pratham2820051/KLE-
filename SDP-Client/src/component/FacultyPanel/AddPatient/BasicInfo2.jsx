import React, { useState, useEffect } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { t } from "../../../translations";
import "./AddPatient.scss";

const ChoiceKeys = ["yes", "no"];

const FamilyHistoryKeys = [
  "alcoholism",
  "drugAbuse",
  "psychiatricIllness",
];

const withdrawlKeys = [
  "sweating",
  "palpitation",
  "tremors",
  "insomnia",
  "fits",
  "nausea",
  "achesAndPains",
  "anxiety",
  "restlessness",
  "transientVisual",
  "auditoryHallucinations",
];

const pastMedicalProblemKeys = [
  "haematemesis",
  "jaundice",
  "headInjury",
  "seizure",
  "accidents",
  "abscesses",
  "bleedingPiles",
  "skinProblems",
  "nerveRelatedPains",
];

const presentMedicalProblemKeys = [
  "presentHaematemesis",
  "presentJaundice",
  "presentHeadInjury",
  "presentSeizure",
  "presentAccidents",
  "presentAbscesses",
  "presentBleedingPiles",
  "presentSkinProblems",
  "presentNerveRelatedPains",
];

const chronicHealthProblemKeys = [
  "diabetes",
  "liverDisorders",
  "epilepsy",
  "respiratoryProblem",
  "pulmonaryTB",
  "chronicBronchitis",
  "bronchialAsthma",
  "cardiacProblems",
  "infections",
];

const presentPsychatricComplicationKeys = [
  "presentConfusion",
  "presentSeizure",
  "presentDepression",
  "presentSuicidalIdeation",
  "presentAggressiveOutbursts",
  "presentHallucinations",
  "presentConfusion",
  "presentSeizure",
  "presentDepression",
  "presentSuicidalIdeation",
  "presentParanoidIdeas",
];

const pastPsychatricComplicationKeys = [
  "pastConfusion",
  "pastSeizure",
  "pastDepression",
  "pastSuicidalIdeation",
  "pastAggressiveOutbursts",
  "pastHallucinations",
  "pastConfusion",
  "pastSeizure",
  "pastDepression",
  "pastSuicidalIdeation",
  "pastParanoidIdeas",
];

function BasicInfo2({ prevData, data, setData, setStep, setLoading }) {
  const { language } = useLanguage();

  const [weigthAdmission, setWeightAdmission] = useState(null);
  const [weigthDischarge, setWeightDischarge] = useState(null);
  const [height, setHeight] = useState(null);
  const [sugar, setSugar] = useState(null);
  const [otherIssue, setOtherIssue] = useState(null);
  const [withdrawl, setWithdrawl] = useState(null);
  const [pastMedical, setPastMedical] = useState(null);
  const [presentMedical, setPresentMedical] = useState(null);
  const [chronicHealth, setChronicHealth] = useState(null);
  const [pastPsychatricProblem, setPastPsychatricProblem] = useState(null);
  const [presentPsychatricProblem, setPresentPsychatricProblem] =
    useState(null);
  const [previousHeadInjury, setPreviousHeadInjury] = useState(null);
  const [allergyKnowledge, setAllergyKnowledge] = useState(null);
  const [familyHistory, setFamilyHistory] = useState(null);
  const [specificDrug, setSpecificDrug] = useState(null);
  const [psychiatricIllness, setPsychiatricIllness] = useState(null);

  const nextStep = () => {
    console.log("Before : ", setData);
    const obj = {
      weight_while_admission_in_kg: weigthAdmission,
      weight_while_discharge_in_kg: weigthDischarge,
      height_in_ft: height,
      sugar_in_mg: sugar,
      other_issues: otherIssue,
      withdrawal_symptoms_experienced_when_the_patient_stopped: withdrawl,
      past_medical_problem: pastMedical,
      present_medical_problem: presentMedical,
      chronic_health_problem: chronicHealth,
      past_psychiatric_complication: pastPsychatricProblem,
      present_psychiatric_complication: presentPsychatricProblem,
      history_of_previous_head_injureies: previousHeadInjury,
      allergy_knowledge: allergyKnowledge,
      family_history_substance_abuse: familyHistory,
      specific_drug_details: specificDrug,
      psychiatric_illness: psychiatricIllness,
    };

    setData({ ...data, ...obj });

    console.log("After : ", setData);
    setStep(3);
  };

  useEffect(() => {
    if (data) {
      setWeightAdmission(data?.weight_while_admission_in_kg);
      setWeightDischarge(data?.weight_while_discharge_in_kg);
      setHeight(data?.height_in_ft);
      setSugar(data?.sugar_in_mg);
      setOtherIssue(data?.other_issues);
      setWithdrawl(
        data?.withdrawal_symptoms_experienced_when_the_patient_stopped
      );
      setPastMedical(data?.past_medical_problem);
      setPresentMedical(data?.present_medical_problem);
      setChronicHealth(data?.chronic_health_problem);
      setPastPsychatricProblem(data?.past_psychiatric_complication);
      setPresentPsychatricProblem(data?.present_psychiatric_complication);
      setPreviousHeadInjury(data?.history_of_previous_head_injureies);
      setAllergyKnowledge(data?.allergy_knowledge);
      setFamilyHistory(data?.family_history_substance_abuse);
      setSpecificDrug(data?.specific_drug_details);
      setPsychiatricIllness(data?.psychiatric_illness);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="basic-info">
      <div className="header">
        <h2 className="w-100 text-center my-4">{t('medicalHistory', language)}</h2>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('weightAdmission', language)}</label>
          <input
            type="text"
            className="form-control"
            placeholder={t('weight', language)}
            value={weigthAdmission}
            onChange={(e) => setWeightAdmission(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('weightDischarge', language)}</label>
          <input
            type="text"
            className="form-control"
            placeholder={t('weight', language)}
            value={weigthDischarge}
            onChange={(e) => setWeightDischarge(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('height', language)}</label>
          <input
            type="text"
            className="form-control"
            placeholder={t('height', language)}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('sugar', language)}</label>
          <input
            type="text"
            className="form-control"
            placeholder={t('sugar', language)}
            value={sugar}
            onChange={(e) => setSugar(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('otherIssues', language)}</label>
          <input
            type="text"
            className="form-control"
            placeholder={t('otherIssues', language)}
            value={otherIssue}
            onChange={(e) => setOtherIssue(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('withdrawalSymptoms', language)}</label>
          <select
            class="form-select form-select-lg"
            onChange={(e) => setWithdrawl(e.target.value)}
            value={withdrawl}
          >
            <option>{t('selectOption', language)}</option>
            {withdrawlKeys &&
              withdrawlKeys.map((key, index) => {
                return (
                  <option key={index} value={t(key, language)}>
                    {t(key, language)}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('pastMedicalProblem', language)}</label>
          <select
            class="form-select form-select-lg"
            value={pastMedical}
            onChange={(e) => setPastMedical(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            {pastMedicalProblemKeys &&
              pastMedicalProblemKeys.map((key, index) => {
                return (
                  <option key={index} value={t(key, language)}>
                    {t(key, language)}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('presentMedicalProblem', language)}</label>
          <select
            class="form-select form-select-lg"
            id="year"
            value={presentMedical}
            onChange={(e) => setPresentMedical(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            {presentMedicalProblemKeys &&
              presentMedicalProblemKeys.map((key, index) => {
                return (
                  <option key={index} value={t(key, language)}>
                    {t(key, language)}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('chronicHealthProblem', language)}</label>
          <select
            value={chronicHealth}
            class="form-select form-select-lg"
            onChange={(e) => setChronicHealth(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            {chronicHealthProblemKeys &&
              chronicHealthProblemKeys.map((key, index) => {
                return (
                  <option key={index} value={t(key, language)}>
                    {t(key, language)}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('pastPsychiatricComplication', language)}</label>
          <select
            class="form-select form-select-lg"
            id="year"
            value={pastPsychatricProblem}
            onChange={(e) => setPastPsychatricProblem(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            {pastPsychatricComplicationKeys &&
              pastPsychatricComplicationKeys.map((key, index) => {
                return (
                  <option key={index} value={t(key, language)}>
                    {t(key, language)}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('presentPsychiatricComplication', language)}</label>
          <select
            class="form-select form-select-lg"
            value={presentPsychatricProblem}
            onChange={(e) => setPresentPsychatricProblem(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            {presentPsychatricComplicationKeys &&
              presentPsychatricComplicationKeys.map((key, index) => {
                return (
                  <option key={index} value={t(key, language)}>
                    {t(key, language)}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('historyOfPreviousHeadInjuries', language)}</label>
          <select
            class="form-select form-select-lg"
            value={previousHeadInjury}
            onChange={(e) => setPreviousHeadInjury(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            {ChoiceKeys &&
              ChoiceKeys.map((key, index) => {
                return (
                  <option key={index} value={t(key, language)}>
                    {t(key, language)}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            {t('allergyKnowledge', language)}
          </label>
          <input
            type="text"
            className="form-control"
            placeholder={t('enterAllergyKnowledge', language)}
            value={allergyKnowledge}
            onChange={(e) => setAllergyKnowledge(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('familyHistory', language)}</label>
          <select
            class="form-select form-select-lg"
            value={familyHistory}
            onChange={(e) => setFamilyHistory(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            {FamilyHistoryKeys &&
              FamilyHistoryKeys.map((key, index) => {
                return (
                  <option key={index} value={t(key, language)}>
                    {t(key, language)}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            {t('specificDrugDetails', language)}
          </label>
          <input
            type="text"
            className="form-control"
            placeholder={t('enterSpecificDrugDetails', language)}
            value={specificDrug}
            onChange={(e) => setSpecificDrug(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            {t('psychiatricIllness', language)}
          </label>
          <input
            type="text"
            className="form-control"
            placeholder={t('psychiatricIllness', language)}
            value={psychiatricIllness}
            onChange={(e) => setPsychiatricIllness(e.target.value)}
          />
        </div>
      </div>

      <div className="row w-100 me-auto ml-auto">
        <div className="col-12">
          <div className="form_buttons">
            <button className="btn btn-primary" onClick={() => setStep(1)}>
              {t('previous', language)}
            </button>

            <button className="btn btn-primary" onClick={() => nextStep()}>
              {t('next', language)}
            </button>

            {/* {prevData ? (
              <button className="btn btn-primary" onClick={() => update()}>
                Update
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => submit()}>
                Submit
              </button>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicInfo2;
