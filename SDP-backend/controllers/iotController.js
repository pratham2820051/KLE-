// IoT controller — placeholder for future IoT device integration
const getIot = async (req, res) => {
  return res.status(501).json({
    code: 501,
    success: false,
    message: "IoT integration not yet implemented",
  });
};

export { getIot };
