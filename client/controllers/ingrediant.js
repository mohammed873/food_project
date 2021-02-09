const url2 = "http://localhost:5000/ingrediant/";

//get all ingrediants and display them in a table
async function getCatS() {
  await axios
    .get(url2)
    .then(function (response) {
      const data = response.data;
      for (let i = 0; i < data.length; i++) {
        var option = `
              <tr>
                <td>${data[i].ingrediant}</td>
                <td>
                   <button class="btn btn-success editIngredinat"  data-toggle="modal"
                   data-target=".bd-example-modalEditIngrediant-lg" data-id="${data[i]._id}">Edit</button>
                   <button class="btn btn-danger"  onclick="deleteIngrediant('${data[i]._id}')" value="${data[i]._id}">Delete</button>
                </td>
              </tr>
              
          `;
        document.getElementById("ingrediant_tbody").innerHTML += option;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
getCatS();

//add new ingrediant
async function addingrediant() {
  let ingrediantName = document.getElementById("ingrediantName").value;
  await axios
    .post("http://localhost:5000/ingrediant/add", {
      ingrediant: ingrediantName,
    })
    .then(function (response) {
      window.location.href = "./dashboard.html";
    })
    .catch(function (error) {
      console.log(error);
    });
}

//get all ingrediants
async function getIngrediant() {
  await axios
    .get(url2)
    .then(function (response) {
      const data = response.data;
      for (let i = 0; i < data.length; i++) {
        var option = `<option value="${data[i]._id}">${data[i].ingrediant}</option>
        `;
        document.getElementById("ingrediant_list").innerHTML += option;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
getIngrediant();

//deleting a single ingrediant
async function deleteIngrediant(id) {
  await axios
    .delete("http://localhost:5000/ingrediant/delete/" + id)
    .then(function (response) {
      window.location.href = "../views/dashboard.html";
    })
    .catch(function (error) {
      console.log(error);
    });
}

//upadting one ingrediant
async function updateIngrediant() {
  let ingrediant = document.querySelector("#ingrediantNameE").value;
  var id = document.getElementById("ingredian_idE").value;
  await axios
    .put(`http://localhost:5000/ingrediant/update/${id}`, {
      ingrediant: ingrediant,
    })
    .then(function (response) {
      window.location.href = "../views/dashboard.html";
    })
    .catch(function (error) {
      console.log(error);
    });
}

//getting id after clicking edit
$(document).on("click", ".editIngredinat", function (e) {
  e.preventDefault();
  var _self = $(this);
  var myBookId = _self.data("id");
  document.getElementById("ingredian_idE").value = myBookId;
});
