//adding new table number
async function addTablenumber() {
  let tableNumber = Math.floor(Math.random() * 15 + 1);
  await axios
    .post("http://localhost:5000/table/add", {
      table_number: tableNumber,
      tableStatus: false,
    })
    .then(function (response) {
      window.location.href = "./table.html";
    })
    .catch(function (error) {
      console.log(error);
    });
}

//Getting all tables number and display them in aform of a QR
async function getNumber() {
  var show = document.getElementById("td_body");
  var shoDiv = document.querySelector("#divShow");
  await axios
    .get("http://localhost:5000/table")
    .then(function (response) {
      const data = response.data;
      console.log(data);
      data.map((num) => {
        $("#divShow").append(`<hr>`);
        $("#td_body").append(new QRCode(shoDiv, `${num.table_number}`));
        $("#divShow").append(
          `<button class="btn btn-danger" onclick="deleteTableNum('${num._id}')" >delete</button>`
        );
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}
getNumber();

//deleting a single table number
async function deleteTableNum(id) {
  await axios
    .delete("http://localhost:5000/table/delete/" + id)
    .then(function (response) {
      window.location.href = "../views/table.html";
    })
    .catch(function (error) {
      console.log(error);
    });
}
