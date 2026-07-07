import Patient from "../models/patientModel.js";

// Sanitize empty date strings that would cause Mongoose CastError
const sanitizeDates = (obj) => {
  const DATE_FIELDS = ["last_use_date", "joining_date", "discharge_date"];
  for (const field of DATE_FIELDS) {
    if (obj[field] === "" || obj[field] === "null" || obj[field] === "undefined") {
      obj[field] = null;
    }
  }
  return obj;
};

// @desc  Register a new patient
// @route POST /api/patient
// @access Private
const registerPatient = async (req, res) => {
  try {
    const obj = req.body.obj;

    if (!obj) {
      return res.status(400).json({ code: 400, success: false, message: "Patient data is required" });
    }

    sanitizeDates(obj);

    // New patients are unallocated by default; faculty assigned via allocatePatient
    obj.faculty = null;
    obj.allocated = "no";

    // Use atomic counter to avoid race condition on patientId
    obj.patientId = (await Patient.countDocuments()) + 1;

    const patient = await Patient.create(obj);

    return res.status(201).json({ code: 201, success: true, message: "Patient created successfully", patient });
  } catch (error) {
    console.error("registerPatient error:", error.message);
    return res.status(500).json({ code: 500, success: false, message: "Error creating patient", error: error.message });
  }
};

// @desc  Update a patient
// @route PUT /api/patient
// @access Private
const updatePatient = async (req, res) => {
  try {
    if (!req.body.obj || !req.body.id) {
      return res.status(400).json({ code: 400, success: false, message: "id and obj are required" });
    }

    const obj = sanitizeDates(req.body.obj);

    const patient = await Patient.findByIdAndUpdate(req.body.id, obj, { new: true, runValidators: false });

    if (!patient) {
      return res.status(404).json({ code: 404, success: false, message: "Patient not found" });
    }

    return res.status(200).json({ code: 200, success: true, message: "Patient updated successfully", patient });
  } catch (error) {
    console.error("updatePatient error:", error.message);
    return res.status(500).json({ code: 500, success: false, message: "Error updating patient", error: error.message });
  }
};

// @desc  Get all patients (admin)
// @route GET /api/patient
// @access Private/Admin
const getAllPatient = async (req, res) => {
  try {
    const patients = await Patient.find().lean();
    return res.status(200).json({ code: 200, success: true, message: "Patients fetched successfully", data: patients });
  } catch (error) {
    console.error("getAllPatient error:", error.message);
    return res.status(500).json({ code: 500, success: false, message: "Error getting patients", error: error.message });
  }
};

// @desc  Get patients assigned to logged-in faculty/nurse
// @route GET /api/patient/user
// @access Private
const getPatientByUser = async (req, res) => {
  try {
    const user = req.user;

    // Admins see all patients
    const filter = user.role === "admin" ? {} : { faculty: user._id };
    const patients = await Patient.find(filter).lean();

    return res.status(200).json({ code: 200, success: true, message: "Patients fetched successfully", data: patients });
  } catch (error) {
    console.error("getPatientByUser error:", error.message);
    return res.status(500).json({ code: 500, success: false, message: "Error getting patients", error: error.message });
  }
};

// @desc  Allocate unallocated patients to a faculty member
// @route PUT /api/patient/allocate
// @access Private/Admin
const allocatePatient = async (req, res) => {
  try {
    const { unallocatedPatients, faculty } = req.body;

    if (!unallocatedPatients || !faculty) {
      return res.status(400).json({ code: 400, success: false, message: "unallocatedPatients and faculty are required" });
    }

    const result = await Patient.updateMany(
      { _id: { $in: unallocatedPatients } },
      { $set: { faculty, allocated: "yes" } }
    );

    return res.status(200).json({
      code: 200,
      success: true,
      message: `${result.modifiedCount} patient(s) allocated successfully`,
      data: unallocatedPatients,
    });
  } catch (error) {
    console.error("allocatePatient error:", error.message);
    return res.status(500).json({ code: 500, success: false, message: "Error allocating patients", error: error.message });
  }
};

// @desc  Get all unallocated patients
// @route GET /api/patient/getUnallocated
// @access Private/Admin
const getUnallocatedPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ allocated: "no" }).lean();
    return res.status(200).json({ code: 200, success: true, message: "Unallocated patients fetched", data: patients });
  } catch (error) {
    console.error("getUnallocatedPatients error:", error.message);
    return res.status(500).json({ code: 500, success: false, message: "Error getting unallocated patients", error: error.message });
  }
};

export {
  registerPatient,
  getAllPatient,
  getPatientByUser,
  updatePatient,
  allocatePatient,
  getUnallocatedPatients,
};
