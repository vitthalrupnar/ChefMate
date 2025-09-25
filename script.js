let allRecepies = []
async function addToLocalStorage() {
    try{
        let api = await fetch('https://dummyjson.com/recipes');
        let res = await api.json();

        allRecepies=res.recipes;
        localStorage.setItem("recipes", JSON.stringify(allRecepies))
        fetchRecipes(allRecepies)
    }
    catch (error) {
        console.error("Something went wrong:", error);
    }
}

addToLocalStorage()


// let a = localStorage.getItem("recipes")
// console.log(JSON.parse(a));


function fetchRecipes(items){
    let output='';

    items.map((i)=>{
        output+=`
           <div class='container' onclick="viewMorebtn(${i.id})">
                <img src='${i.image}'/>
                <div class='descp'>
                    <div class='name-review'>
                        <div class='product-name'>${i.name}</div>
                        <div class='rating'>
                            <p>${i.rating}</p>
                            <i class="bi bi-star-fill"></i>
                        </div>
                    </div>
                    <p>Review Count: ${i.reviewCount}</p>
                    <div>cuisine : ${i.cuisine}</div>
                </div>
            </div>   
        `
        // console.log(i.image);
    })
    document.querySelector('.recipes-container').innerHTML=output
}


// let container = document.querySelector('.container');
// container.addEventListener("click", ()=>{
//     localStorage.setItem('recipesId', JSON.stringify(recipesId))
//     window.location.href='./moreDetail.html'
//     console.log('jvere');
// })
function viewMorebtn(recipesId){
    localStorage.setItem('recipesId', JSON.stringify(recipesId))
    window.location.href='./moreDetail.html'
    console.log('jvere');
}
window.viewMorebtn = viewMorebtn;

function cartPageOpen(){
    window.location.href="./cart.html"
}


//!Search Recipes
document.querySelector('.search-input').addEventListener('input',(e)=>{
    let searchProduct = e.target.value.toLowerCase();
    console.log(searchProduct);

    let filterRecipes = allRecepies.filter((val)=>{
        return(
            val.name.toLowerCase().includes(searchProduct)
        );
    })
    fetchRecipes(filterRecipes)
})


let hamburger = document.querySelector('.hamburger')
let rightSideNav = document.querySelector(".right-side")
hamburger.addEventListener("click", () => {
    rightSideNav.style.display="block"
    
});