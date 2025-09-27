
let allRecepies = [];

// Fetch recipes from API and store in localStorage
async function fetchAndStoreRecipes() {
    try {
        const api = await fetch('https://dummyjson.com/recipes');
        const res = await api.json();
        allRecepies = res.recipes;
        localStorage.setItem("recipes", JSON.stringify(allRecepies));
        displayRecipes(allRecepies);
    } catch (error) {
        console.error("Something went wrong:", error);
    }
}

fetchAndStoreRecipes();

// Display recipes
function displayRecipes(items) {
    let output = '';
    items.forEach(recipe => {
        output += `
            <div class='container' onclick="viewMore(${recipe.id})">
                <img src='${recipe.image}' alt='${recipe.name}' />
                <div class='descp'>
                    <div class='name-review'>
                        <div class='product-name'>${recipe.name}</div>
                        <div class='rating'>
                            <p>${recipe.rating}</p>
                            <i class="bi bi-star-fill"></i>
                        </div>
                    </div>
                    <p>Review Count: ${recipe.reviewCount}</p>
                    <div>Cuisine: ${recipe.cuisine}</div>
                </div>
            </div>
        `;
    });
    document.querySelector('.recipes-container').innerHTML = output;
}

// View more button
function viewMore(recipeId) {
    localStorage.setItem('recipesId', JSON.stringify(recipeId));
    window.location.href = './moreDetail.html';
}
window.viewMore = viewMore;

// Cart page
function cartPageOpen() {
    window.location.href = "./cart.html";
}

// Search functionality
document.querySelector('.search-input').addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = allRecepies.filter(recipe =>
        recipe.name.toLowerCase().includes(searchValue)
    );
    displayRecipes(filtered);
});

// Hamburger toggle
const hamburger = document.querySelector('.hamburger');
const rightSideNav = document.querySelector('.right-side');

if (hamburger && rightSideNav) {
    const icon = hamburger.querySelector('i');

    hamburger.addEventListener('click', () => {
        const isOpen = rightSideNav.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
        rightSideNav.style.maxHeight = isOpen ? rightSideNav.scrollHeight + 'px' : null;

        if (icon) {
            if (isOpen) {
                icon.classList.replace('bi-list', 'bi-x');
            } else {
                icon.classList.replace('bi-x', 'bi-list');
            }
        }
    });

    // Reset menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            rightSideNav.classList.remove('open');
            rightSideNav.style.maxHeight = null;
            hamburger.setAttribute('aria-expanded', 'false');
            if (icon) icon.classList.replace('bi-x', 'bi-list');
        }
    });
}