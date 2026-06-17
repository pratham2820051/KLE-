import axios from "axios";

const soberPeriodMap = {
  0: "1-30",
  1: "180-270",
  2: "270-365",
  3: "30-90",
  4: "365-3650",
  5: "90-180",
};

const riskLevelMap = {
  4: "Very High Risk",
  3: "High-Risk",
};

const aaiPredictionMap = {
  0: "<18",
  1: "18-25",
  2: "26-32",
  3: "33-39",
  4: "40-46",
  5: "47-53",
  6: "54-60",
  7: ">60",
};

async function soberPeriodPrediction(req, res, next) {
  // Get the data from the request body
  const data = req.body;

  try {
    console.log("Sober Period Prediction Data:", data);

    // ── Validation ──────────────────────────────────────────────────────────
    // Reject if any required radio-button field is still at its default (-1)
    if (
      data["Marital Status"] === -1 ||
      data["Motivation factor"] === -1 ||
      data["Willingness for treatment"] === -1 ||
      data["Risk Level"] === -1 ||
      data["smoking/smokeless"] === -1 ||
      data["Sugar(mg)"] === -1 ||
      data["RCA_liked the effect and wanted more of it"] === -1 ||
      data["MPPR_no"] === -1
    ) {
      return res
        .status(400)
        .json({ error: "Please select all required options before submitting" });
    }

    // ── Scoring ─────────────────────────────────────────────────────────────
    // Higher score → longer predicted sober period
    let soberScore = 0;

    // Risk Level: 1=Low → best, 4=Very High → worst
    // Lower risk correlates with a longer sober period
    const riskLevel = data["Risk Level"]; // 1–4
    if (riskLevel === 1) soberScore += 4;
    else if (riskLevel === 2) soberScore += 2.5;
    else if (riskLevel === 3) soberScore += 1;
    // riskLevel === 4 → +0 (very high risk, hardest to sustain sobriety)

    // Willingness for treatment: 0=Willing → best, 2=Unwilling → worst
    const willingness = data["Willingness for treatment"];
    if (willingness === 0) soberScore += 2;       // Willing
    else if (willingness === 1) soberScore += 1;  // Ambivalent
    // willingness === 2 (Unwilling) → +0

    // Motivation factor: 2=Willing → best, 1=Severe craving → worst
    const motivation = data["Motivation factor"];
    if (motivation === 2) soberScore += 2;       // Strong motivation
    else if (motivation === 0) soberScore += 1;  // Moderate motivation
    // motivation === 1 (Severe / poor motivation) → +0

    // Relapses: more relapses → shorter predicted sober period
    const relapses = Number(data["Number of relapses (based on period of treatment)"]) || 0;
    if (relapses === 0) soberScore += 2;
    else if (relapses <= 2) soberScore += 1;
    else if (relapses <= 5) soberScore += 0;
    else soberScore -= 1; // 6+ relapses → penalise

    // Current sober period (days already sober): longer baseline → better outlook
    const currentSober = Number(data["Period of sober"]) || 0;
    if (currentSober >= 365) soberScore += 3;
    else if (currentSober >= 90) soberScore += 2;
    else if (currentSober >= 30) soberScore += 1;
    // < 30 days → +0

    // Craving: liked the effect & wants more → harder to stay sober
    if (data["RCA_liked the effect and wanted more of it"] === 1) soberScore -= 1;

    // Medical problems present → slight negative
    if (data["MPPR_no"] === 1) soberScore -= 0.5;

    // Smoking → mild negative
    if (data["smoking/smokeless"] === 0) soberScore -= 0.5; // 0 = Yes (smokes)

    // Diabetes → mild negative
    if (data["Sugar(mg)"] === 2) soberScore -= 0.5; // 2 = Diabetic

    // ── Map score → period category ─────────────────────────────────────────
    // soberPeriodMap: 0="1-30", 3="30-90", 5="90-180", 1="180-270",
    //                 2="270-365", 4="365-3650"
    let prediction;
    if (soberScore >= 9) {
      prediction = 4; // 365–3650 days (1–10 years)
    } else if (soberScore >= 7) {
      prediction = 2; // 270–365 days (~9–12 months)
    } else if (soberScore >= 5) {
      prediction = 1; // 180–270 days (~6–9 months)
    } else if (soberScore >= 3) {
      prediction = 5; // 90–180 days (~3–6 months)
    } else if (soberScore >= 1) {
      prediction = 3; // 30–90 days (~1–3 months)
    } else {
      prediction = 0; // 1–30 days (very short period)
    }

    console.log(
      "Sober Period Score:", soberScore,
      "→ Period:", soberPeriodMap[prediction]
    );

    res.status(200).json({ result: soberPeriodMap[prediction] });
  } catch (error) {
    console.error("Error in sober period prediction:", error);
    res.status(500).json({ error: "Sober Period Prediction service unavailable" });
  }
}

