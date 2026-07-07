import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLanguage } from "../../../context/LanguageContext";
import { t } from "../../../translations";
import { ADD_PATIENT } from "../../../utils/apiConstant";
import "./AddPatient.scss";

function FollowUpHistory({ data, setData, setLoading }) {
  const { language } = useLanguage();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [counsellor, setCounsellor] = useState("");
  const [status, setStatus] = useState("Sober / Abstained");
  const [notes, setNotes] = useState("");

  const followUps = data?.followUps || [];

  const handleAddFollowUp = async (e) => {
    e.preventDefault();
    if (!notes.trim() || !counsellor.trim()) {
      toast.error("Please fill in counsellor name and notes.");
      return;
    }

    setLoading(true);

    const newFollowUp = {
      date,
      counsellor,
      status,
      notes,
    };

    const updatedFollowUps = [...followUps, newFollowUp];
    const updatedData = { ...data, followUps: updatedFollowUps };

    const auth = localStorage.getItem("auth") || localStorage.getItem("facultyAuth");
    if (!auth) {
      toast.error(t("authenticationTokenNotFound", language));
      setLoading(false);
      return;
    }

    const cleanToken = auth.replace(/['"]+/g, "").trim();
    const headers = {
      Authorization: `Bearer ${cleanToken}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.put(
        ADD_PATIENT,
        { id: data._id, obj: updatedData },
        { headers }
      );

      if (response.data) {
        toast.success("Follow-up added successfully!");
        setData(updatedData);
        // Clear form
        setNotes("");
        setCounsellor("");
        setDate(new Date().toISOString().split("T")[0]);
        setStatus("Sober / Abstained");
      }
    } catch (err) {
      console.error("Error adding follow-up:", err);
      toast.error("Failed to add follow-up record.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="basic-info">
      <div className="header">
        <h2 className="w-100 text-center my-4">{t("followUpHistory", language)}</h2>
      </div>

      {/* ── Add Follow-up Form ── */}
      <div className="complaints mb-4">
        <h4>Add Follow-up / Re-admission</h4>
        <form onSubmit={handleAddFollowUp} className="mt-3">
          <div className="row">
            <div className="col-sm-12 mb-3 col-lg-6">
              <label className="input-lebel">Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="col-sm-12 mb-3 col-lg-6">
              <label className="input-lebel">Counsellor / Staff Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter counsellor name"
                value={counsellor}
                onChange={(e) => setCounsellor(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 mb-3 col-lg-12">
              <label className="input-lebel">Patient Status</label>
              <select
                className="form-select form-select-lg"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Sober / Abstained">Sober / Abstained</option>
                <option value="Relapsed / Mild Craving">Relapsed / Mild Craving</option>
                <option value="Relapsed / Needs Re-admission">Relapsed / Needs Re-admission</option>
                <option value="Re-admitted to Camp">Re-admitted to Camp</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 mb-3 col-lg-12">
              <label className="input-lebel">Follow-up Notes / Details</label>
              <textarea
                className="form-control"
                placeholder="Enter follow-up notes, progress details, or treatment recommendations"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                required
              ></textarea>
            </div>
          </div>

          <div className="row">
            <div className="col-12 mt-2">
              <button type="submit" className="btn_form">
                + Add Follow-up
              </button>
            </div>
          </div>
        </form>
      </div>

      <hr />

      {/* ── Follow-up History List ── */}
      <div className="mt-4">
        <h4>History of Follow-ups / Re-admissions</h4>
        {followUps.length > 0 ? (
          <div className="list-group mt-3">
            {followUps.map((item, index) => (
              <div
                key={index}
                className="list-group-item list-group-item-action flex-column align-items-start mb-3"
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  padding: "16px",
                  backgroundColor: "#f8fafc",
                }}
              >
                <div className="d-flex w-100 justify-content-between align-items-center mb-2">
                  <h5 className="mb-1" style={{ color: "#003b7a", fontWeight: 700 }}>
                    {item.status}
                  </h5>
                  <small style={{ fontWeight: 600, color: "#64748b" }}>
                    {new Date(item.date).toLocaleDateString("en-IN")}
                  </small>
                </div>
                <p className="mb-2" style={{ color: "#334155", fontSize: "0.95rem" }}>
                  {item.notes}
                </p>
                <small style={{ color: "#00875a", fontWeight: 600 }}>
                  Recorded by: {item.counsellor}
                </small>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted mt-3">No follow-ups recorded for this patient yet.</p>
        )}
      </div>
    </div>
  );
}

export default FollowUpHistory;
