import React, { useState, useEffect } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { t } from "../../../translations";
import "./AddPatient.scss";


const choice = [
    "yes",
    "no"
]


function BasicInfo4({ prevData, data, setData, setStep, setLoading }) {
    const { language } = useLanguage();

    const [untowardIncident, setUntowardIncident] = useState("");
    const [incidentDescription, setIncidentDescription] = useState("");
    const [incidentAction, setIncidentAction] = useState("");

    // Treatment section state variables
    const [hospitalName, setHospitalName] = useState("");
    const [treatmentYear, setTreatmentYear] = useState("");
    const [treatmentPeriod, setTreatmentPeriod] = useState("");
    const [soberPeriod, setSoberPeriod] = useState("");
    const [treatmentRemarks, setTreatmentRemarks] = useState("");
    const [relapseReason, setRelapseReason] = useState("");

    const nextStep = () => {
        const obj = {
            untoward_incident: untowardIncident,
            incident_description: incidentDescription,
            incident_action: incidentAction,
            hospital_name: hospitalName,
            treatment_year: treatmentYear,
            treatment_period: treatmentPeriod,
            sober_period: soberPeriod,
            treatment_remarks: treatmentRemarks,
            relapse_reason: relapseReason,
        };

        setData({ ...data, ...obj });
        setStep(5);
    };

    useEffect(() => {
        if (data) {
            setUntowardIncident(data?.untoward_incident || "");
            setIncidentDescription(data?.incident_description || "");
            setIncidentAction(data?.incident_action || "");
            setHospitalName(data?.hospital_name || "");
            setTreatmentYear(data?.treatment_year || "");
            setTreatmentPeriod(data?.treatment_period || "");
            setSoberPeriod(data?.sober_period || "");
            setTreatmentRemarks(data?.treatment_remarks || "");
            setRelapseReason(data?.relapse_reason || "");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <div className="basic-info">
            <div className="header">
                <h2 className="w-100 text-center my-4">{t('treatment', language)}</h2>
            </div>

            <div className="row">
                <div className="col-sm-12 mb-3 col-lg-6">
                    <label className="input-lebel">{t('anyUntowardIncident', language)}</label>

                    <select
                        class="form-select form-select-lg"
                        onChange={(e) => setUntowardIncident(e.target.value)}
                        value={untowardIncident}
                    >
                        <option>{t('selectOption', language)}</option>
                        {choice &&
                            choice.map((data, key) => {
                                return (
                                    <option key={key} value={t(data, language)}>
                                        {t(data, language)}
                                    </option>
                                );
                            })}
                    </select>
                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                     <label className="input-lebel">{t('ifYesDescribeIncident', language)}</label>
                     <input
                         type="text"
                         className="form-control"
                         placeholder={t('enterIncidentPlaceholder', language)}
                         value={incidentDescription}
                         onChange={(e) => setIncidentDescription(e.target.value)}
                     />

                 </div>
             </div>

             <div className="row">

                 <div className="col-sm-12 mb-3 col-lg-6">
                     <label className="input-lebel">{t('actionTaken', language)}</label>
                     <input
                         type="text"
                         className="form-control"
                         placeholder={t('enterActionPlaceholder', language)}
                         value={incidentAction}
                         onChange={(e) => setIncidentAction(e.target.value)}
                     />

                 </div>
            </div>


            <h4>{t('treatmentsReceivedInOtherCentres', language)}</h4>

            <div className="row">
                <div className="col-sm-12 mb-3 col-lg-6">
                    <label className="input-lebel">{t('nameOfHospital', language)}</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={t('enterNamePlaceholder', language)}
                        value={hospitalName}
                        onChange={(e) => setHospitalName(e.target.value)}
                    />

                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                    <label className="input-lebel">{t('yearOfTreatment', language)}</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={t('enterYearPlaceholder', language)}
                        value={treatmentYear}
                        onChange={(e) => setTreatmentYear(e.target.value)}
                    />

                </div>
            </div>

            <div className="row">
                <div className="col-sm-12 mb-3 col-lg-6">
                    <label className="input-lebel">{t('periodOfTreatment', language)}</label>
                    <select
                        class="form-select form-select-lg"
                        onChange={(e) => setTreatmentPeriod(e.target.value)}
                        value={treatmentPeriod}
                    >
                        <option>{t('selectOption', language)}</option>
                        <option value={t('oneMonth', language)}>{t('oneMonth', language)}</option>
                        <option value={t('twoMonth', language)}>{t('twoMonth', language)}</option>
                        <option value={t('threeMonth', language)}>{t('threeMonth', language)}</option>
                        <option value={t('fourMonth', language)}>{t('fourMonth', language)}</option>
                        <option value={t('fiveMonth', language)}>{t('fiveMonth', language)}</option>
                        <option value={t('sixMonth', language)}>{t('sixMonth', language)}</option>

                    </select>

                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                    <label className="input-lebel">{t('periodOfSober', language)}</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={t('enterPeriodPlaceholder', language)}
                        value={soberPeriod}
                        onChange={(e) => setSoberPeriod(e.target.value)}
                    />

                </div>
            </div>

            <div className="row">

                <div className="col-sm-12 mb-3 col-lg-6">
                    <label className="input-lebel">{t('remarks', language)}</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={t('enterRemarksPlaceholder', language)}
                        value={treatmentRemarks}
                        onChange={(e) => setTreatmentRemarks(e.target.value)}
                    />

                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                    <label className="input-lebel">{t('reasonForRelapse', language)}</label>
                    <textarea
                        className="form-control"
                        placeholder={t('enterReasonForRelapsePlaceholder', language)}
                        value={relapseReason}
                        onChange={(e) => setRelapseReason(e.target.value)}
                    ></textarea>

                </div>
            </div>



            <div className="row w-100 me-auto ml-auto">
                <div className="col-12">
                    <div className="form_buttons">
                        <button className="btn btn-primary" onClick={() => setStep(3)}>
                            {t('prevButton', language)}
                        </button>

                        <button className="btn btn-primary" onClick={() => nextStep()}>
                            {t('nextButton', language)}
                        </button>


                        {/* {prevData ? (
                          <button className="btn btn-primary" onClick={() => update()}>
                            {t('updateButton', language)}
                          </button>
                        ) : (
                          <button className="btn btn-primary" onClick={() => submit()}>
                            {t('submitButton', language)}
                          </button>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BasicInfo4;
