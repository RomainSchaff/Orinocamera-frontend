const main = document.querySelector("main");
const panier = document.getElementById("panier");
const displayProduct = document.getElementById("displayProduct");
let params = new URL(document.location).searchParams;
let id = params.get("id");
let dataCamera;

// Ajoute la selection au localStorage
function addCameraToStorage() {
  const addPanier = document.getElementById("addPanier");
  addPanier.addEventListener("click", () => {
    let quantity = document.getElementById("quantity").value;
    let lense = document.getElementById("lenses-select").value;
    let name = dataCamera.name;
    let price = dataCamera.price / 100;
    let id = dataCamera._id;
    let optionsProduct = {
      name,
      lense,
      price: parseInt(price),
      quantity: parseInt(quantity) ? parseInt(quantity) : 1,
      imageUrl: dataCamera.imageUrl,
      _id: id,
    };

    let allProducts = [];
    // Si le localStorage existe on récupère son contenu et on l'ajoute à notre tableau puis on le renvoie dans le localeStorage
    if (localStorage.getItem("products")) {
      allProducts = JSON.parse(localStorage.getItem("products"));
    }
    // On test si la caméra existe déjà dans le panier, si c'est le cas on ajuste la quantité dans notre localStorage
    for (i = 0; i < allProducts.length; i++) {
      if (
        allProducts[i].name == optionsProduct.name &&
        allProducts[i].lense == optionsProduct.lense
      ) {
        optionsProduct.quantity += allProducts[i].quantity;
        allProducts.splice(i, 1);
      }
    }
    if (!optionsProduct.lense == "") {
      allProducts.push(optionsProduct);
      localStorage.setItem("products", JSON.stringify(allProducts));
      alert(`la camera : ${dataCamera.name} est ajoutée au panier !`);
      document.location.href = "panier.html";
    } else {
      alert("Vous devez choisir une lentille pour votre caméra");
    }
  });
}

// Demande une camera sélectionnée
async function getOneCamera() {
  await fetch(`https://orinocamera-backend.onrender.com/api/cameras/${id}`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      dataCamera = data;
    })
    .catch(function (err) {
      // Une erreur est survenue
      main.textContent = "Une erreur est survenue !!";
    });
}

// Affiche une caméra
async function displayOneCamera() {
  await getOneCamera();
  displayProduct.innerHTML = `
      <img src="${dataCamera.imageUrl}" height="250px" />
      <p id="name">${dataCamera.name} : ${dataCamera.price / 100}€ </p>
      <p id="description">${dataCamera.description}</p>
    `;
  document.getElementById("lenses-select").innerHTML += dataCamera.lenses.map(
    (lense) =>
      `
        <option value="${lense}">${lense}</option>
      `
  );
}

//Fonction qui affiche la bonne page et permet l'ajout de la caméra au localStorage
function page() {
  displayOneCamera();
  addCameraToStorage();
  if (localStorage.getItem("products")) {
    panier.setAttribute("class", "shiny");
  }
}

page();
