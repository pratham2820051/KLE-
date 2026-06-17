import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { t } from "../../../translations";
import "./AddPatient.scss";



const districtKeys = [
  "districtBagalkot",
  "districtBallari",
  "districtBelagavi",
  "districtBengaluruRural",
  "districtBengaluruUrban",
  "districtBidar",
  "districtChamarajanagar",
  "districtChikballapur",
  "districtChikkamagaluru",
  "districtChitradurga",
  "districtDakshinaKannada",
  "districtDavangere",
  "districtDharwad",
  "districtGadag",
  "districtHassan",
  "districtHaveri",
  "districtKalaburagi",
  "districtKodagu",
  "districtKolar",
  "districtKoppal",
  "districtMandya",
  "districtMysuru",
  "districtRaichur",
  "districtRamanagara",
  "districtShivamogga",
  "districtTumakuru",
  "districtUdupi",
  "districtUttaraKannada",
  "districtVijayapura",
  "districtYadgir",
];

const yearOptions = [
  1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001,
  2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013,
  2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
  2026,
];

function BasicInfo({ setData, setStep, data }) {
  const { language } = useLanguage();

  const annualInc = [
    t('annualIncomeOption1', language),
    t('annualIncomeOption2', language),
    t('annualIncomeOption3', language),
    t('annualIncomeOption4', language),
  ];

  const maritalStat = [t('single', language), t('married', language), t('divorced', language)];



  const livingArrangementOptions = [t('family', language), t('friends', language), t('relatives', language), t('alone', language)];

  const drugTypeOption = [
    t('depressants', language),
    t('narcoticAnalgesic', language),
    t('cannabis', language),
    t('stimulants', language),
    t('hallucinogens', language),
    t('inhalants', language),
    t('substanceNotClassified', language),
  ];

  const drugFrequencyOptions = [t('morning', language), t('afternoon', language), t('evening', language)];

  const referralOptions = [
    t('self', language),
    t('referralFriends', language),
    t('referralFamily', language),
    t('referralDoctors', language),
    t('referralMedia', language),
    t('referralDoctors', language),
    t('referralEmployer', language),
    t('referralNavaJeevanSamithi', language),
    t('referralAwarenessProgramme', language),
  ];

  const reasonStartOptions = [
    t('reasonStartTry', language),
    t('reasonStartFamilyFriends', language),
    t('reasonStartFeelBetter', language),
    t('reasonStartAvoidProblems', language),
    t('reasonStartOther', language),
  ];

  const reasonContinueOptions = [
    t('reasonContinueLikedEffect', language),
    t('reasonContinueFriendsForced', language),
    t('reasonContinueConfidence', language),
    t('reasonContinueCraving', language),
    t('reasonContinueRelaxed', language),
  ];

  const stressorsOptions = [
    t('stressorsFamilyIssues', language),
    t('stressorsFinancial', language),
    t('stressorsWork', language),
    t('stressorsReportsStressed', language),
    t('stressorsOther', language),
  ];

  //formData
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [sex, setSex] = useState(null);
  const [address, setAddress] = useState(null);
  const [district, setDistrict] = useState(null);
  const [taluk, setTaluk] = useState(null);
  const [phone, setPhone] = useState(null);
  const [community, setCommunity] = useState(null);
  const [educationYear, setEducationYear] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [annualIncome, setAnnualIncome] = useState(null);
  const [maritalStatus, setMaritalStatus] = useState(null);
  const [livingArrangement, setLivingArrangement] = useState(null);
  const [referral, setReferral] = useState(null);

  const [reasonStart, setReasonStart] = useState(null);
  const [reasonContinue, setReasonContinue] = useState(null);
  const [stressors, setStressors] = useState(null);
  const [qtyLastUse, setQtyLastUse] = useState(null);
  const [dateLastUse, setDateLastUse] = useState(null);
  const [impression, setImpression] = useState(null);
  const [denialSubstance, setDenialSubstance] = useState(null);
  const [motivationFactor, setMotivationFactor] = useState(null);
  const [willingness, setWillingness] = useState(null);
  const [actionTaken, setActionTaken] = useState(null);

  const [complaints, setComplaints] = useState([]);

  const [drugOption, setDrugOption] = useState([]);

  const [drugType, setDrugType] = useState();
  const [drug, setDrug] = useState();
  const [drugAgeFirst, setDrugAgeFirst] = useState();
  const [drugYearUse, setDrugYearUse] = useState();
  const [drugYearExessive, setDrugYearExessive] = useState();
  const [drugFrequency, setDrugFrequency] = useState();
  const [drugQuantity, setDrugQuantity] = useState();
  const [routeStration, setRouteStration] = useState();

  const [allocated] = useState("no");
  const [aadhar, setAadhar] = useState();
  const [joiningDate, setJoiningDate] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");

  useEffect(() => {
    switch (drugType) {
      case t('depressants', language):
        setDrugOption(["Alcohol", "Tranquilizers", "Sedatives", "Hypnotics"]);
        break;

      case t('narcoticAnalgesic', language):
        setDrugOption([
          "Opium",
          "Heroin",
          "Brown Sugar",
          "Morphine",
          "Codeine",
          "Pentazocine",
          "Buprenorphine",
        ]);
        break;
      case t('cannabis', language):
        setDrugOption(["Ganja", "Charas", "Hashish", "Bhang"]);
        break;
      case t('stimulants', language):
        setDrugOption(["Amphetamine", "Cocaine", "Ecstasy"]);
        break;
      case t('hallucinogens', language):
        setDrugOption(["LSD", "PCP"]);
        break;

      case t('inhalants', language):
        setDrugOption([
          "Petrol",
          "Glue",
          "whitener",
          "thinner",
          "grease",
          "nail polish",
        ]);
        break;

      case t('substanceNotClassified', language):
        setDrugOption([
          "Cough Syrup",
          "Anti histamine",
          "Antidepressant",
          "Antipsychotic",
          "Smoking and Chewing",
        ]);
        break;
      default:
        setDrugOption([]);
    }
  }, [drugType, language]);



  const nextStep = () => {
    try {
      // First validate required fields
      if (!name) {
        toast.error(t('fieldRequired', language));
        return;
      }

      if (!age) {
        toast.error(t('fieldRequired', language));
        return;
      }

      if (!sex) {
        toast.error(t('fieldRequired', language));
        return;
      }

      if (!address) {
        toast.error(t('fieldRequired', language));
        return;
      }

      if (!district) {
        toast.error(t('fieldRequired', language));
        return;
      }

      if (!aadhar) {
        toast.error(t('fieldRequired', language));
        return;
      }

      if (!phone) {
        toast.error(t('fieldRequired', language));
        return;
      }

      // Add complaints if drug fields are filled
      if (drugType && drug && drugFrequency && drugQuantity) {
        addComplaints();
      }

      const obj = {
        patientId: 0,
        aadharNumber: aadhar,
        allocated: allocated,
        name: name,
        age: age,
        sex: sex,
        address: address,
        district: district,
        taluk: taluk,
        phone: phone,
        community: community,
        education_in_year: educationYear,
        occupation: occupation,
        annual_income: annualIncome,
        marital_status: maritalStatus,
        living_arrangement: livingArrangement,
        referral: referral,
        complaints: complaints,
        reason_start: reasonStart,
        reason_continue: reasonContinue,
        stressors: stressors,
        last_use_date: dateLastUse,
        last_use_quantity: qtyLastUse,
        impression_of_camp_officer: impression,
        denial_of_substance_use_related_problems: denialSubstance,
        motivation_factor: motivationFactor,
        willingness_for_treatment: willingness,
        action_taken: actionTaken,
        joining_date: joiningDate || new Date().toISOString().split("T")[0],
        discharge_date: dischargeDate || null,
      };
      console.log("Next step data:", obj);

      setData({ ...data, ...obj });
      setStep(2);
    } catch (error) {
      console.error("Error in nextStep:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const addComplaints = () => {
    // Only add complaints if all required drug fields are filled
    if (!drugType || !drug || !drugFrequency || !drugQuantity) {
      return;
    }

    const obj = {
      drug_type: drugType,
      drug: drug,
      age_of_first_use: drugAgeFirst,
      year_use: drugYearUse,
      year_excessive_use: drugYearExessive,
      frequency_last_30_days: drugFrequency,
      quantity_last_30_days: drugQuantity,
      route_stration: routeStration,
    };

    const arr = [...complaints]; // Create a new array instead of mutating
    arr.push(obj);
    setComplaints(arr);

    // Clear the form fields after adding
    setDrug("");
    setDrugAgeFirst("");
    setDrugYearUse("");
    setDrugYearExessive("");
    setDrugFrequency("");
    setDrugQuantity("");
    setRouteStration("");

    console.log("Array : ", arr);
  };

  useEffect(() => {
    if (data) {
      setName(data?.name);
      setAge(data?.age);
      setSex(data?.sex);
      setAddress(data?.address);
      setTaluk(data?.taluk);
      setPhone(data?.phone);
      setCommunity(data?.community);
      setEducationYear(data?.education_in_year);
      setOccupation(data?.occupation);
      setAnnualIncome(data?.annual_income);
      setMaritalStatus(data?.marital_status);
      setLivingArrangement(data?.living_arrangement);
      setReferral(data?.referral || data?.refferal);
      setComplaints(data?.complaints);
      setReasonStart(data?.reason_start);
      setReasonContinue(data?.reason_continue);
      setStressors(data?.stressors);
      setQtyLastUse(data?.last_use_quantity);
      setDateLastUse(data?.last_use_date);
      setImpression(data?.impression_of_camp_officer);
      setDenialSubstance(data?.denial_of_substance_use_related_problems);
      setMotivationFactor(data?.motivation_factor);
      setWillingness(data?.willingness_for_treatment);
      setActionTaken(data?.action_taken);
      setAadhar(data?.aadharNumber);
      setDistrict(data?.district || data?.disctrict);
      setJoiningDate(data?.joining_date ? data.joining_date.split("T")[0] : "");
      setDischargeDate(data?.discharge_date ? data.discharge_date.split("T")[0] : "");
    }
  }, [data]);



  return (
    <div className="basic-info">
      <div className="header">
        <h2 className="w-100 text-center my-4">{t('basicInfo', language)}</h2>
      </div>
      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            {t('name', language)} <span className="imp-mark">*</span>{" "}
          </label>
          <input
            type="text"
            className="form-control"
            placeholder={t('name', language)}
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            {t('age', language)} <span className="imp-mark">*</span>
          </label>
          <input
            type="number"
            className="form-control"
            placeholder={t('age', language)}
            defaultValue={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 col-sm-12 mb-3">
          <label className="input-lebel" htmlFor="sex">
            {t('gender', language)} <span className="imp-mark">*</span>
          </label>
          <select
            value={sex}
            className="form-select form-select-lg"
            onChange={(e) => setSex(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            <option value="male">{t('male', language)}</option>
            <option value="female">{t('female', language)}</option>
            <option value="others">{t('other', language)}</option>
          </select>
        </div>

        <div className="col-lg-6 col-sm-12 mb-3">
          <label className="input-lebel" htmlFor="district">
            {t('district', language)} <span className="imp-mark">*</span>
          </label>
          <select
            value={district}
            className="form-select form-select-lg"
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            {districtKeys
              ? districtKeys.map((key, index) => {
                  return <option key={index} value={t(key, language)}>{t(key, language)}</option>;
                })
              : null}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6 ">
          <label className="input-lebel">
            {t('address', language)} <span className="imp-mark">*</span>
          </label>
          <textarea
            value={address}
            className="form-control"
            onChange={(e) => setAddress(e.target.value)}
            placeholder={t('address', language)}
          ></textarea>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6 ">
          <label className="input-lebel">
            {t('aadharNumber', language)} <span className="imp-mark">*</span>
          </label>
          <input
            value={aadhar}
            name="aadhar"
            type="text"
            className="form-control"
            placeholder={t('aadharNumber', language)}
            onChange={(e) => setAadhar(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            Joining Date <span className="imp-mark">*</span>
          </label>
          <input
            type="date"
            className="form-control"
            value={joiningDate}
            onChange={(e) => setJoiningDate(e.target.value)}
          />
        </div>
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Discharge Date</label>
          <input
            type="date"
            className="form-control"
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('taluk', language)}</label>
          <input
            value={taluk}
            type="text"
            className="form-control"
            placeholder={t('taluk', language)}
            onChange={(e) => setTaluk(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            {t('phoneNumber', language)} <span className="imp-mark">*</span>
          </label>
          <input
            value={phone}
            type="tel"
            className="form-control"
            placeholder={t('phoneNumber', language)}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('community', language)}</label>
          <input
            value={community}
            type="text"
            className="form-control"
            placeholder={t('community', language)}
            onChange={(e) => setCommunity(e.target.value)}
          />
        </div>

        {/* <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Education in Year</label>
          <select
            value={educationYear}
            className="form-select form-select-lg"
            onChange={(e) => setEducationYear(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            {yearOptions.map((data, key) => {
              return <option key={`year-${key}`} value={data}>{data}</option>;
            })}
          </select>
        </div> */}
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('occupation', language)}</label>
          <input
            type="text"
            value={occupation}
            className="form-control"
            placeholder={t('occupation', language)}
            onChange={(e) => setOccupation(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('annualIncome', language)}</label>
          <select
            value={annualIncome}
            class="form-select form-select-lg"
            id="year"
            onChange={(e) => setAnnualIncome(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            {annualInc &&
              annualInc.map((data, key) => {
                return (
                  <option key={`annual-${key}`} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('maritalStatus', language)}</label>
          <select
            class="form-select form-select-lg"
            value={maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            {maritalStat &&
              maritalStat.map((data, key) => {
                return (
                  <option key={`marital-${key}`} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('livingArrangement', language)}</label>
          <select
            class="form-select form-select-lg"
            id="year"
            value={livingArrangement}
            onChange={(e) => setLivingArrangement(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            {livingArrangementOptions &&
              livingArrangementOptions.map((data, key) => {
                return (
                  <option key={`living-${key}`} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      <div className="row d-flex align-items-center">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('referral', language)}</label>
          <select
            class="form-select form-select-lg"
            value={referral}
            onChange={(e) => setReferral(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            {referralOptions &&
              referralOptions.map((data, key) => {
                return (
                  <option key={`referral-${key}`} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      <hr />
      <h4>{t('presentingComplaints', language)}</h4>

      {complaints &&
        complaints.map((data, key) => {
          return (
            <div className="complaints-table mb-3">
              <div className="row">
                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">{t('drugType', language)}</label>
                  {console.log(complaints[key])}
                  <select
                    class="form-select form-select-lg"
                    id="year"
                    value={data.drug}
                  >
                    <option>{complaints[key]?.drug_type}</option>
                    {drugTypeOption &&
                      drugTypeOption.map((data, key) => {
                        return (
                          <option key={`drug-type-${key}`} value={data}>
                            {data}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">{t('drug', language)}</label>
                  <select
                    class="form-select form-select-lg"
                    id="year"
                    value={data.drug}
                  >
                    <option>{complaints[key]?.drug}</option>
                    {drugOption &&
                      drugOption.map((data, key) => {
                        return (
                          <option key={`drug-${key}`} value={data}>
                            {data}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">{t('ageOfFirstUse', language)}</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder={t('enterCommunity', language)}
                    value={data.age_of_first_use}
                  />
                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">{t('yearOfUse', language)}</label>
                  <select
                    class="form-select form-select-lg"
                    value={data?.year_use}
                  >
                    <option>{t('selectOption', language)}</option>
                    {yearOptions.map((data, key) => {
                      return <option key={`year-use-${key}`} value={data}>{data}</option>;
                    })}
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">{t('yearOfExcessiveUse', language)}</label>
                  <select
                    class="form-select form-select-lg"
                    id="year"
                    value={data?.year_excessive_use}
                  >
                    <option>{t('selectOption', language)}</option>
                    {yearOptions.map((data, key) => {
                      return <option key={`year-excessive-use-${key}`} value={data}>{data}</option>;
                    })}
                  </select>
                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">{t('routeOfAdministration', language)}</label>
                  <select
                    class="form-select form-select-lg"
                    id="year"
                    value={data.route_stration}
                  >
                    <option>{t('selectOption', language)}</option>
                    <option value="orally">{t('orally', language)}</option>
                    <option value="injected">{t('injected', language)}</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">
                    {t('frequencyOfUseLast30Days', language)}
                  </label>
                  <select
                    class="form-select form-select-lg"
                    id="year"
                    value={data.frequency_last_30_days}
                  >
                    <option>{t('selectOption', language)}</option>
                    {drugFrequencyOptions?.map((dat, key) => {
                      return <option key={`frequency-${key}`} value={dat}>{dat}</option>;
                    })}
                  </select>
                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">
                    {t('quantityUsedLast30Days', language)}
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder={t('enterQuantity', language)}
                    value={data.quantity_last_30_days}
                  />
                </div>
              </div>

              <hr />
            </div>
          );
        })}

      <div className="complaints ">
        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('drugTypeLabel', language)}</label>
            <select
              class="form-select form-select-lg"
              value={drugType}
              onChange={(e) => setDrugType(e.target.value)}
            >
              <option>{t('selectOption', language)}</option>
              {drugTypeOption &&
                drugTypeOption.map((data, key) => {
                  return (
                    <option key={key} value={data}>
                      {data}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('drugLabel', language)}</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={drug}
              onChange={(e) => setDrug(e.target.value)}
            >
              <option>{t('selectOption', language)}</option>
              {drugOption &&
                drugOption.map((data, key) => {
                  return (
                    <option key={`drug-option-${key}`} value={data}>
                      {data}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('ageOfFirstUseLabel', language)}</label>
            <input
              type="number"
              className="form-control"
              value={drugAgeFirst}
              placeholder={t('enterAgeFirstUse', language)}
              onChange={(e) => setDrugAgeFirst(e.target.value)}
            />
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('yearOfUseLabel', language)}</label>
            <select
              class="form-select form-select-lg"
              value={drugYearUse}
              onChange={(e) => setDrugYearUse(e.target.value)}
            >
              <option>{t('selectOption', language)}</option>
              {yearOptions.map((data, key) => {
                return <option key={`year-${key}`} value={data}>{data}</option>;
              })}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('yearOfExcessiveUseLabel', language)}</label>
            <select
              class="form-select form-select-lg"
              value={drugYearExessive}
              onChange={(e) => setDrugYearExessive(e.target.value)}
            >
              <option>{t('selectOption', language)}</option>
              {yearOptions.map((data, key) => {
                return <option key={`year-excessive-${key}`} value={data}>{data}</option>;
              })}
            </select>
          </div>
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">{t('routeOfAdministrationLabel', language)}</label>
            <select
              class="form-select form-select-lg"
              value={routeStration}
              onChange={(e) => setRouteStration(e.target.value)}
            >
              <option>{t('selectOption', language)}</option>
              <option value="orally">{t('orally', language)}</option>
              <option value="injected">{t('injected', language)}</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
              {t('frequencyOfUseLast30DaysLabel', language)}
            </label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={drugFrequency}
              onChange={(e) => {
                setDrugFrequency(e.target.value);
              }}
            >
              <option>{t('selectOption', language)}</option>
              {drugFrequencyOptions?.map((dat, key) => {
                return <option key={`drug-freq-${key}`} value={dat}>{dat}</option>;
              })}
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
              {t('quantityUsedLast30DaysLabel', language)}
            </label>
            <input
              type="number"
              className="form-control"
              value={drugQuantity}
              placeholder={t('enterQuantity', language)}
              onChange={(e) => setDrugQuantity(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-2 ">
            <button className="btn_form" onClick={() => addComplaints()}>
              {t('addLine', language)}
            </button>
          </div>
        </div>
      </div>

      <br />

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('reasonForStarting', language)}</label>
          <select
            class="form-select form-select-lg"
            value={reasonStart}
            onChange={(e) => setReasonStart(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            {reasonStartOptions.map((data, key) => {
              return <option key={`reason-start-${key}`} value={data}>{data}</option>;
            })}
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('reasonForContinuing', language)}</label>
          <select
            value={reasonContinue}
            class="form-select form-select-lg"
            onChange={(e) => setReasonContinue(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            {reasonContinueOptions.map((data, key) => {
              return <option key={`reason-continue-${key}`} value={data}>{data}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('stressors', language)}</label>
          <select
            value={stressors}
            class="form-select form-select-lg"
            onChange={(e) => setStressors(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            {stressorsOptions?.map((data, key) => {
              return <option key={`stressors-${key}`} value={data}>{data}</option>;
            })}
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('lastUseDate', language)}</label>
          <input
            value={dateLastUse?.split("T")[0]}
            type="date"
            className="form-control"
            onChange={(e) => setDateLastUse(e.target.value)}
          />
        </div>
      </div>

      <div className="row ">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('quantityOfLastUse', language)}</label>
          <input
            type="text"
            value={qtyLastUse}
            className="form-control"
            placeholder={t('quantityLastUse', language)}
            onChange={(e) => setQtyLastUse(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            {t('impressionOfCampOfficer', language)}
          </label>
          <input
            type="text"
            value={impression}
            className="form-control"
            placeholder={t('impressionCampOfficer', language)}
            onChange={(e) => setImpression(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            {t('denialOfSubstanceUseProblems', language)}
          </label>
          <select
            value={denialSubstance}
            class="form-select form-select-lg"
            id="year"
            onChange={(e) => setDenialSubstance(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            <option value={"Mild"}>{t('mild', language)}</option>
            <option value={"Moderate"}>{t('moderate', language)}</option>
            <option value={"Severe"}>{t('severe', language)}</option>
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('motivationFactor', language)}</label>
          <select
            value={motivationFactor}
            class="form-select form-select-lg"
            id="year"
            onChange={(e) => setMotivationFactor(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            <option value={"Mild"}>{t('mild', language)}</option>
            <option value={"Moderate"}>{t('moderate', language)}</option>
            <option value={"Severe"}>{t('severe', language)}</option>
          </select>
        </div>
      </div>

      <div className="row ">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('willingnessForTreatment', language)}</label>
          <select
            value={willingness}
            class="form-select form-select-lg"
            id="year"
            onChange={(e) => setWillingness(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            <option value={"Unwilling"}>{t('unwilling', language)}</option>
            <option value={"Ambivalent"}>{t('ambivalent', language)}</option>
            <option value={"Willing"}>{t('willing', language)}</option>
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('actionTaken', language)}</label>
          <select
            value={actionTaken}
            class="form-select form-select-lg"
            id="year"
            onChange={(e) => setActionTaken(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            <option value={"Admitted"}>{t('admitted', language)}</option>
            <option value={"Referred"}>{t('referred', language)}</option>
            {/* <option value={"Severe"}>Severe</option> */}
          </select>
        </div>
      </div>

      <br />
      <br />

      <hr />

      <br />

      <div className="row w-100 me-auto ml-auto">
        <div className="col-12">
          <div className="form_buttons">
            <button className="btn btn-primary" onClick={() => nextStep()}>
              {t('next', language)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicInfo;
