import Location from "../models/locationModel.js";

const registerLocation = async (req, res) => {
  try {
    const { name, address } = req.body;

    if (!name || !address) {
      return res.status(400).json({ code: 400, success: false, message: "name and address are required" });
    }

    const loc = await Location.create({ name, address });
    return res.status(201).json({ code: 201, success: true, message: "Location created successfully", data: loc });
  } catch (error) {
    console.error("registerLocation error:", error.message);
    return res.status(500).json({ code: 500, success: false, message: "Error creating location" });
  }
};

const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;

    const location = await Location.findByIdAndUpdate(
      id,
      { name, address },
      { new: true, runValidators: true }
    );

    if (!location) {
      return res.status(404).json({ code: 404, success: false, message: "Location not found" });
    }

    return res.status(200).json({ code: 200, success: true, message: "Location updated successfully", location });
  } catch (error) {
    console.error("updateLocation error:", error.message);
    return res.status(500).json({ code: 500, success: false, message: "Error updating location" });
  }
};

const getLocations = async (req, res) => {
  try {
    const locations = await Location.find().lean();
    return res.status(200).json({ code: 200, success: true, message: "Locations fetched successfully", data: locations });
  } catch (error) {
    console.error("getLocations error:", error.message);
    return res.status(500).json({ code: 500, success: false, message: "Error getting locations" });
  }
};

export { getLocations, registerLocation, updateLocation };
