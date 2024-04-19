const mongoose = require("mongoose");

module.exports = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    await mongoose.connect("mongodb+srv://joannabrown833:KingsMatch123@atlascluster.k2ffw2e.mongodb.net/?retryWrites=true&w=majority", connectionParams);
    console.log("Connected to DB successfully");
  } catch (error) {
    console.error("Error connecting to DB:", error);
    throw error; // Rethrow the error to signify the failure to connect
  }
};
