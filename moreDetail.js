document.addEventListener('DOMContentLoaded', ()=>{
    let recipesId = localStorage.getItem("recipesId");
    let allRecepies = JSON.parse(localStorage.getItem('recipes'))
    // console.log(recipesId);
    // console.log(allRecepies);
    // console.log(JSON.parse(allRecepies));

    let allRecepiesDetails = document.querySelector('.moreDetails-container')

    if(recipesId && allRecepies){
        let selectedRecipes = allRecepies.find((v)=>{
            // console.log(v.id==recipesId);
            return v.id==recipesId;
        })

        if(selectedRecipes){
            allRecepiesDetails.innerHTML=`
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
                            <b>Cuisine: </b>${selectedRecipes.cuisine} Min <br>
                            <b>Meal Type: </b>${selectedRecipes.mealType}

                            <button class="cart-btn")">Add to Cart</button>
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
                            <div>${selectedRecipes.ingredients.map((v)=>{
                                return `
                                    <ul>
                                        <li>${v}</li>
                                    </ul>
                                `
                            }).join('')}</div>
                        </div>
                        <div class="instructions">
                            <h2>Instructions</h2>
                            <div>${selectedRecipes.instructions.map((v)=>{
                                return `
                                    <ul>
                                        <li>${v}</li>
                                    </ul>
                                `
                            }).join('')}</div>
                        </div>
                    </div>
                </div>

                <footer>
                    <p>Copyright &copy ChefMate. All rights reserved.</p>
                </footer>
                
            `
            // console.log(selectedRecipes.image);

            document.querySelector('.cart-btn').addEventListener('click', ()=>{
                addToCart(selectedRecipes)
            })
        }



    }else{
        productDetails.innerHTML = `<p>Product not found</p>`;
    }
})


function backToHome(){
    window.location.href="./index.html"
}

function addToCart(recepieId){
    let recipeCart = JSON.parse(localStorage.getItem("recipeCart"))||[]
    recipeCart.push(recepieId)
    localStorage.setItem("recipeCart", JSON.stringify(recipeCart))
    console.log(recepieId);
    alert("Recipes added Successfully....")

}





                            // <div><img src="https://images.pexels.com/photos/691114/pexels-photo-691114.jpeg?cs=srgb&dl=pexels-daniela-elena-tentis-118658-691114.jpg&fm=jpg"/></div>

                            
                            // <div><img src="${selectedRecipes.image}"/></div>