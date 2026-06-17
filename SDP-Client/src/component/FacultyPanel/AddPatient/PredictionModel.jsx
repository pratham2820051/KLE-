import React from "react";
import "./AddPatient.scss";
import { useNavigate } from "react-router";
import { useLanguage } from "../../../context/LanguageContext";
import { t } from "../../../translations";

function PredictionModels() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const onCLickHandle = () => {
    navigate(`/predictSoberPeriod`);
  };

  const riskLevelHandle = () => {
    navigate(`/predictRiskLevel`);
  };

  const aaoHandle = () => {
    navigate(`/predictAAO`);
  };

  return (
    <div className="prediction-buttons">
      <div class="controls">
        <button onClick={onCLickHandle}>{t('soberPeriodPrediction', language)}</button>
        <button onClick={aaoHandle}>{t('aaiPrediction', language)}</button>
        <button onClick={riskLevelHandle}>{t('riskLevelPrediction', language)}</button>
      </div>
    </div>
  );
}

export default PredictionModels;
