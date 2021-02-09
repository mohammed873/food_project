//ading new promo code
async function addPromocode() {
  let code = Math.floor(100000 + Math.random() * 900000);
  await axios
    .post("http://localhost:5000/code/add", {
      code: code,
      codeStatus: false,
    })
    .then(function (response) {
      window.location.href = "./promo.html";
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//Getting all promo codes and display them in aform of a QR
async function getCode() {
  var show = document.getElementById("td_body")
  var shoDiv = document.querySelector('#divShow')
  await axios
    .get("http://localhost:5000/code")
    .then(function (response) {
      const data = response.data;
      console.log(data)
      data.map(num => {
        $('#divShow').append(`<hr>`)
        $('#td_body').append(new QRCode(shoDiv, `${num.code}`))
        $('#divShow').append(`<button class="btn btn-danger" onclick="deleteCode('${num._id}')" >delete</button>`)
      })
    })
    .catch(function (error) {
      console.log(error);
    });
}
getCode();

//deleting a single promo code
async function deleteCode(id) {
  await axios
    .delete("http://localhost:5000/code/delete/" + id)
    .then(function (response) {
      window.location.href = "../views/promo.html";
    })
    .catch(function (error) {
      console.log(error);
    });
}