document.addEventListener("DOMContentLoaded", () => {
  let recipesId = localStorage.getItem("recipesId");
  let allRecepies = JSON.parse(localStorage.getItem("recipes"));
  let allRecepiesDetails = document.querySelector(".moreDetails-container");

  if (recipesId && allRecepies) {
    let selectedRecipes = allRecepies.find((v) => v.id == recipesId);

    if (selectedRecipes) {
      allRecepiesDetails.innerHTML = `
        <div class="viewMoreContainer">
          <div class="name-rating">
            <div class="recepie-name">${selectedRecipes.name}</div>
            <div class="rating-container">
              <div class="reviewCount">
                <p>Review Count: ${selectedRecipes.reviewCount}</p>
              </div>
              <div class="actual-rating">
                <div class='recepie-rating'>
                  <p>${selectedRecipes.rating}</p>
                  <i class="bi bi-star-fill"></i>
                </div>
                <p class="deliveryRating">Delivery Ratings</p>
              </div>
            </div>
          </div>

          <div class="recepie-img-cart">
            <div class="recepie-img">
              <div><img src="${selectedRecipes.image}"/></div>
            </div>
            <div class="cart-tags">
              <b>Tags: </b>${selectedRecipes.tags}<br>
              <b>Cuisine: </b>${selectedRecipes.cuisine} <br>
              <b>Meal Type: </b>${selectedRecipes.mealType} <br>
              <b>Price: </b>₹${selectedRecipes.caloriesPerServing}

              <button class="cart-btn">Add to Cart</button>
              <button class="back-home" onclick="backToHome()">Back to Home</button>
            </div>
          </div>

          <div class="view-more-about-recepie">
            <div class="overview">
              <h2 class="overview-content">Overview</h2>
              <ul>
                <li>Cuisine: ${selectedRecipes.cuisine}</li>
                <li>Preparation Time: ${selectedRecipes.prepTimeMinutes} Min</li>
                <li>Cook Time: ${selectedRecipes.cookTimeMinutes} Min</li>
              </ul>
            </div>
            <div class="ingredients">
              <h2>Ingredients</h2>
              <div>${selectedRecipes.ingredients
                .map((v) => `<ul><li>${v}</li></ul>`)
                .join("")}</div>
            </div>
            <div class="instructions">
              <h2>Instructions</h2>
              <div>${selectedRecipes.instructions
                .map((v) => `<ul><li>${v}</li></ul>`)
                .join("")}</div>
            </div>
          </div>
        </div>
      `;

      // Attach cart button listener
      document.querySelector(".cart-btn").addEventListener("click", () => {
        addToCart(selectedRecipes);
      });
    }
  } else {
    allRecepiesDetails.innerHTML = `<p>Product not found</p>`;
  }
});

function backToHome() {
  window.location.href = "./index.html";
}

// ✅ Updated addToCart (no duplicates)
function addToCart(recipe) {
  let recipeCart = JSON.parse(localStorage.getItem("recipeCart")) || [];

  // Check if recipe already exists
  let existingIndex = recipeCart.findIndex((item) => item.id === recipe.id);

  if (existingIndex !== -1) {
    // If already in cart → increase quantity
    recipeCart[existingIndex].quantity += 1;
  } else {
    // New recipe → add with quantity = 1
    recipe.quantity = 1;
    recipeCart.push(recipe);
  }

  localStorage.setItem("recipeCart", JSON.stringify(recipeCart));
  alert("Recipe added to cart successfully!");
}

// Hamburger toggle
const hamburger = document.querySelector(".hamburger");
const rightSideNav = document.querySelector(".right-side");

if (hamburger && rightSideNav) {
  const icon = hamburger.querySelector("i");

  hamburger.addEventListener("click", () => {
    const isOpen = rightSideNav.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen);
    rightSideNav.style.maxHeight = isOpen
      ? rightSideNav.scrollHeight + "px"
      : null;

    if (icon) {
      if (isOpen) {
        icon.classList.replace("bi-list", "bi-x");
      } else {
        icon.classList.replace("bi-x", "bi-list");
      }
    }
  });

  // Reset menu on window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      rightSideNav.classList.remove("open");
      rightSideNav.style.maxHeight = null;
      hamburger.setAttribute("aria-expanded", "false");
      if (icon) icon.classList.replace("bi-x", "bi-list");
    }
  });
}

function cartPageOpen() {
  window.location.href = "./cart.html";
}
