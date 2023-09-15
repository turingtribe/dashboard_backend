const express = require("express");
const { UserRoute } = require("./routes/User.Route");
const cors=require("cors")
//USER SIGNUP ROUTE
const { database_config } = require("./config/database");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors())
app.use("/", UserRoute);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

//CREATED THE SERVER
app.listen(PORT, async () => {
  try {
    await database_config;
    console.log("Connected to DB");
  } catch (err) {
    console.log(`some error ${err}`);
  }
  console.log(`Server is running on port ${PORT}`);
});
