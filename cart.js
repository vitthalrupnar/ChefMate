document.addEventListener("DOMContentLoaded", () => {
  displayCartRecipe();

  document.querySelector(".place-order-btn").addEventListener("click", () => {
    document.querySelector(".order-modal").classList.remove("hidden");
  });
});

// Function to add recipe to cart (prevent duplicates)
function addToCart(recipe) {
  let cart = JSON.parse(localStorage.getItem("recipeCart")) || [];

  // check if recipe already exists
  let existingIndex = cart.findIndex(item => item.name === recipe.name);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += 1; // increase quantity
  } else {
    recipe.quantity = 1; // new recipe with qty 1
    cart.push(recipe);
  }

  localStorage.setItem("recipeCart", JSON.stringify(cart));
  displayCartRecipe();
}

function displayCartRecipe() {
  let recipeCart = JSON.parse(localStorage.getItem("recipeCart")) || [];
  let cartContent = document.querySelector(".cart-content");
  let cartCountElem = document.querySelector(".cart-count");
  let totalPriceElem = document.querySelector(".total-price");

  cartContent.innerHTML = "";

  if (recipeCart.length === 0) {
    cartContent.innerHTML = `<h2><i>Your cart is empty. Start <a href="./index.html" class="addRecipes">adding recipes</a></i></h2>`;
    cartCountElem.textContent = "Items: 0";
    totalPriceElem.textContent = "Total: ₹0";
    return;
  }

  let total = 0;
  let totalItems = 0;

  recipeCart.forEach((recipes, index) => {
    let subtotal = recipes.caloriesPerServing * recipes.quantity;
    total += subtotal;
    totalItems += recipes.quantity;

    let productElem = document.createElement("div");
    productElem.setAttribute("class", "product-info");
    productElem.innerHTML = `
      <div class="recipe-img-title">
        <div class="recipe-img-container">
            <img src="${recipes.image}" alt="${recipes.name}" />
        </div>
        <div class="product-details">
          <div class="title">${recipes.name}</div>
          <div><b>Cuisine: </b>${recipes.cuisine}</div>
          <div><b>Price: </b>₹${recipes.caloriesPerServing}</div>
          <div class="quantity-controls">
            <button onclick="decreaseQuantity(${index})">-</button>
            <span>${recipes.quantity}</span>
            <button onclick="increaseQuantity(${index})">+</button>
          </div>
          <div><b>Subtotal: </b>₹${subtotal}</div>
          <button class="remove-btn" onclick="removeRecipeFromCart(${index})">Remove</button>
        </div>
      </div>
    `;
    cartContent.appendChild(productElem);
  });

  cartCountElem.textContent = `Items: ${totalItems}`;
  totalPriceElem.textContent = `Total: ₹${total}`;
}

function increaseQuantity(index) {
  let cart = JSON.parse(localStorage.getItem("recipeCart")) || [];
  cart[index].quantity += 1;
  localStorage.setItem("recipeCart", JSON.stringify(cart));
  displayCartRecipe();
}

function decreaseQuantity(index) {
  let cart = JSON.parse(localStorage.getItem("recipeCart")) || [];
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1); // remove if qty becomes 0
  }
  localStorage.setItem("recipeCart", JSON.stringify(cart));
  displayCartRecipe();
}

function removeRecipeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("recipeCart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("recipeCart", JSON.stringify(cart));
  displayCartRecipe();
}

function confirmOrder() {
  let name = document.getElementById("name").value;
  let address = document.getElementById("address").value;
  let phone = document.getElementById("phone").value;

  if (!name || !address || !phone) {
    alert("Please fill all details.");
    return;
  }

  alert(`Thank you ${name}! Your order will be delivered to ${address}.`);
  localStorage.removeItem("recipeCart"); // clear cart
  displayCartRecipe();
  closeModal();
}

function closeModal() {
  document.querySelector(".order-modal").classList.add("hidden");
}
