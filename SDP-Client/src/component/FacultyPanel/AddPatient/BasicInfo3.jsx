import React, { useState, useEffect } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { t } from "../../../translations";
import "./AddPatient.scss";

const familyMemberKeys = [
  "father",
  "mother",
  "brother",
  "sister",
  "wife",
  "children",
];

const healthStatusKeys = [
  "majorDepression",
  "suicideAttempted",
  "psychiatricIllnesses",
  "alcoholDependence",
  "drugDependence",
  "anyOtherHealth",
];

const yearOptions = [
  1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001,
  2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013,
  2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
  2026,
];

const sexualProblemKeys = [
  "none",
  "difficultyInOrgasms",
  "reducedLibido",
  "prematureEjaculation",
  "impotency",
  "excessiveSexualUrge",
  "completeAbstinence",
  "anyOtherSexual",
];

const familyViolenceKeys = [
  "noneFamilyViolence",
  "physicalViolence",
  "violentIncidents",
  "breakingArticles",
];

const occupationalDamageKeys = [
  "absenteeism",
  "warningOrMemos",
  "suspensionOrder",
  "dismissalOrder",
  "transferOrder",
  "accidentsOnJob",
  "attendWorkUnderInfluence",
];

const financialDebtKeys = [
  "moneyBorrowedFromFamily",
  "banks",
  "placeOfWork",
  "moneyLenders",
  "shg",
  "pawnShops",
  "liquorShop",
  "handLoan",
  "noneDebt",
];

