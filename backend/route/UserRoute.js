const express = require("express");
const router = express.Router();
const cont = require("../controller/UserAuthController");

router.post("/usersignup", cont.userSignUp);
router.get("/protect", cont.protect, (req, res) => {
  res.status(200).json({
    status: "success",
    user: req.user,
  });
});

module.exports = router;
