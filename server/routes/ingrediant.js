const router = require("express").Router();
const ingrediants = require("../models/ingrediant");

//getting all ingrediants
router.route("/").get((req, res) => {
  ingrediants
    .find()
    .then((ingrediant) => res.json(ingrediant))
    .catch((err) => res.status(400).json("Error :" + err));
});

//adding new ingrediant
router.route("/add").post((req, res) => {
  const ingrediant = req.body.ingrediant;
  const newIngrediant = new ingrediants({
    ingrediant,
  });

  newIngrediant
    .save()
    .then(() => res.json("ingrediants successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));
});

// getting one ingrediant
router.route("/:id").get((req, res) => {
  ingrediants
    .findById(req.params.id)
    .then((ingrediant) => res.json(ingrediant))
    .catch((err) => res.status(400).json("Error :" + err));
});

//deleting one product
router.route("/delete/:id").delete((req, res) => {
  ingrediants
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("ingediant successfully deleted"))
    .catch((err) => res.status(400).json("Error :" + err));
});

//updating one ingrediant
router.route("/update/:id").put((req, res) => {
  ingrediants
    .findById(req.params.id)
    .then((ingediant) => {
      ingediant.ingrediant = req.body.ingrediant;

      ingediant
        .save()
        .then(() => res.json("product successfully updated"))
        .catch((err) => res.status(400).json("Error :" + err));
    })
    .catch((err) => res.status(400).json("Error :" + err));
});

module.exports = router;
