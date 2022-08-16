const mongoose = require("mongoose");
const { Schema } = mongoose;

const UniversitySchema = new Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  acceptance_criteria: {
    type: Object,
  },
  affiliation_id: [
    {
      type: Schema.Types.ObjectId,
      ref: "affiliation",
    },
  ],
  stats: {
    type: Object,
  },
  logo: {
    type: String,
  },
});
const Univ = mongoose.model("univeristies", UniversitySchema);

module.exports = Univ;
