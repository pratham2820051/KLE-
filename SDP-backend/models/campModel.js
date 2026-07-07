import mongoose from "mongoose";

const campSchema = mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
      },
    locationId: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    faculty: [{
      type: mongoose.Schema.Types.ObjectId
    }]
  },
  {
    timestamps: true,
  }
);


campSchema.index({ faculty: 1 });      // getCampByUser
campSchema.index({ locationId: 1 });   // location-based lookups

const Camp = mongoose.model("Camp", campSchema);

export default Camp;
