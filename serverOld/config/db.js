const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://nuannimprasert:Z1b2nlEChKeeXpPm@cluster0.8wn3kjd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log("MongoDB connected");

  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB