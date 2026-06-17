import cogoToast from "cogo-toast";
import React, { useState, useEffect } from "react";
import "./AddPatient.scss";

const years = { upper: 2010, lower: 1990 };

const annualInc = [
  "10,000 - 100,000",
  "100,000 - 500,000",
  "500,000 - 1,000,000",
];
const maritalStat = ["Single", "Married", "Divorsed"];

const alcoholUse = [1, 2, 3];

const livingArrangementOptions = ["Family", "Friends", "Relatives", "Alone"];

const drugOption = [
  "Alcohol",
  "Tranquilizers",
  "Sedatives",
  "Hypnotics",
  "Opium",
  "Heroin",
  "Brown Sugar",
  "Morphine",
  " Codeine",
  "Pentazocine",
  "Buprenorphine",
  " Ganja",
  "Charas",
  "Hashish",
  " Bhang",
  "Amphetamine",
  "Cocaine",
  "Ecstasy",
  "LSD",
  "PCP",
  "Petrol",
  "Glue",
  "whitener",
  "thinner",
  "grease",
  "nail polish",
];

const referralOptions = [
  "Self",
  "Friends",
  "Family",
  "Doctors",
  "Media",
  "Doctors",
  "Employer",
  "Nava JeevanSamithi Membedoctors",
  "Through awareness programme",
  "SKDRDP",
];

const yearOptions = [
  1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001,
  2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013,
  2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
  2026,
];

const reasonStartOptions = [
  "To try",
  "someone in family or friends were using",
  "to feel better and confident or happy",
  "to avoid problems and sadness",
  "other reasons",
];

const reasonContinueOptions = [
  "Liked the effect and wanted more of it",
  "Friends forced",
  "Gave confidence",
  "Craving",
  "Felt relaxed and reduced physical exertion",
];

const stressorsOptions = [
  "Family or relationship issues",
  "Financial Stress",
  "Work related stress",
  "Reports Stressed but doesn’t know where or what",
  "others",
];


