const express = require("express");
const app = express();
const postRoutes = require("./routes/posts");
const categoryRoutes = require("./routes/categories");
const userRoutes = require("./routes/users");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("Test."));
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));