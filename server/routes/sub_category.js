const router = require("express").Router();
const sub_category = require("../models/sub_category");
let sub_Category = require("../models/sub_category");

//getting all sub_categories
router.route("/").get((req, res) => {
  sub_Category
    .find()
    .then((sub_categories) => res.json(sub_categories))
    .catch((err) => res.status(400).json("Error :" + err));
});

//adding new sub_category
router.route("/add").post((req, res) => {
  const id_category = req.body.id_category;
  const sub_categoryName = req.body.sub_categoryName;
  const newSub_Category = new sub_Category({
    id_category,
    sub_categoryName,
  });

  newSub_Category
    .save()
    .then(() => res.json("category successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));
});

// getting one sub_category
router.route("/:id").get((req, res) => {
  sub_category
    .findById(req.params.id)
    .then((sub_category) => res.json(sub_category))
    .catch((err) => res.status(400).json("Error :" + err));
});

//deleting one sub_category
router.route("/delete/:id").delete((req, res) => {
  sub_category
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("sub_category successfully deleted"))
    .catch((err) => res.status(400).json("Error :" + err));
});

//updating one sub_category
router.route("/update/:id").put((req, res) => {
  sub_category
    .findById(req.params.id)
    .then((sub_cat) => {
      sub_cat.id_category = req.body.id_category;
      sub_cat.sub_categoryName = req.body.sub_categoryName;

      sub_cat
        .save()
        .then(() => res.json("sub_cat successfully updated"))
        .catch((err) => res.status(400).json("Error :" + err));
    })
    .catch((err) => res.status(400).json("Error :" + err));
});

module.exports = router;
