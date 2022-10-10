import express from "express";
import { sequelize } from "./config/database.js";
import { User } from "./models/Users.js";
const app = express();
const port = 6080;

app.use(express.json());

app.get("/user", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users });
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;
    const newUser = await User.create({
      firstname,
      lastname,
      username,
      email,
      password,
    });
    res.status(200).json({ message: "user created", newUser });
  } catch (err) {
    console.log(err);
  }
});

const runApp = async () => {
  try {
    // run database first
    await sequelize.authenticate();
    console.log("connected to db");

    // sync all models at once
    await sequelize.sync();

    // run server next
    app.listen(port, () => {
      console.log("listening on port: " + port);
    });
  } catch (err) {
    console.log(err);
  }
};

runApp();
