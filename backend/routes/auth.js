const express = require("express");
const User = require("../models/User");
// const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "farmanisjcjbgvdgwsv";
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchuser");

//sample checkking code
// router.post('/',(req,res)=>{
//   res.send(req.body)
//   const user=User(req.body)
//   user.save()
//  console.log(req.body)
// })

// Route :1 creating user through post request at /api/auth/creatuser  no login required

router.post(
  "/createuser",
  [
    body("name", "name must be atleast 5 characters").isLength({ min: 5 }),
    body("email", "enter a valid email!!").isEmail(),

    body("passward", "passward must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // res.send(req.body)
    //  const user=User(req.body)
    //  user.save()
    //  res.send(user)

    //if there are err return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // res.send(req.body)

    //check whether user exists with thiss email....

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "sorry email already in use!!" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.passward.toString(), salt);
      user = await User.create({
        name: req.body.name,
        passward: secPass,
        email: req.body.email,
      });

      //.then(user => res.json(user)).catch(err=>{console.log(err)
      //   res.json({error:'email already in use!!'})})

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("some error occured!!");
    }
  }
);

// Route :2 creating user through post request at /api/auth/login no login required

router.post(
  "/login",
  [
    body("email", "enter a valid email!!").isEmail(),
    body("passward", "passward cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    //if there are err return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, passward } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        res
          .status(400)
          .json({ success, error: "login with correct credientials...." });
        return;
      }
      const passwardcompare = await bcrypt.compare(
        passward.toString(),
        user.passward.toString()
      );
      if (!passwardcompare) {
        res
          .status(400)
          .json({ success, error: "login with correct credientials...." });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error occured!!");
    }
  }
);
// Route :3 get logged in user details. /api/auth/getuser  login required

router.post("/getuser", fetchUser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-passward");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error occured!!");
  }
});
module.exports = router;
