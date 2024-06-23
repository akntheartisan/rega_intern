const express = require("express");
const router = express.Router();
const cont = require("../controller/UserAuthController");

router.post("/usersignup", cont.userSignUp);
router.post("/signin", cont.userSignIn);
router.post("/profileupdate", cont.profileUpdate);
router.get("/protect", cont.protect, (req, res) => {
  res.status(200).json({
    status: "success",
    user: req.user,
  });
});

router.get("/getprofiledata", cont.getProfileData, (req, res) => {
  res.status(200).json({
    status: "success",
    profile: req.profile,
  });
});

module.exports = router;
