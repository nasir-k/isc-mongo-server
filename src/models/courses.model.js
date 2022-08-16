const mongoose = require("mongoose");

const { Schema } = mongoose;

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  university_id: {
    type: Schema.Types.ObjectId,
    ref: "univeristies",
  },
});
module.exports = mongoose.model("Courses", courseSchema);
