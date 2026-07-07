import Camp from "../models/campModel.js";

const registerCamp = async (req, res) => {
  try {
    const { name, locationId, faculty, startDate, endDate } = req.body;

    if (!name || !locationId || !faculty) {
      return res.status(400).json({ code: 400, success: false, message: "name, locationId and faculty are required" });
    }

    const camp = await Camp.create({ name, locationId, faculty, startDate, endDate });

    return res.status(201).json({ code: 201, success: true, message: "Camp created successfully", camp });
  } catch (error) {
    console.error("registerCamp error:", error.message);
    return res.status(500).json({ code: 500, success: false, message: "Error creating camp" });
  }
};

const updateCamp = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, locationId, faculty, startDate, endDate } = req.body;

    const camp = await Camp.findByIdAndUpdate(
      id,
      { name, locationId, faculty, startDate, endDate },
      { new: true, runValidators: true }
    );

    if (!camp) {
      return res.status(404).json({ code: 404, success: false, message: "Camp not found" });
    }

    return res.status(200).json({ code: 200, success: true, message: "Camp updated successfully", camp });
  } catch (error) {
    console.error("updateCamp error:", error.message);
    return res.status(500).json({ code: 500, success: false, message: "Error updating camp" });
  }
};

const getAllCamp = async (req, res) => {
  try {
    const camps = await Camp.find().lean();
    return res.status(200).json({ code: 200, success: true, message: "Camps fetched successfully", data: camps });
  } catch (error) {
    console.error("getAllCamp error:", error.message);
    return res.status(500).json({ code: 500, success: false, message: "Error getting camps" });
  }
};

// Returns camps belonging to the logged-in user
const getCampByUser = async (req, res) => {
  try {
    const userId = req.user._id;

    // Query directly in DB — no JS-side filtering loop
    const camps = await Camp.find({ faculty: userId }).lean();

    return res.status(200).json({ code: 200, success: true, message: "Camps fetched successfully", data: camps });
  } catch (error) {
    console.error("getCampByUser error:", error.message);
    return res.status(500).json({ code: 500, success: false, message: "Error getting camps" });
  }
};

export { getCampByUser, registerCamp, getAllCamp, updateCamp };
