require("dotenv").config();

const cors = require("cors");
const express = require("express");

const connectDB = require("./config/db");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/orders", orderRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT , () => {
    connectDB();
    console.log(`server running at port ${PORT}`);
    
})
