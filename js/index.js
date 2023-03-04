const main = document.querySelector("main");
const panier = document.getElementById("panier");

let dataCameras;

// Fonction qui fait une requete GET pour avoir le tableau des produits
async function getCameras() {
  await fetch("https://orinocamera-backend.onrender.com/api/cameras")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      dataCameras = data;
    })
    .catch(function (err) {
      // Une erreur est survenue
      main.textContent =
        "Erreur dans la récupération des produits depuis l'API.";
    });
}

// Fonction qui affiche les cameras
async function displayCameras() {
  await getCameras();
  main.innerHTML = dataCameras
    .map(
      (camera) =>
        `
      <div class="card" id="${camera._id}">
        <a href="produit.html?id=${camera._id}"><img src="${
          camera.imageUrl
        }" width="100%" height="200px" /><p>${camera.name} : ${
          camera.price / 100
        } €</p></a>
      </div>
    `
    )
    .join("");
}

function page() {
  displayCameras();
  if (localStorage.getItem("products")) {
    panier.setAttribute("class", "shiny");
  }
}

page();