function BasicInfo3({ prevData, data, setData, setStep, setLoading }) {
   const { language } = useLanguage();

  const [family, setFamily] = useState([]);

  const [familyHealth, setFamilyHealth] = useState([]);

  const [familyObj, setFamilyObj] = useState({
    member: "",
    age: "",
    state_of_health: "",
    year_of_death: "",
    cause_of_death: "",
    age_at_death: "",
  });

  const [familyHealthObj, setFamilyHealthObj] = useState({
    member: "",
    problem: "",
    status: "",
  });

  const addFamily = () => {
    console.log(family);

    setFamily([...family, familyObj]);

    setFamilyObj({
      member: "",
      age: "",
      state_of_health: "",
      year_of_death: "",
      cause_of_death: "",
      age_at_death: "",
    });
  };

  const addFamilyHealth = () => {
    setFamilyHealth([...familyHealth, familyHealthObj]);

    setFamilyHealthObj({
      member: "",
      problem: "",
      status: "",
    });
  };

  const [infoData, setInfoData] = useState({
    extra_marital_experience: "",
    premarital_sexual_encounter: "",
    involved_high_risk_sexual_activity: "",
    sexual_problems: "",
    spouse_name: "",
    spouse_age: "",
    spouse_religion: "",
    spouse_education: "",
    spouse_occupation: "",
    spouse_monthly_income: "",
    marriage_years: "",
    marriage_type: "",
    other_marriage: "",
    marriage_seperation_due_to_addication: "",
    longest_marriage_seperation: "",
    suspicious_of_wife: "",
    family_violence: "",
    occupation_age: "",
    occupation_duration: "",
    occupation_award: "",
    job_change_frequently: "",
    period_of_unemployment: "",
    reason_for_unemployment: "",
    occupational_damage: "",
    financial_debt: "",
    financial_debt_amount: "",
  });

  // Legal history state variables
  const [legalHistory, setLegalHistory] = useState({
    arrested: "",
    arrested_times: "",
    fined_drunken_drive: "",
    fined_drunken_drive_times: "",
    accident_under_influence: "",
    accident_under_influence_times: "",
    assault: "",
    assault_times: "",
    any_other: "",
    any_other_times: "",
  });



  const nextStep = () => {
    const obj = {
      ...infoData,
      ...legalHistory,
      family_history: family,
      family_health_status: familyHealth,
    };

    setData({ ...data, ...obj });
    setStep(4);
  };

  useEffect(() => {
    if (data) {
      const obj = {
        extra_marital_experience: data.extra_marital_experience,
        premarital_sexual_encounter: data.premarital_sexual_encounter,
        involved_high_risk_sexual_activity:
          data.involved_high_risk_sexual_activity,
        sexual_problems: data.sexual_problems,
        spouse_name: data.spouse_name,
        spouse_age: data.spouse_age,
        spouse_religion: data.spouse_religion,
        spouse_education: data.spouse_education,
        spouse_occupation: data.spouse_occupation,
        spouse_monthly_income: data.spouse_monthly_income,
        marriage_years: data.marriage_years,
        marriage_type: data.marriage_type,
        other_marriage: data.other_marriage,
        marriage_seperation_due_to_addication:
          data.marriage_seperation_due_to_addication,
        longest_marriage_seperation: data.longest_marriage_seperation,
        suspicious_of_wife: data.suspicious_of_wife,
        family_violence: data.family_violence,
        occupation_age: data.occupation_age,
        occupation_duration: data.occupation_duration,
        occupation_award: data.occupation_award,
        job_change_frequently: data.job_change_frequently,
        period_of_unemployment: data.period_of_unemployment,
        reason_for_unemployment: data.reason_for_unemployment,
        occupational_damage: data.occupational_damage,
        financial_debt: data.financial_debt,
        financial_debt_amount: data.financial_debt_amount,
      };

      setInfoData({ ...obj });

      setLegalHistory({
        arrested: data.arrested || "",
        arrested_times: data.arrested_times || "",
        fined_drunken_drive: data.fined_drunken_drive || "",
        fined_drunken_drive_times: data.fined_drunken_drive_times || "",
        accident_under_influence: data.accident_under_influence || "",
        accident_under_influence_times: data.accident_under_influence_times || "",
        assault: data.assault || "",
        assault_times: data.assault_times || "",
        any_other: data.any_other || "",
        any_other_times: data.any_other_times || "",
      });

      setFamily(data.family_history ? data.family_history : []);

      setFamilyHealth(data.family_health_status ? data.family_health_status : []);
    }
  }, [data]);

  return (
    <div className="basic-info">
      <div className="header">
        <h2 className="w-100 text-center my-4">{t('familyHistory', language)}</h2>
      </div>

      <h4>{t('familyHistory', language)}</h4>

      {family &&
        family.map((data, key) => {
          return (
            <div className="complaints-table">
              <div className="row">
                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">{t('familyMember', language)}</label>
                  <select
                    class="form-select form-select-lg"
                    id="year"
                    value={data.member}
                  >
                    <option>{t('selectOption', language)}</option>
                    {familyMemberKeys &&
                      familyMemberKeys.map((key, index) => {
                        return (
                          <option key={index} value={t(key, language)}>
                            {t(key, language)}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">{t('age', language)}</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder={t('enterAgePlaceholder', language)}
                    value={data.age}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">{t('stateOfHealth', language)}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t('enterStateOfHealthPlaceholder', language)}
                    value={data.state_of_health}
                  />
                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">{t('yearOfDeath', language)}</label>
                  <select
                    class="form-select form-select-lg"
                    value={data?.year_of_death}
                  >
                    <option>{t('selectOption', language)}</option>
                    {yearOptions.map((data, key) => {
                      return <option value={data}>{data}</option>;
                    })}
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">{t('causeOfDeath', language)}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t('enterCauseOfDeathPlaceholder', language)}
                    value={data.cause_of_death}
                  />
                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">{t('ageAtDeath', language)}</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder={t('enterAgeAtDeathPlaceholder', language)}
                    value={data.age_at_death}
                  />
                </div>
              </div>
              <hr />
            </div>
          );
        })}

      <div className="complaints mt-3">
        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('familyMember', language)}</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={familyObj.member}
              onChange={(e) =>
                setFamilyObj({ ...familyObj, member: e.target.value })
              }
            >
              <option>{t('selectOption', language)}</option>
              {familyMemberKeys &&
                familyMemberKeys.map((key, index) => {
                  return (
                    <option key={index} value={t(key, language)}>
                      {t(key, language)}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('age', language)}</label>
            <input
              type="number"
              className="form-control"
              placeholder={t('enterAgePlaceholder', language)}
              value={familyObj.age}
              onChange={(e) =>
                setFamilyObj({ ...familyObj, age: e.target.value })
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('stateOfHealth', language)}</label>
            <input
              type="text"
              className="form-control"
              placeholder={t('enterStateOfHealthPlaceholder', language)}
              value={familyObj.state_of_health}
              onChange={(e) =>
                setFamilyObj({ ...familyObj, state_of_health: e.target.value })
              }
            />
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('yearOfDeath', language)}</label>
            <select
              class="form-select form-select-lg"
              value={familyObj?.year_of_death}
              onChange={(e) =>
                setFamilyObj({ ...familyObj, year_of_death: e.target.value })
              }
            >
              <option>{t('selectOption', language)}</option>
              {yearOptions.map((data, key) => {
                return <option value={data}>{data}</option>;
              })}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('causeOfDeath', language)}</label>
            <input
              type="text"
              className="form-control"
              placeholder={t('enterCauseOfDeathPlaceholder', language)}
              value={familyObj?.cause_of_death}
              onChange={(e) =>
                setFamilyObj({ ...familyObj, cause_of_death: e.target.value })
              }
            />
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('ageAtDeath', language)}</label>
            <input
              type="number"
              className="form-control"
              placeholder={t('enterAgeAtDeathPlaceholder', language)}
              value={familyObj?.age_at_death}
              onChange={(e) =>
                setFamilyObj({ ...familyObj, age_at_death: e.target.value })
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <button className="btn_form" onClick={() => addFamily()}>
              + Add
            </button>
          </div>
        </div>
      </div>

      <hr className="my-3" />

      <h4>{t('healthStatusOfFamily', language)}</h4>

      {familyHealth &&
        familyHealth.map((data, key) => {
          return (
            <div className="complaints-table">
              <div className="row">
                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">{t('relation', language)}</label>
                  <select
                    class="form-select form-select-lg"
                    id="year"
                    value={data.member}
                  >
                    <option>{t('selectOption', language)}</option>
                    {familyMemberKeys &&
                      familyMemberKeys.map((key, index) => {
                        return (
                          <option key={index} value={t(key, language)}>
                            {t(key, language)}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">{t('healthProblem', language)}</label>
                  <select
                    class="form-select form-select-lg"
                    id="year"
                    value={data.problem}
                  >
                    <option>{t('selectOption', language)}</option>
                    {healthStatusKeys &&
                      healthStatusKeys.map((key, index) => {
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
                  <label className="input-lebel">{t('status', language)}</label>
                  <select
                    class="form-select form-select-lg"
                    id="year"
                    value={data.status}
                  >
                    <option>{t('selectOption', language)}</option>
                    <option value={t('yes', language)}>{t('yes', language)}</option>
                    <option value={t('no', language)}>{t('no', language)}</option>
                    <option value={t('dontKnow', language)}>{t('dontKnow', language)}</option>
                  </select>
                </div>
              </div>
              <hr />
            </div>
          );
        })}

      <div className="complaints mt-3">
        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('relation', language)}</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={familyHealthObj.member}
              onChange={(e) =>
                setFamilyHealthObj({
                  ...familyHealthObj,
                  member: e.target.value,
                })
              }
            >
              <option>{t('selectOption', language)}</option>
              {familyMemberKeys &&
                familyMemberKeys.map((key, index) => {
                  return (
                    <option key={index} value={t(key, language)}>
                      {t(key, language)}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('healthProblem', language)}</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={familyHealthObj.problem}
              onChange={(e) =>
                setFamilyHealthObj({
                  ...familyHealthObj,
                  problem: e.target.value,
                })
              }
            >
              <option>{t('selectOption', language)}</option>
              {healthStatusKeys &&
                healthStatusKeys.map((key, index) => {
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
            <label className="input-lebel">{t('status', language)}</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={familyHealthObj.status}
              onChange={(e) =>
                setFamilyHealthObj({
                  ...familyHealthObj,
                  status: e.target.value,
                })
              }
            >
              <option>{t('selectOption', language)}</option>
              <option value={t('yes', language)}>{t('yes', language)}</option>
              <option value={t('no', language)}>{t('no', language)}</option>
              <option value={t('dontKnow', language)}>{t('dontKnow', language)}</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button className="btn_form" onClick={() => addFamilyHealth()}>
              + Add
            </button>
          </div>
        </div>
      </div>

      <hr className="my-3" />

      <h2>{t('sexualHistory', language)}</h2>

      <div className="sexual_history">
        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
                          {t('recordExtraMaritalExperiences', language)}
                        </label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.extra_marital_experience}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  extra_marital_experience: e.target.value,
                })
              }
            >
              <option>{t('selectOption', language)}</option>
              <option value={t('present', language)}>{t('present', language)}</option>
              <option value={t('absent', language)}>{t('absent', language)}</option>
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
                          {t('ifUnmarriedPremaritalSexualEncounters', language)}
                        </label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.premarital_sexual_encounter}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  premarital_sexual_encounter: e.target.value,
                })
              }
            >
              <option>{t('selectOption', language)}</option>
              <option value={t('yes', language)}>{t('yes', language)}</option>
              <option value={t('no', language)}>{t('no', language)}</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
                          {t('involvedHighRiskSexualActivity', language)}
                        </label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.involved_high_risk_sexual_activity}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  involved_high_risk_sexual_activity: e.target.value,
                })
              }
            >
              <option>{t('selectOption', language)}</option>
              <option value={t('yes', language)}>{t('yes', language)}</option>
              <option value={t('no', language)}>{t('no', language)}</option>
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
                          {t('atPresentSexualProblems', language)}
                        </label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.sexual_problems}
              onChange={(e) =>
                setInfoData({ ...infoData, sexual_problems: e.target.value })
              }
            >
              <option>{t('selectOption', language)}</option>
              {sexualProblemKeys?.map((key, index) => {
                return (
                  <option key={index} value={t(key, language)}>
                    {t(key, language)}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      <hr className="my-3" />

      <h2>{t('maritalHistory', language)}</h2>

      <div className="marital_history">
        <h4>{t('detailsRegardingSpouse', language)}</h4>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('name', language)}</label>
            <input
              type="text"
              className="form-control"
              placeholder={t('enterSpouseNamePlaceholder', language)}
              value={infoData.spouse_name}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  spouse_name: e.target.value,
                })
              }
            />
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('age', language)}</label>
            <input
              type="text"
              className="form-control"
              placeholder={t('enterSpouseAgePlaceholder', language)}
              value={infoData.spouse_age}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  spouse_age: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('religionCommunity', language)}</label>
            <input
              type="text"
              className="form-control"
              placeholder={t('enterReligionCommunityPlaceholder', language)}
              value={infoData.spouse_religion}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  spouse_religion: e.target.value,
                })
              }
            />
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('education', language)}</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.spouse_education}
              onChange={(e) =>
                setInfoData({ ...infoData, spouse_education: e.target.value })
              }
            >
              <option>{t('selectOption', language)}</option>
              <option value={t('graduate', language)}>{t('graduate', language)}</option>
              <option value={t('intermediate', language)}>{t('intermediate', language)}</option>
              <option value={t('matric', language)}>{t('matric', language)}</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('occupation', language)}</label>
            <input
              type="text"
              className="form-control"
              placeholder={t('enterSpouseOccupationPlaceholder', language)}
              value={infoData.spouse_occupation}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  spouse_occupation: e.target.value,
                })
              }
            />
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('monthlyIncome', language)}</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.spouse_monthly_income}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  spouse_monthly_income: e.target.value,
                })
              }
            >
              <option>{t('selectOption', language)}</option>
              <option value={t('monthlyIncomeOption1', language)}>{t('monthlyIncomeOption1', language)}</option>
              <option value="50000 - 100000">₹50,000 - ₹100,000</option>
              <option value="more than 100000">more than ₹100,000</option>
            </select>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('numberOfYearsOfMarriage', language)}</label>
            <input
              type="number"
              className="form-control"
              placeholder={t('enterNumberOfYearsOfMarriagePlaceholder', language)}
              value={infoData.marriage_years}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  marriage_years: e.target.value,
                })
              }
            />
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('marriageType', language)}</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.marriage_type}
              onChange={(e) =>
                setInfoData({ ...infoData, marriage_type: e.target.value })
              }
            >
              <option>{t('selectOption', language)}</option>
              <option value={t('love', language)}>{t('love', language)}</option>
              <option value={t('arrange', language)}>{t('arrange', language)}</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
                          {t('previousOrSubsequentMarriages', language)}
                        </label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.other_marriage}
              onChange={(e) =>
                setInfoData({ ...infoData, other_marriage: e.target.value })
              }
            >
              <option>{t('selectOption', language)}</option>
              <option value={t('yes', language)}>{t('yes', language)}</option>
              <option value={t('no', language)}>{t('no', language)}</option>
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
                          {t('separatedFromSpouseDueToAddiction', language)}
                        </label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.marriage_seperation_due_to_addication}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  marriage_seperation_due_to_addication: e.target.value,
                })
              }
            >
              <option>{t('selectOption', language)}</option>
              <option value={t('yes', language)}>{t('yes', language)}</option>
              <option value={t('no', language)}>{t('no', language)}</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('periodOfLongestSeparation', language)}</label>
            <input
              type="number"
              className="form-control"
              placeholder={t('enterPeriodOfLongestSeparationPlaceholder', language)}
              value={infoData.longest_marriage_seperation}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  longest_marriage_seperation: e.target.value,
                })
              }
            />
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('suspiciousOfWife', language)}</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.suspicious_of_wife}
              onChange={(e) =>
                setInfoData({ ...infoData, suspicious_of_wife: e.target.value })
              }
            >
              <option>{t('selectOption', language)}</option>
              <option value={t('yes', language)}>{t('yes', language)}</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
                          {t('anyInstanceOfFamilyViolence', language)}
                        </label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.family_violence}
              onChange={(e) =>
                setInfoData({ ...infoData, family_violence: e.target.value })
              }
            >
              <option>{t('selectOption', language)}</option>
              {familyViolenceKeys?.map((key, index) => {
                return (
                  <option key={index} value={t(key, language)}>
                    {t(key, language)}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      <hr className="my-3" />

      <h2>{t('occupationalHistory', language)}</h2>

      <div className="occupational_history">
        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
                          {t('whatAgeDidYouStartWorking', language)}
                        </label>
            <input
              type="text"
              className="form-control"
              placeholder={t('enterAgePlaceholder', language)}
              value={infoData.occupation_age}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  occupation_age: e.target.value,
                })
              }
            />
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
                          {t('howLongHaveYouBeenWorking', language)}
                        </label>
            <input
              type="text"
              className="form-control"
              placeholder={t('enterNumberOfYearsPlaceholder', language)}
              value={infoData.occupation_duration}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  occupation_duration: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
                          {t('receivedSpecialAward', language)}
                        </label>
            <input
              type="text"
              className="form-control"
              placeholder={t('enterNumberOfTimesPlaceholder', language)}
              value={infoData.occupation_award}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  occupation_award: e.target.value,
                })
              }
            />
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
                          {t('didYouChangeJobFrequently', language)}
                        </label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.job_change_frequently}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  job_change_frequently: e.target.value,
                })
              }
            >
              <option>{t('selectOption', language)}</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
                          {t('didYouHavePeriodOfUnemployment', language)}
                        </label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.period_of_unemployment}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  period_of_unemployment: e.target.value,
                })
              }
            >
              <option>{t('selectOption', language)}</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('reasonForUnemployment', language)}</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.reason_for_unemployment}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  reason_for_unemployment: e.target.value,
                })
              }
            >
              <option>{t('selectOption', language)}</option>
              <option value={t('yes', language)}>{t('yes', language)}</option>
              <option value={t('no', language)}>{t('no', language)}</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('occupationalDamage', language)}</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.occupational_damage}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  occupational_damage: e.target.value,
                })
              }
            >
              <option>{t('selectOption', language)}</option>
              {occupationalDamageKeys?.map((key, index) => {
                return <option key={index} value={t(key, language)}>{t(key, language)}</option>;
              })}
            </select>
          </div>
        </div>

        <hr />
      </div>

      <h2>{t('financialHistory', language)}</h2>

      <div className="financial_history">
        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
                          {t('detailsOfDebts', language)}
                        </label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.financial_debt}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  financial_debt: e.target.value,
                })
              }
            >
              <option>{t('selectOption', language)}</option>
              {financialDebtKeys?.map((key, index) => {
                return <option key={index} value={t(key, language)}>{t(key, language)}</option>;
              })}
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('debtAmount', language)}</label>
            <input
              type="number"
              className="form-control"
              placeholder={t('enterDebtAmountPlaceholder', language)}
              value={infoData.financial_debt_amount}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  financial_debt_amount: e.target.value,
                })
              }
            />
          </div>
        </div>
        <hr />
      </div>

      <h2>{t('legalHistory', language)}</h2>

      <h4>{t('haveYouGotIntoTroubleWithLaw', language)}</h4>

      <div className="legal_history">
        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('arrestedFor', language)}</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={legalHistory.arrested}
              onChange={(e) =>
                setLegalHistory({
                  ...legalHistory,
                  arrested: e.target.value,
                })
              }
            >
              <option>{t('selectOption', language)}</option>
              <option value={t('drunken', language)}>{t('drunken', language)}</option>
              <option value={t('drugInfluencedBehavior', language)}>
                {t('drugInfluencedBehavior', language)}
              </option>
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('noOfTimes', language)}</label>
            <input
              type="text"
              className="form-control"
              placeholder={t('enterNumberOfTimesPlaceholder', language)}
              value={legalHistory.arrested_times}
              onChange={(e) =>
                setLegalHistory({
                  ...legalHistory,
                  arrested_times: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('finedForDrunkenDrive', language)}</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={legalHistory.fined_drunken_drive}
              onChange={(e) =>
                setLegalHistory({
                  ...legalHistory,
                  fined_drunken_drive: e.target.value,
                })
              }
            >
              <option>{t('selectOption', language)}</option>
              <option value={t('yes', language)}>{t('yes', language)}</option>
              <option value={t('no', language)}>{t('no', language)}</option>
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('noOfTimes', language)}</label>
            <input
              type="text"
              className="form-control"
              placeholder={t('enterNumberOfTimesPlaceholder', language)}
              value={legalHistory.fined_drunken_drive_times}
              onChange={(e) =>
                setLegalHistory({
                  ...legalHistory,
                  fined_drunken_drive_times: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
                          {t('hadAccidentUnderInfluence', language)}
                        </label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={legalHistory.accident_under_influence}
              onChange={(e) =>
                setLegalHistory({
                  ...legalHistory,
                  accident_under_influence: e.target.value,
                })
              }
            >
              <option>{t('selectOption', language)}</option>
              <option value={t('alcohol', language)}>{t('alcohol', language)}</option>
              <option value={t('drug', language)}>{t('drug', language)}</option>
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('noOfTimes', language)}</label>
            <input
              type="text"
              className="form-control"
              placeholder={t('enterNumberOfTimesPlaceholder', language)}
              value={legalHistory.accident_under_influence_times}
              onChange={(e) =>
                setLegalHistory({
                  ...legalHistory,
                  accident_under_influence_times: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('assault', language)}</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={legalHistory.assault}
              onChange={(e) =>
                setLegalHistory({
                  ...legalHistory,
                  assault: e.target.value,
                })
              }
            >
              <option>{t('selectOption', language)}</option>
              <option value={t('yes', language)}>{t('yes', language)}</option>
              <option value={t('no', language)}>{t('no', language)}</option>
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('noOfTimes', language)}</label>
            <input
              type="text"
              className="form-control"
              placeholder={t('enterNumberOfTimesPlaceholder', language)}
              value={legalHistory.assault_times}
              onChange={(e) =>
                setLegalHistory({
                  ...legalHistory,
                  assault_times: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('anyOther', language)}</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={legalHistory.any_other}
              onChange={(e) =>
                setLegalHistory({
                  ...legalHistory,
                  any_other: e.target.value,
                })
              }
            >
              <option>{t('selectOption', language)}</option>
              <option value={t('yes', language)}>{t('yes', language)}</option>
              <option value={t('no', language)}>{t('no', language)}</option>
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('noOfTimes', language)}</label>
            <input
              type="text"
              className="form-control"
              placeholder={t('enterSpecialAwardPlaceholder', language)}
              value={legalHistory.any_other_times}
              onChange={(e) =>
                setLegalHistory({
                  ...legalHistory,
                  any_other_times: e.target.value,
                })
              }
            />
          </div>
        </div>

        <hr />
      </div>

      <div className="row w-100 me-auto ml-auto">
        <div className="col-12">
          <div className="form_buttons">
            <button className="btn btn-primary" onClick={() => setStep(2)}>
              Prev
            </button>

            <button className="btn btn-primary" onClick={() => nextStep()}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicInfo3;
