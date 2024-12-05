const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const https = require("https");
const fs = require("fs");
const http = require("http");
const app = express();

const cors = require("cors");

app.use(cors());

// Connect Database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// Defining our Routes
// User Routes
app.use("/api/users", require("./routes/api/users"));
// Auth Routes
app.use("/api/auth", require("./routes/api/auth"));
// Profile Routes
app.use("/api/profile", require("./routes/api/profile"));
// Posts Routes
app.use("/api/posts", require("./routes/api/posts"));
// Groups Routes
app.use("/api/groups", require("./routes/api/groups"));
// Groups Routes
app.use("/api/events", require("./routes/api/events"));
// Generate Routes
app.use("/api/generate", require("./routes/api/generate"));

const dirname = path.resolve();
app.use("/uploads", express.static(path.join(dirname, "/uploads")));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// const httpsOptions = {
//   key: fs.readFileSync("/var/www/httpd-cert/api-community.dentistup.tn_2023-12-26-19-38_14.key"),
//   cert: fs.readFileSync("/var/www/httpd-cert/api-community.dentistup.tn_2023-12-26-19-38_14.crt"),
// };



// Create HTTPS server
const PORT = process.env.PORT || 5050;
// const server = https.createServer(httpsOptions, app);
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