function BasicInfo({ setData, setStep, data }) {
  
  //formData
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [sex, setSex] = useState(null);
  const [address, setAddress] = useState(null);
  const [taluk, setTaluk] = useState(null);
  const [phone, setPhone] = useState(null);
  const [community, setCommunity] = useState(null);
  const [educationYear, setEducationYear] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [annualIncome, setAnnualIncome] = useState(null);
  const [maritalStatus, setMaritalStatus] = useState(null);
  const [livingArrangement, setLivingArrangement] = useState(null);
  const [refferal, setRefferal] = useState(null);
  const [joiningDate, setJoiningDate] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");


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

  const [drug, setDrug] = useState();
  const [drugAgeFirst, setDrugAgeFirst] = useState();
  const [drugYearUse, setDrugYearUse] = useState();
  const [drugYearExessive, setDrugYearExessive] = useState();
  const [drugFrequency, setDrugFrequency] = useState();
  const [drugQuantity, setDrugQuantity] = useState();
  const [routeStration, setRouteStration] = useState();

  const nextStep = () => {
    const obj = {
      name: name,
      age: age,
      sex: sex,
      address: address,
      taluk: taluk,
      phone: phone,
      community: community,
      education_in_year: educationYear,
      occupation: occupation,
      annual_income: annualIncome,
      marital_status: maritalStatus,
      living_arrangement: livingArrangement,
      refferal: refferal,
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
      joining_date: joiningDate || null,
      discharge_date: dischargeDate || null,
    };

    setData({ ...data, ...obj });
    setStep(2);
  };

  const addComplaints = () => {
    if (!drug || !drugQuantity || !drugFrequency || !routeStration) {
      cogoToast.error("Please fill all the fields!");
      return;
    }

    const obj = {
      drug: drug,
      age_of_first_use: drugAgeFirst,
      year_use: drugYearUse,
      year_excessive_use: drugYearExessive,
      frequency_last_30_days: drugFrequency,
      quantity_last_30_days: drugQuantity,
      route_stration: routeStration,
    };

    const arr = complaints;
    arr.push(obj);
    setComplaints(arr);
    setDrug("");
    setDrugAgeFirst("");
    setDrugYearUse("");
    setDrugYearExessive("");
    setDrugFrequency("");
    setDrugQuantity("");
  };


  useEffect(() => {
    setName(data?.name)
     setAge(data?.age);
     setSex(data?.sex);
     setAddress(data?.address);
     setTaluk(data?.taluk);
     setPhone(data?.phone);
     setCommunity(data?.community);
     setEducationYear(data?.education_in_year);
     setOccupation(data?.occupation);
     setAnnualIncome(data?.annual_income);
     setMaritalStatus(data?.mar)
     }, [data])

  return (
    <div className="basic-info">
      <div className="header">
        <h2 className="w-100 text-center my-4">Basic Information</h2>
      </div>
      <div className="row mb-3">
        <div className="col-sm-12 col-lg-6">
          <label className="input-lebel">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter the name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="col-sm-12 col-lg-6">
          <label className="input-lebel">Age</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter the age"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-lg-6 col-sm-12">
          <label class="input-lebel" for="">
            Sex
          </label>
          <select
            class="form-select form-select-lg"
            onChange={(e) => setSex(e.target.value)}
          >
            <option>Please select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div className="col-sm-12 col-lg-7 mt-3">
          <label className="input-lebel">Address</label>
          <textarea
            className="form-control"
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter the address"
          ></textarea>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-12 col-lg-6">
          <label className="input-lebel">Taluk</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter the taluk"
            onChange={(e) => setTaluk(e.target.value)}
          />
        </div>

        <div className="col-sm-12 col-lg-6">
          <label className="input-lebel">Phone</label>
          <input
            type="tel"
            className="form-control"
            placeholder="Enter the phone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-12 col-lg-6">
          <label className="input-lebel">Community</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter the community"
            onChange={(e) => setCommunity(e.target.value)}
          />
        </div>

        <div className="col-sm-12 col-lg-6">
          <label className="input-lebel">Education in Year</label>
          <select
            class="form-select form-select-lg"
            id="year"
            onChange={(e) => setEducationYear(e.target.value)}
          >
            <option>Please select</option>
            {(() => {
              const options = [];

              for (let i = 1990; i <= 2010; i++) {
                options.push(<option value={i}>{i}</option>);
              }

              return options;
            })()}
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-12 col-lg-6">
          <label className="input-lebel">Occupation</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter the occupation"
            onChange={(e) => setOccupation(e.target.value)}
          />
        </div>

        <div className="col-sm-12 col-lg-6">
          <label className="input-lebel">Annual Income</label>
          <select
            class="form-select form-select-lg"
            id="year"
            onChange={(e) => setAnnualIncome(e.target.value)}
          >
            <option>Please select</option>
            {annualInc &&
              annualInc.map((data, key) => {
                return (
                  <option key={key} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-12 col-lg-6">
          <label className="input-lebel">Marital Status</label>
          <select
            class="form-select form-select-lg"
            id="year"
            onChange={(e) => setMaritalStatus(e.target.value)}
          >
            <option>Please select</option>
            {maritalStat &&
              maritalStat.map((data, key) => {
                return (
                  <option key={key} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="col-sm-12 col-lg-6">
          <label className="input-lebel">Living Arrangement</label>
          <select
            class="form-select form-select-lg"
            id="year"
            onChange={(e) => setLivingArrangement(e.target.value)}
          >
            <option>Please select</option>
            {livingArrangementOptions &&
              livingArrangementOptions.map((data, key) => {
                return (
                  <option key={key} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      <div className="row mb-3 d-flex align-items-center">
        <div className="col-sm-12 col-lg-6">
          <label className="input-lebel">Referral</label>
          <select
            class="form-select form-select-lg"
            id="year"
            onChange={(e) => setRefferal(e.target.value)}
          >
            <option>Please select</option>
            {referralOptions &&
              referralOptions.map((data, key) => {
                return (
                  <option key={key} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-12 col-lg-6">
          <label className="input-lebel">Joining Date</label>
          <input
            type="date"
            className="form-control"
            value={joiningDate}
            onChange={(e) => setJoiningDate(e.target.value)}
          />
        </div>
        <div className="col-sm-12 col-lg-6">
          <label className="input-lebel">Discharge Date</label>
          <input
            type="date"
            className="form-control"
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
          />
        </div>
      </div>

      <hr />
      <h4>Presenting Complaints</h4>
        complaints.map((data, key) => {
          return (
            <div className="complaints-table">
              <div className="row mb-3">
                <div className="col-sm-12 col-lg-6">
                  <label className="input-lebel">Drug</label>
                  <select
                    class="form-select form-select-lg"
                    id="year"
                    value={data.drug}
                  >
                    <option>Please select</option>
                    {drugOption &&
                      drugOption.map((data, key) => {
                        return (
                          <option key={key} value={data}>
                            {data}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-12 col-lg-6">
                  <label className="input-lebel">Age of First Use</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter the community"
                    value={data.age_of_first_use}
                  />
                </div>

                <div className="col-sm-12 col-lg-6">
                  <label className="input-lebel">Year of Use</label>
                  <select
                    class="form-select form-select-lg"
                    value={drug.year_use}
                  >
                    <option>Please select</option>
                    {yearOptions.map((data, key) => {
                      return <option value={data}>{data}</option>;
                    })}
                    {/* {(() => {
                      const options = [];

                      for (let i = 1990; i <= 2010; i++) {
                        options.push(<option value={i}>{i}</option>);
                      }

                      return options;
                    })()} */}
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-12 col-lg-6">
                  <label className="input-lebel">Year of excessive use</label>
                  <select
                    class="form-select form-select-lg"
                    id="year"
                    value={parseInt(drug.year_excessive_use)}
                  >
                    <option>Please select</option>
                    {yearOptions.map((data, key) => {
                      return <option value={data}>{data}</option>;
                    })}

                    {/* {(() => {
                      const options = [];

                      for (let i = 1990; i <= 2010; i++) {
                        options.push(<option value={i}>{i}</option>);
                      }

                      return options;
                    })()} */}
                  </select>
                </div>

                <div className="col-sm-12 col-lg-6">
                  <label className="input-lebel">Route of admin stration</label>
                  <select
                    class="form-select form-select-lg"
                    id="year"
                    value={data.route_stration}
                  >
                    <option>Please select</option>
                    <option value="orally">Orally</option>
                    <option value="orally">injected</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-12 col-lg-6">
                  <label className="input-lebel">
                    Frequency of use in the last 30 days
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter the frequency"
                    value={data.frequency_last_30_days}
                  />
                </div>

                <div className="col-sm-12 col-lg-6">
                  <label className="input-lebel">
                    Quantity used in the last 30 days
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter the quantity"
                    value={data.quantity_last_30_days}
                  />
                </div>
              </div>

              <hr />
            </div>
          );
        })}

      <div className="complaints mt-3">
        <div className="row mb-3">
          <div className="col-sm-12 col-lg-6">
            <label className="input-lebel">Drug</label>
            <select
              class="form-select form-select-lg"
              id="year"
              onChange={(e) => setDrug(e.target.value)}
            >
              <option>Please select</option>
              {drugOption &&
                drugOption.map((data, key) => {
                  return (
                    <option key={key} value={data}>
                      {data}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-12 col-lg-6">
            <label className="input-lebel">Age of First Use</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Age of first use"
              onChange={(e) => setDrugAgeFirst(e.target.value)}
            />
          </div>

          <div className="col-sm-12 col-lg-6">
            <label className="input-lebel">Year of Use</label>
            <select
              class="form-select form-select-lg"
              id="year"
              onChange={(e) => setDrugYearUse(e.target.value)}
            >
              <option>Please select</option>
              {yearOptions.map((data, key) => {
                return <option key={`year-${key}`} value={data}>{data}</option>;
              })}
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-12 col-lg-6">
            <label className="input-lebel">Year of excessive use</label>
            <select
              class="form-select form-select-lg"
              id="year"
              onChange={(e) => setDrugYearExessive(e.target.value)}
            >
              <option>Please select</option>
              {yearOptions.map((data, key) => {
                return <option key={`year-excessive-${key}`} value={data}>{data}</option>;
              })}
            </select>
          </div>
          <div className="col-sm-12 col-lg-6">
            <label className="input-lebel">Route of admin stration</label>
            <select
              class="form-select form-select-lg"
              id="year"
              onChange={(e) => setRouteStration(e.target.value)}
            >
              <option>Please select</option>
              <option value="orally">Orally</option>
              <option value="orally">injected</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-12 col-lg-6">
            <label className="input-lebel">
              Frequency of use in the last 30 days
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter the frequency"
              onChange={(e) => setDrugFrequency(e.target.value)}
            />
          </div>

          <div className="col-sm-12 col-lg-6">
            <label className="input-lebel">
              Quantity used in the last 30 days
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter the quantity"
              onChange={(e) => setDrugQuantity(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-2 ">
            <button className="btn_form" onClick={() => addComplaints()}>+ Add Line</button>
          </div>
        </div>
      </div>

      <br />

      <div className="row mb-3">
        <div className="col-sm-12 col-lg-6">
          <label className="input-lebel">Reson for starting</label>
          <select
            class="form-select form-select-lg"
            onChange={(e) => setReasonStart(e.target.value)}
          >
            <option>Please select</option>
            {reasonStartOptions.map((data, key) => {
              return <option value={data}>{data}</option>;
            })}
          </select>
        </div>

        <div className="col-sm-12 col-lg-6">
          <label className="input-lebel">Reson for continuing</label>
          <select
            class="form-select form-select-lg"
            onChange={(e) => setReasonContinue(e.target.value)}
          >
            <option>Please select</option>
            {reasonContinueOptions.map((data, key) => {
              return <option value={data}>{data}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="row mb-3">

      <div className="col-sm-12 col-lg-6">
          <label className="input-lebel">Stressors</label>
          <select
            class="form-select form-select-lg"
            onChange={(e) => setStressors(e.target.value)}
          >
            <option>Please select</option>
            {stressorsOptions?.map((data, key) => {
             return <option value={data}>{data}</option>;

            })}
            
          </select>
        </div>

        <div className="col-sm-12 col-lg-6">
          <label className="input-lebel">Last Use date</label>
          <input
            type="date"
            className="form-control"
            onChange={(e) => setDateLastUse(e.target.value)}
          />
        </div>
        
      </div>

      <div className="row my-3">

      <div className="col-sm-12 col-lg-6">
          <label className="input-lebel">Quantity of last use</label>
          <input
            type="text"
            className="form-control"
            placeholder="Quantity of last Use"
            onChange={(e) => setQtyLastUse(e.target.value)}
          />
        </div>

        <div className="col-sm-12 col-lg-6">
          <label className="input-lebel">
            Impression of camp officer about the Patient
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Impression of camp officer"
            onChange={(e) => setImpression(e.target.value)}
          />
        </div>

      </div>

<div className="row">

<div className="col-sm-12 col-lg-6">
          <label className="input-lebel">
            Denial of substance use related problems
          </label>
          <select
            class="form-select form-select-lg"
            id="year"
            onChange={(e) => setDenialSubstance(e.target.value)}
          >
            <option>Please select</option>
            <option value={"Mild"}>Mild</option>
            <option value={"Moderate"}>Moderate</option>
            <option value={"Severe"}>Severe</option>
          </select>
        </div>

<div className="col-sm-12 col-lg-6">
          <label className="input-lebel">
            Motivation Factor
          </label>
          <select
            class="form-select form-select-lg"
            id="year"
            onChange={(e) => setMotivationFactor(e.target.value)}
          >
            <option>Please select</option>
            <option value={"Mild"}>Mild</option>
            <option value={"Moderate"}>Moderate</option>
            <option value={"Severe"}>Severe</option>
          </select>
        </div>
</div>

      <div className="row my-3">
        <div className="col-sm-12 col-lg-6">
          <label className="input-lebel">
            Willingness for Treatment
          </label>
          <select
            class="form-select form-select-lg"
            id="year"
            onChange={(e) => setWillingness(e.target.value)}
          >
          <option>Please select</option>
            <option value={"Unwilling"}>Unwilling</option>
            <option value={"Ambivalent"}>Ambivalent</option>
            <option value={"Willing"}>Willing</option>
           </select>
        </div>

        <div className="col-sm-12 col-lg-6">
          <label className="input-lebel">
            Action Taken
          </label>
          <select
            class="form-select form-select-lg"
            id="year"
            onChange={(e) => setActionTaken(e.target.value)}
          >
            <option>Please select</option>
            <option value={"Admitted"}>Admitted</option>
            <option value={"Reffered"}>Reffered</option>
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
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicInfo;
