document.addEventListener("DOMContentLoaded", ()=>{
    displayCartRecipe()
})

function displayCartRecipe(){
    let recipeCart = JSON.parse(localStorage.getItem("recipeCart"))
    let cartContent = document.querySelector(".cart-content")

    // console.log("cartttttttt",cart);

    cartContent.innerHTML="";

    if(recipeCart.length === 0){
        cartContent.innerHTML = `<h1><i>Your cart is empty start <a href="./index.html" class="addRecipes">Add Recipes</a></i></h1>`
        
    }
    recipeCart.map((recipes, index)=>{
        let productElem = document.createElement("div")
        productElem.setAttribute("class", "product-info");
        productElem.innerHTML=`
            <div class="recipe-img-title">
                <img src="${recipes.image}"/>
                <div class="product-details">
                    <div class="title">${recipes.name}</div>
                    <div class="product-shippingStatus"><b>Cuisine: </b>${recipes.cuisine}</div>
                    <button class="remove-btn" onclick="removeRecipeFromCart(${index})">Remove</button>
                </div>
            </div>
        
        `
        cartContent.appendChild(productElem)

    })
}

function removeRecipeFromCart(index){
    let cart = JSON.parse(localStorage.getItem("recipeCart"))||[]
    cart.splice(index, 1)
    localStorage.setItem("recipeCart", JSON.stringify(cart))
    displayCartRecipe()
    console.log(cart);
}