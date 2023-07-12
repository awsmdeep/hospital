const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn");

const Register = require("./models/register");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("views", template_path);
app.use(express.static(static_path));
app.set("view engine", "hbs");
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  try {
    const email = req.body.name;
    const Lpassword = req.body.Lpassword;
    const createpassword = req.body.createpassword;
    const confirmpassword = req.body.confirmpassword;
    const user = await Register.findOne({ Username: email });

    if (user && user.confirmpassword === Lpassword) {
      // Redirect to the homepage (index route)
      res.redirect("/");
    } else if (createpassword === confirmpassword) {
      const registerEmployee = new Register({
        Username: req.body.Username,
        emailaddress: req.body.emailaddress,
        phonenumber: req.body.phonenumber,
        ACN: req.body.ACN,
        DOB: req.body.DOB,
        BG: req.body.DOB,
        createpassword: createpassword,
        confirmpassword: confirmpassword,
      });

      const registered = await registerEmployee.save();

      // Redirect to the registration page
      res.redirect("/register");
    } else {
      // Handle invalid login credentials or mismatched passwords error
      res.status(400).send("Invalid email or password / Password and confirm password do not match");
    }
  } catch (error) {
    // Handle any other errors
    res.status(500).send("An error occurred during login or registration");
  }
});

app.listen(port, () => {
  console.log("Server is running at port", port);
});
