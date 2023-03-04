const main = document.querySelector("section");
const inputs = document.querySelectorAll(
  'input[type="text"], input[type="email"]'
);
const order = document.getElementById("order");

// Vérifie si il y a des items dans le panier, si oui on affiche chaque item dans le recap
function displayPanier() {
  if (localStorage.products == null) {
    main.innerHTML = `<p>Panier vide</p>`;
    let path = "../images/areukidding.gif";
    main.innerHTML += `<img src="${path}">`;
  } else {
    let storage = JSON.parse(localStorage.products);
    let total = 0;
    for (let i = 0; i < storage.length; i++) {
      total += storage[i].price * storage[i].quantity;
    }
    document.getElementById("table").innerHTML += storage
      .map(
        (store) =>
          `
            <tbody>
              <tr>
                <td>${store.name}</td>
                <td><img src="${
                  store.imageUrl
                }" width="150px" height="100px" /></td>
                <td>${store.lense}</td>
                <td>${store.price}€</td>
                <td>${store.quantity}</td>
                <td><button class="removeItem" id="${storage.indexOf(
                  store
                )}"> X </button></td>
              </tr>
            </tbody>
      `
      )
      .join("");
    document.getElementById("table").innerHTML += `<tfoot>
    <tr> 
    <th colspan="6" id="total" data-total=${total} >Prix total: ${total}€ </th>
    </tr>
  </tfoot>`;
    // Supprimer un élément du localStorage
    document.querySelectorAll(".removeItem").forEach((item) => {
      item.addEventListener("click", () => {
        if (storage.length == 1) {
          localStorage.clear();
        } else {
          storage.splice(item.id, 1);
          localStorage.setItem("products", JSON.stringify(storage));
        }
        alert(`Vous avez supprimer: ${storage[item.id].name}`);
        location.reload();
      });
    });
  }
}

// Création du bouton qui vide le panier donc qui efface ce qu'il y a dans le localStorage
function clearPanier() {
  let clearButton = document.getElementById("clear");
  if (clearButton !== null) {
    clearButton.addEventListener("click", () => {
      localStorage.clear();
      alert("Le panier vient d'être vidé !");
      location.reload();
    });
  }
}

//Vérification si le formulaire est rempli correctement
function confirmForm() {
  //Vérification si le formulaire est complet
  function formFull() {
    order.addEventListener("click", (e) => {
      e.preventDefault();
      error.textContent = "";
      let errorDisplay = 0;
      inputs.forEach((input) => {
        if (input.value == "") {
          errorDisplay++;
        }
      });
      if (errorDisplay > 1) {
        alert(`${errorDisplay} champs ne sont pas remplis`);
      } else if (errorDisplay == 1) {
        alert(`${errorDisplay} champ n'est pas rempli`);
      }
    });
  }
  formFull();

  let lastName, firstName, city, cityCode, address, phone, email;

  // Vérification si les données sont correct pour le lastName:
  function lastNameChecker(value) {
    if (value.length > 0 && (value.length < 3 || value.length > 20)) {
      error.textContent = "";
      error.textContent += "Le nom doit faire entre 3 et 20 caractères";
      lastName = null;
    } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
      error.textContent = "";
      error.textContent += "Le nom ne doit pas contenir de caractères spéciaux";
      lastName = null;
    } else {
      lastName = value;
    }
  }
  // Vérification si les données sont correct pour le firstName:
  function firstNameChecker(value) {
    if (value.length > 0 && (value.length < 3 || value.length > 20)) {
      error.textContent = "";
      error.textContent += "Le prénom doit faire entre 3 et 20 caractères";
      firstName = null;
    } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
      error.textContent = "";
      error.textContent +=
        "Le prénom ne doit pas contenir de caractères spéciaux";
      firstName = null;
    } else {
      firstName = value;
    }
  }
  // Vérification si les données sont correct pour la ville:
  function cityChecker(value) {
    if (value.length > 0 && (value.length < 3 || value.length > 30)) {
      error.textContent = "";
      error.textContent += "La ville doit faire entre 3 et 20 caractères";
      city = null;
    } else if (
      !value.match(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?:[-\s][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/)
    ) {
      error.textContent = "";
      error.textContent +=
        "La ville ne doit pas contenir de caractères spéciaux, de nombre ou de ponctuation.";
      city = null;
    } else {
      city = value;
    }
  }
  // Vérification si les données sont correct pour le code postal:
  function cityCodeChecker(value) {
    if (!value.match(/^(?:[0-8]\d|9[0-8])\d{3}$/)) {
      error.textContent = "";
      error.textContent +=
        "Le code postal doit se composer de 5 chiffres en France";
      cityCode = null;
    } else {
      cityCode = value;
    }
  }
  // Vérification si les données sont correct pour l'addresse:
  function addressChecker(value) {
    if (value.length > 0 && (value.length < 3 || value.length > 50)) {
      error.textContent = "";
      error.textContent += "L'adresse doit faire entre 3 et 50 caractères";
      address = null;
    } else {
      address = value;
    }
  }
  // Vérification du numéro de téléphone
  function phoneChecker(value) {
    if (!value.match(/(0|\\+33|0033)[1-9][0-9]{8}/)) {
      error.textContent = "";
      error.textContent += "Le numéro de téléphone n'est pas valide";
      phone = null;
    } else {
      phone = value;
    }
  }
  // Vérification du mail
  function emailChecker(value) {
    if (!value.match(/[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
      error.textContent = "";
      error.textContent += "L'email n'est pas valide";
      email = null;
    } else {
      email = value;
    }
  }

  order.addEventListener("click", (e) => {
    e.preventDefault();
    inputs.forEach((input) => {
      switch (input.id) {
        case "lastName":
          lastNameChecker(input.value);
          break;
        case "firstName":
          firstNameChecker(input.value);
          break;
        case "city":
          cityChecker(input.value);
          break;
        case "cityCode":
          cityCodeChecker(input.value);
          break;
        case "address":
          addressChecker(input.value);
          break;
        case "phone":
          phoneChecker(input.value);
          break;
        case "email":
          emailChecker(input.value);
          break;
        default:
          nul;
      }
    });
    // Si tout les champs sont bien rempli selon les conditions REGEX
    if (
      lastName &&
      firstName &&
      city &&
      address &&
      email &&
      cityCode &&
      phone
    ) {
      let allProducts = JSON.parse(localStorage.products);

      let productsId = [];
      for (i = 0; i < allProducts.length; i++) {
        productsId.push(allProducts[i]._id);
      }

      const order = {
        contact: {
          firstName,
          lastName,
          address,
          city,
          email,
        },
        products: productsId,
      };

      // Récupération du prix total des produits pour le stocké dans le localStorage après le post
      let totalPrice = document
        .getElementById("total")
        .getAttribute("data-total");
      // Méthode POST qui récupère l'orderId puis on le stock dans le localStorage
      fetch("https://orinocamera-backend.onrender.com/api/cameras/order", {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "Content-Type": "application/json" },
      })
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function (data) {
          console.log(data);
          localStorage.removeItem("products");
          localStorage.setItem("orderId", data.orderId);
          localStorage.setItem("total", totalPrice);
          document.location.href = "confirmation.html";
        })
        .catch(function (err) {
          alert("Erreur sur la requete post : " + err);
        });
      alert("Commande envoyée !");
    } else {
      alert("Veuillez remplir correctement le formulaire");
    }
  });
}

// Affichage de la page et de toutes ses fonctionnalités
function page() {
  displayPanier();
  clearPanier();
  confirmForm();
  if (localStorage.getItem("products")) {
    panier.setAttribute("class", "shiny");
  }
}
page();