async function aaiPrediction(req, res, next) {
  // Get the data from the request body
  const data = req.body;

  try {
    // Mock AAI (Age at Alcohol Initiation) prediction logic
    console.log("AAI Prediction Data:", data);

    // Simple mock prediction based on available factors
    let aaiScore = 0;

    // Family history influence
    if (data["Family history of alcoholism / drug abuse, if any (who and which type of drug)"] === 1) {
      aaiScore += 1; // Family history might lead to earlier initiation
    }

    // ACE factors that might influence early alcohol use
    if (data["ACE_Early parental loss"] === 1) aaiScore += 1;
    if (data["ACE_Broken home or single parenting"] === 1) aaiScore += 1;
    if (data["ACE_Poverty or severe debts"] === 1) aaiScore += 1;
    if (data["ACE_Running away from home"] === 1) aaiScore += 1;

    // Stress factors
    if (data["S_Family or relationship issues"] === 1) aaiScore += 0.5;
    if (data["S_Financial Stress"] === 1) aaiScore += 0.5;

    // Legal complications might indicate earlier problematic use
    if (data["Legal complications yes/no"] === 1) aaiScore += 1;

    // Current age and working age correlation
    if (data.Age && data["At what age did you start working?"]) {
      const workingAge = data["At what age did you start working?"];
      if (workingAge < 18) aaiScore += 1; // Early work might correlate with early alcohol use
    }

    // Determine AAI category based on score
    let prediction;
    if (aaiScore >= 5) {
      prediction = 0; // <18 (very early initiation)
    } else if (aaiScore >= 3.5) {
      prediction = 1; // 18-25
    } else if (aaiScore >= 2.5) {
      prediction = 2; // 26-32
    } else if (aaiScore >= 1.5) {
      prediction = 3; // 33-39
    } else if (aaiScore >= 0.5) {
      prediction = 4; // 40-46
    } else {
      prediction = 5; // 47-53 (later initiation)
    }

    console.log("Mock AAI Score:", aaiScore, "Category:", aaiPredictionMap[prediction]);

    res.status(200).json({ result: aaiPredictionMap[prediction] });
  } catch (error) {
    console.error("Error in AAI prediction:", error);
    res.status(500).json({ error: "AAI Prediction service unavailable" });
  }
}

async function riskPrediction(req, res, next) {
  // Get the data from the request body
  const data = req.body;

  try {
    // Mock prediction logic - you can replace this with actual ML model logic
    console.log("Risk Prediction Data:", data);

    // Simple mock prediction based on some risk factors
    let riskScore = 0;

    // Age factor (older age might indicate higher risk)
    if (data.Age > 40) riskScore += 1;
    if (data.Age > 50) riskScore += 1;

    // Duration of alcohol use
    if (data["duration of use of alcohol"] > 10) riskScore += 1;
    if (data["duration of excessive use of alcohol"] > 5) riskScore += 1;

    // Family history
    if (data["How many first degree relatives had Substance addiction"] > 0) riskScore += 1;

    // Legal complications
    if (data["Legal complications yes/no"] === 1) riskScore += 1;

    // Psychiatric complications
    if (data.Psy_Hallucinations === 1) riskScore += 1;
    if (data.Psy_Confusion === 1) riskScore += 1;

    // Stress factors
    if (data["S_Family or relationship issues"] === 1) riskScore += 0.5;
    if (data["S_Financial Stress"] === 1) riskScore += 0.5;
    if (data["S_Work related stress"] === 1) riskScore += 0.5;

    // AWS Stage
    if (data.AWS_Stages >= 3) riskScore += 1;

    // Determine risk level based on score
    let prediction;
    if (riskScore >= 4) {
      prediction = 4; // Very High Risk
    } else if (riskScore >= 2.5) {
      prediction = 3; // High Risk
    } else {
      prediction = 3; // Default to High Risk for now
    }

    console.log("Mock Predicted Risk Score:", riskScore, "Level:", riskLevelMap[prediction]);

    res.status(200).json({ result: riskLevelMap[prediction] });
  } catch (error) {
    console.error("Error in risk prediction:", error);
    res.status(500).json({ error: "Prediction service unavailable" });
  }
}

export { soberPeriodPrediction, aaiPrediction, riskPrediction };
