const router = require("express").Router();
const promo_code = require("../models/promo_code");

//getting all promo_codes
router.route("/").get((req, res) => {
  promo_code
    .find()
    .then((promo_code) => res.json(promo_code))
    .catch((err) => res.status(400).json("Error :" + err));
});

//adding new promo_code
router.route("/add").post((req, res) => {
  const code = req.body.code;
  const codeStatus = req.body.codeStatus;
  const newPromoCode = new promo_code({
    code,
    codeStatus,
  });

  newPromoCode
    .save()
    .then(() => res.json("promo code successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));
});

// getting one promo_code
router.route("/:id").get((req, res) => {
  promo_code
    .findById(req.params.id)
    .then((promo_code) => res.json(promo_code))
    .catch((err) => res.status(400).json("Error :" + err));
});

//deleting one promo_code
router.route("/delete/:id").delete((req, res) => {
  promo_code
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("prome code successfully deleted"))
    .catch((err) => res.status(400).json("Error :" + err));
});

//updating one promo_code
router.route("/update/:id").put((req, res) => {
  promo_code
    .findById(req.params.id)
    .then((promoCode) => {
      promoCode.code = req.body.code;
      promoCode.codeStatus = req.body.codeStatus;

      promoCode
        .save()
        .then(() => res.json("promo code successfully updated"))
        .catch((err) => res.status(400).json("Error :" + err));
    })
    .catch((err) => res.status(400).json("Error :" + err));
});

module.exports = router;
