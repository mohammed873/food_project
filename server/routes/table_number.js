const router = require("express").Router();
const tableNumber = require("../models/table_number");

//getting all table_numbers
router.route("/").get((req, res) => {
  tableNumber
    .find()
    .then((table_number) => res.json(table_number))
    .catch((err) => res.status(400).json("Error :" + err));
});

//adding new table_number
router.route("/add").post((req, res) => {
  const table_number = req.body.table_number;
  const tableStatus = req.body.tableStatus;
  const newTableNumber = new tableNumber({
    table_number,
    tableStatus,
  });

  newTableNumber
    .save()
    .then(() => res.json("table number successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));
});

// getting one promo_code
router.route("/:id").get((req, res) => {
  tableNumber
    .findById(req.params.id)
    .then((promo_code) => res.json(promo_code))
    .catch((err) => res.status(400).json("Error :" + err));
});

//deleting one product
router.route("/delete/:id").delete((req, res) => {
  tableNumber
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("table number successfully deleted"))
    .catch((err) => res.status(400).json("Error :" + err));
});

//updating one product
router.route("/update/:id").put((req, res) => {
  tableNumber
    .findById(req.params.id)
    .then((table_number) => {
      table_number.tableNumber = req.body.tableNumber;
      table_number.tableStatus = req.body.tableStatus;

      table_number
        .save()
        .then(() => res.json("table number successfully updated"))
        .catch((err) => res.status(400).json("Error :" + err));
    })
    .catch((err) => res.status(400).json("Error :" + err));
});

module.exports = router;
