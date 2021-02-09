const router = require("express").Router();
const Category = require("../models/category");
// var multer = require("multer");

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpej" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// var upload = multer({
//   storage: storage,
//   limits: {
//     storage: storage,
//     fileSize: 1024 * 1024 * 8,
//   },
//   fileFilter: fileFilter,
// });

//getting all categories
router.route("/").get((req, res) => {
  Category.find()
    .then((categories) => res.json(categories))
    .catch((err) => res.status(400).json("Error :" + err));
});

//adding new category
// upload.single("categoryPicture"),
router.route("/add").post((req, res, next) => {
  // const categoryPicture = req.file.path;
  const categoryName = req.body.categoryName;
  const newCategory = new Category({
    categoryName,
    // categoryPicture,
  });

  newCategory
    .save()
    .then((data) => {
      console.log(data);
      res.json("category successfully added");
    })
    .catch((err) => res.status(400).json("Error :" + err));
});

// getting one category
router.route("/:id").get((req, res) => {
  Category.findById(req.params.id)
    .then((category) => res.json(category))
    .catch((err) => res.status(400).json("Error :" + err));
});

//deleting one category
router.route("/delete/:id").delete((req, res) => {
  Category.findByIdAndDelete(req.params.id)
    .then(() => res.json("category successfully delted"))
    .catch((err) => res.status(400).json("Error :" + err));
});

//updating one category
router.route("/update/:id").put((req, res) => {
  Category.findById(req.params.id)
    .then((cat) => {
      cat.categoryName = req.body.categoryName;

      cat
        .save()
        .then(() => res.json("cat successfully updated"))
        .catch((err) => res.status(400).json("Error :" + err));
    })
    .catch((err) => res.status(400).json("Error :" + err));
});

module.exports = router;
