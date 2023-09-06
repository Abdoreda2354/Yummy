 /// <reference types="../@types/jquery" />
//**************************************************************** 
//?=============================​‌‌‌‍navBar​======================== 

//**************************************************************** 
function openNavBar() {
    $('.leftMenue').animate({
        left:  0,
        width: "260px"
    } , 500)
    $('#open').addClass('d-none')
    $('#close').removeClass('d-none')
    for (let i = 0; i < 5; i++) {
        $(".leftMenue .items li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}
function closeNavBar() {
    $('.leftMenue').animate({
        left: "-250px",
        width: 0
    } , 500)

    
 $('#close').addClass('d-none')
    $('#open').removeClass('d-none')
    for (let i = 0; i < 5; i++) {
        $(".leftMenue .items li").eq(i).animate({
            top: "300px"
        }, 100)
    }
}
function closenav() {
    $('.navbarlinks').slideUp(500);
    
}
$('.navbar-toggler').on('click' ,()=>{
    $('.navbarlinks').slideDown();

})
$('#open').on('click' , function(){
    openNavBar()
})
$('#close').on('click' , function(){
    closeNavBar();
})

//!====================================================================
let mediaQuery = window.matchMedia("(max-width: 576.9808px)");
if (mediaQuery.matches) {
   $('.navbar').removeClass('d-none')
   $('.sideNaveBar').addClass('d-none')
} else {
   $('.navbar').addClass('d-none')
   $('.sideNaveBar').removeClass('d-none')

}
function handleMediaQueryChange(mediaQuery) {
   if (mediaQuery.matches) {
       $('.navbar').removeClass('d-none')
       $('.sideNaveBar').addClass('d-none')
   } else {
       $('.navbar').addClass('d-none')
       $('.sideNaveBar').removeClass('d-none')

   }
 }
 $(window).on( 'resize',function() {
    var mediaQuery = window.matchMedia("(max-width: 576.9808px)");
      handleMediaQueryChange(mediaQuery);
      mediaQuery.addListener(handleMediaQueryChange);
  });

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//**************************************************************** 

//?=============================​‌‌‌𝗛𝗼𝗺𝗲​ ========================  

//**************************************************************** 


let homeData;
let data = ``
async function getDataHome() {
    $('#Main').ready(function(){
    $(".inner-loading").fadeOut(0)
        $('.loading').fadeIn(300);  
        $('body').css('overflow' , 'hidden');
      })
    let recipes = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let  response =await recipes.json()
    homeData = response.meals;
    displayDataHome(); 
    $('#Main').ready(function(){
        $('.loading').fadeOut(300);  
        $('body').css('overflow' , 'visible'); 
        $('nav').css({'cssText':` left: 0; `});
      })
}
function displayDataHome() {
    for (let i = 0; i < homeData.length; i++) {
        data += `
        <div class=" col-sm-6 col-md-3  ">
        <div class="img position-relative" onclick="getMealDetails(${homeData[i].idMeal})">
            <img src="${homeData[i].strMealThumb}" alt="not found"  class="w-100">
            <div class="imgdetails position-absolute d-flex align-items-center">
                <h3 >${homeData[i].strMeal}</h3>
            </div>
        </div>

    </div>
        `
    $('#homedata').html(data);
    $('#searchInputs').html(searchInput);  
    }
    
}
async function AppStart() {
    await getDataHome() 
    await displayDataHome() 
}
AppStart();
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//**************************************************************** 

//?======================​‌‌‌𝗰𝗮𝘁𝗲𝗴𝗼𝗿𝘆​========================

//**************************************************************** 

let categoryData ;
async function getCategoryData() {
    $('#homedata').html(" ");
    $(".inner-loading").fadeIn(300);
    $('#searchInputs').html(" ");
    let categoryrecipes = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let  categoryresponse =await categoryrecipes.json()
    categoryData = categoryresponse.categories;
    displayCategory();
    $(".inner-loading").fadeOut(300);

}
function displayCategory() {
    data= ``;
    searchInput=``;
    for (let i = 0; i < categoryData.length; i++) {
        data += `
        <div class=" col-sm-6 col-md-3  ">
        <div class="img  position-relative">
            <img src="${categoryData[i].strCategoryThumb}" alt="not found"  class="w-100">
            <div class="imgdetails position-absolute ">
                <h3 class="text-center mt-2">${categoryData[i].strCategory}</h3>
                <p class="text-center mt-2"> ${categoryData[i].strCategoryDescription.split(" ").slice(0,20).join(" ")} </p>
            </div>
        </div>

    </div>
        `
    $('#homedata').html(data);
    $('#searchInputs').html(searchInput);
    }

}
function CategoryMeals() {

    $('#homedata .img .imgdetails h3 ').on('click' , function({target}){
        let target1 = $(target).html();
        console.log(target1);
        startgetCategoryMeal(target1)
    });
    $('#homedata .img .imgdetails p ').on('click' , function({target}){
        let target1 = $(target).prev().html();
        console.log(target1);
        startgetCategoryMeal(target1)
    });
    $('#homedata .img .imgdetails  ').on('click' , function({target}){
        let target1 = $(target).children('h3').html();
        if (target1==undefined) {}
        startgetCategoryMeal(target1)
        
    });
}
async function startCategory() {
    await getCategoryData();    
 await displayCategory();
 CategoryMeals();
 }
$('.Categories').on('click' , function(){
    startCategory();
    closeNavBar();
    closenav();
    });
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//**************************************************************** 
//?====================get Category Meal==========================
//**************************************************************** 
let categoryMealData;
async function getCategoryMeal(meal) {
    $('#homedata').html(" ");
    $(".inner-loading").fadeIn(300);
    let categoryMeal =  await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`)
    let  categoryMealresponse =await categoryMeal.json()
    categoryMealData = categoryMealresponse.meals;
    diplayCategoryMeal(); 
    $(".inner-loading").fadeOut(300);
}
function diplayCategoryMeal() {
    data=``;
    if (categoryMealData != undefined) {
        for (let i = 0; i < categoryMealData.length; i++) {
            data += `
            <div class=" col-sm-6 col-md-3  ">
            <div class="img  position-relative" onclick="getMealDetails(${categoryMealData[i].idMeal})">
                <img src="${categoryMealData[i].strMealThumb}" alt="not found"  class="w-100">
                <div class="imgdetails position-absolute  d-flex align-items-center ">
                    <h3 class="text-center mt-2">${categoryMealData[i].strMeal}</h3>
                </div>
            </div>
    
        </div>
            `
        $('#homedata').html(data);
     
        }
    }
    
}
async function startgetCategoryMeal(meal){
   await getCategoryMeal(meal) ;
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//**************************************************************** 

//?==========================​‌‌‌𝗔𝗿𝗲𝗮​============================

//****************************************************************
let Area ; 
async function getAreas() {
    $('#homedata').html(" ");
    $(".inner-loading").fadeIn(300);
    $('#searchInputs').html(" ");
    let areasApi =  await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let  Areasresponse =await areasApi.json()
    Area = Areasresponse.meals;
    displayArea()
    $(".inner-loading").fadeOut(300);
}
function displayArea(){
    data = ``;
    searchInput=``;
    for (let i = 0; i < Area.length; i++) {
        data += `
        <div class=" col-sm-6 col-md-3  AreaMeal ">
        <div class="AreaIcon text-center text-white mb-3">
            <i class="fa-solid fa-house-laptop fa-2xl"></i>
        </div>
            <h3 class="text-center text-white mt-2">${Area[i].strArea}</h3>             
</div>
</div>
        `
    $('#homedata').html(data);
    $('#searchInputs').html(searchInput);
    }
}
$('.Area').on('click' , function(){
    startGetAreaData();
    closeNavBar();
    closenav();
})
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//**************************************************************** 
//?==========================get Area Meal=======================
//****************************************************************
let AreaMealData;
async function startGetAreaData() {
    await getAreas() 
    getAreaMeals()
}
function getAreaMeals(){
    $('#homedata .AreaIcon').on('click' , function({target}){
        getAreaMealsApi($(target).parent().siblings().html());
    })
    $('#homedata .AreaMeal h3').on('click' , function({target}){
        getAreaMealsApi($(target).html());
        console.log($(target).html());
    })
}
async function getAreaMealsApi(Area) {
    $('#homedata').html(" ");
    $(".inner-loading").fadeIn(300);
    let AreaMeal =  await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`)
    let  AreaMealresponse =await AreaMeal.json()
    AreaMealData = AreaMealresponse.meals;
    diplayAreaMeal(); 
    $(".inner-loading").fadeOut(300);

}
function diplayAreaMeal() {
    data=``;
        for (let i = 0; i < AreaMealData.length; i++) {
            data += `
            <div class="col-sm-6 col-md-3 ">
            <div class="img  position-relative" onclick="getMealDetails(${AreaMealData[i].idMeal})">
                <img src="${AreaMealData[i].strMealThumb}" alt="not found"  class="w-100">
                <div class="imgdetails position-absolute  d-flex align-items-center ">
                    <h3 class="text-center mt-2">${AreaMealData[i].strMeal}</h3>
                </div>
            </div>
    
        </div>
            `
        $('#homedata').html(data);
     
        
    }
    
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//**************************************************************** 

//?=======================​‌‌‌𝗜𝗻𝗴𝗿𝗲𝗱𝗶𝗲𝗻𝘁𝘀​=====================

//****************************************************************
let Ingredients ; 
async function getIngredients() {
    $('#homedata').html(" ");
    $(".inner-loading").fadeIn(300);
    $('#searchInputs').html(" ");
    let IngredientsApi =  await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let  Ingredientsresponse =await IngredientsApi.json()
    Ingredients = Ingredientsresponse.meals;
    displayIngredients()
    $(".inner-loading").fadeOut(300);
}
function displayIngredients(){
    data = ``;
    searchInput=``;
    for (let i = 0; i < Ingredients.length; i++) {
        if (Ingredients[i].strDescription==null) {
        }else{
            data += `
            <div class=" col-sm-6 col-md-3  IngredientMeal ">
            <div class="IngredientIcon text-center text-white mb-3">
            <i class="fa-solid fa-drumstick-bite fa-2xl"></i>
            </div>
                <h3 class="text-center text-white mt-2">${Ingredients[i].strIngredient}</h3>
                <p class="text-center text-white">${Ingredients[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
    
    </div>
            `
        $('#homedata').html(data);
    $('#searchInputs').html(searchInput);
        }
        
    }

}
$('.Ingredients').on('click' , function(){
    startGetIngredientsData();
    closeNavBar();
    closenav();
})
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//**************************************************************** 
//?======================get Ingredients Meal====================
//****************************************************************
let IngredientsMealData;
async function startGetIngredientsData() {
    await getIngredients() 
    getIngredientsMeals()
}
function getIngredientsMeals(){
    $('#homedata .IngredientIcon').on('click' , function({target}){
        console.log("IngredientIcon");
        getIngredientsMealsApi($(target).parent().siblings().html());
    })
    $('#homedata .IngredientMeal h3').on('click' , function({target}){
        console.log("IngredientIcon h3");
        getIngredientsMealsApi($(target).html());
    })
    $('#homedata .IngredientMeal p').on('click' , function({target}){
        console.log("IngredientIcon p");
        getIngredientsMealsApi($(target).prev().html());
    })
}
async function getIngredientsMealsApi(Meal) {
    $('#homedata').html(" ");
    $(".inner-loading").fadeIn(300);
    let IngredientsMeal =  await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Meal}`)
    let  IngredientsMealresponse =await IngredientsMeal.json()
    IngredientsMealData = IngredientsMealresponse.meals;
    diplayIngredientsMeal(); 
    $(".inner-loading").fadeOut(300);

}
function diplayIngredientsMeal() {
    data=``;
        for (let i = 0; i < IngredientsMealData.length; i++) {
            data += `
            <div class=" col-sm-6 col-md-3  ">
            <div class="img  position-relative" onclick="getMealDetails(${IngredientsMealData[i].idMeal})">
                <img src="${IngredientsMealData[i].strMealThumb}" alt="not found"  class="w-100">
                <div class="imgdetails position-absolute  d-flex align-items-center ">
                    <h3 class="text-center mt-2">${IngredientsMealData[i].strMeal}</h3>
                </div>
            </div>
    
        </div>
            `
        $('#homedata').html(data);
     
        
    }
    
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//**************************************************************** 
//?============================​‌‌‌𝗦𝗲𝗮𝗿𝗰𝗵​=======================

//****************************************************************
//?====================Search for Meals By Name==================
let searchInput;
function displaySearchInputs() {
    data=``;
    searchInput =`
    <div class="col-md-6">
    <input type="text" placeholder="Search By Name" class="form-control text-white bg-transparent" id="SearchName" oninput="SearchName()">
</div>
<div class="col-md-6">
    <input type="text" placeholder="Search By First Letter" class="form-control text-white bg-transparent"id="SearchLetter" oninput="SearchLetter()"  maxlength="1">
</div>
    
    `
    $('#searchInputs').html(searchInput);
    $('#homedata').html(data);
}
$('.Search').on('click',  function(){
    displaySearchInputs();
    closeNavBar();
    closenav();
})

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function SearchName() {
    getSearchNameData($('#SearchName').val())  
}
let SearchData;
async function getSearchNameData(Name) {
    $('#homedata').html(" ");
    $(".inner-loading").fadeIn(300);
    let  SearchDatahttps =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${Name}`)
    let   SearchDataresponse =await SearchDatahttps.json()
    SearchData = SearchDataresponse.meals;
    displaySearch()
    $(".inner-loading").fadeOut(300);
}
function displaySearch(){
    data=``;
    for (let i = 0; i < SearchData.length; i++) {
        data += `
        <div class=" col-sm-6 col-md-3  ">
        <div class="img  position-relative" onclick="getMealDetails(${SearchData[i].idMeal})">
            <img src="${SearchData[i].strMealThumb}" alt="not found"  class="w-100">
            <div class="imgdetails position-absolute  d-flex align-items-center ">
                <h3 class="text-center mt-2">${SearchData[i].strMeal}</h3>
            </div>
        </div>

    </div>
        `
    $('#homedata').html(data);
 
    
}
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//**************************************************************** 
//?====================Search for Meals By First Letter==================
//****************************************************************
function SearchLetter() {
    getSearchDataByletter($('#SearchLetter').val())  
}
let SearchDataletter;
async function getSearchDataByletter(letter) {
    $('#homedata').html(" ");
    $(".inner-loading").fadeIn(300);
    let  SearchDatahttps =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let   SearchDataresponse =await SearchDatahttps.json()
    SearchDataletter = SearchDataresponse.meals;
    displaySearchByletter()
    $(".inner-loading").fadeOut(300);
}
function displaySearchByletter(){
    data=``;
    for (let i = 0; i < SearchDataletter.length; i++) {
        data += `
        <div class=" col-sm-6 col-md-3  ">
        <div class="img  position-relative" onclick="getMealDetails(${SearchDataletter[i].idMeal})">
            <img src="${SearchDataletter[i].strMealThumb}" alt="not found"  class="w-100">
            <div class="imgdetails position-absolute  d-flex align-items-center ">
                <h3 class="text-center mt-2">${SearchDataletter[i].strMeal}</h3>
            </div>
        </div>

    </div>
        `
    $('#homedata').html(data);
 
    
}
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//**************************************************************** 
//?====================== ​‌‌‌⁡⁢⁣​‌‌‍⁣Meal Details​⁡​====================

//****************************************************************
let MaelDetails;
async function getMealDetails(idmeal) {
    $('#homedata').html(" ");
    $(".inner-loading").fadeIn(300);
    $('#searchInputs').html(" ");
    let MealDetailsApi =  await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idmeal}`)
    let  MealDetailsresponse =await MealDetailsApi.json()
    MaelDetails = MealDetailsresponse.meals;
    diplayDetails(MaelDetails[0])
    $(".inner-loading").fadeOut(300);
}
function diplayDetails(MaelDetails) {
    data=``;
    let Recipes  = ``

    for (let i = 1; i <= 20; i++) {
        if (MaelDetails[`strIngredient${i}`]) {
            Recipes  += `<li class="alert alert-info m-2 p-1">${MaelDetails[`strMeasure${i}`]} ${MaelDetails[`strIngredient${i}`]}</li>`
        }
    }

    let tags = MaelDetails.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

                data = `
                <div class="  col-md-4 ">
                <div class="img ">
                    <img src="${MaelDetails.strMealThumb}" alt="not found" class="w-100">
                </div>
                <h3 class="text-white">${MaelDetails.strMeal}</h3>
            </div>
            <div class="  col-md-8 text-white recdetails">
                <h2 >Instructions</h2>
                <p> ${MaelDetails.strInstructions}</p>
                <h3>Area : ${MaelDetails.strArea}</h3>
                <h3>Category : ${MaelDetails.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${Recipes}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${tagsStr}
                            
                </ul>
                <a target="_blank" href=" ${MaelDetails.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${MaelDetails.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
                `
    $('#homedata').html(data);
                
            
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//**************************************************************** 

//?====================​‌‌‌𝗖𝗼𝗻𝘁𝗮𝗰𝘁 𝗨𝘀​==================

//****************************************************************
let nameInputFocus = false;
let emailInputFocus = false;
let phoneInputFocus = false;
let ageInputFocus = false;
let passwordInputFocus = false;
let repasswordInputFocus = false;
function displaycontact() {
    searchInput= ``;
    data =``
    data= `
    <div class="contact d-flex justify-content-center align-items-center">
                        <div class="container w-75 ">
                            <div class="row g-4">
                                <div class="col-md-6">
                                    <input type="text" placeholder="Enter Your Name" class="form-control" id="Name"  oninput="Validation()">
                                    <p class="alert alert-danger mt-2 d-none NameAlert">Special characters and numbers not allowed and not empty.</p>

                                </div>
                                <div class="col-md-6">
                                    <input type="text" placeholder="Enter Your Email" class="form-control " id="Email" oninput="Validation()">
                                    <p class="alert alert-danger mt-2 d-none EmailAlert">Email not valid *exemple@yyy.zzz.</p>
                                    
                                </div>
                                <div class="col-md-6">
                                    <input type="text" placeholder="Enter Your Phone" class="form-control " id="Phone"  oninput="Validation()">
                                    <p class="alert alert-danger mt-2 d-none PhoneAlert">Enter valid Phone Number.</p>
                                </div>
                                <div class="col-md-6">
                                    <input type="number" placeholder="Enter Your Age" class="form-control " id="Age"  oninput="Validation()">
                                    <p class="alert alert-danger mt-2 d-none AgeAlert">Enter Enter valid age.</p>
                                </div>
                                <div class="col-md-6" >
                                    <input type="password" placeholder="Enter Your Password" class="form-control " id="Password"  oninput="Validation()">
                                    <p class="alert alert-danger mt-2 d-none PasswordAlert">Your password must be at least 8 characters  long and numbers and special character.</p>
                                </div>
                                <div class="col-md-6">
                                    <input type="password" placeholder="RePassword" class="form-control " id="RePassword"  oninput="Validation()">
                                    <p class="alert alert-danger mt-2 d-none RePasswordAlert">Enter valid repassword.</p>
                                </div>
                                <div class="submit  text-center">

                                    <button class="btn btn-danger text-center ps-5 pe-5" disabled id="Submit"> Submit</button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
    
    `
    $('#homedata').html(data);
    $('#searchInputs').html(searchInput);
    $('#Name').on("focus", function()  {
        nameInputFocus = true
    })

    $('#Email').on("focus", function()  {
        emailInputFocus = true
    })

    $('#Phone').on("focus", function()  {
        phoneInputFocus = true
    })

    $('#Age').on("focus", function()  {
        ageInputFocus = true
    })

    $('#Password').on("focus", function()  {
        passwordInputFocus = true
    })

    $('#RePassword').on("focus", function()  {
        repasswordInputFocus = true
    })
    
}

$('.Contact').on('click' , function(){
    displaycontact();
    closeNavBar();
    closenav();
})


//!================================================================
//**************************************************************** 

//?=======================​‌‌‍Validation​=====================

//****************************************************************

function Validation(){
    if(nameInputFocus){
        if (rejexName()) {
            $('.NameAlert').addClass('d-none')
           }else{
            $('.NameAlert').removeClass('d-none')
           }
    }
    if(emailInputFocus){
        if (rejexEmail() ) {
            $('.EmailAlert').addClass('d-none')
           }else{
            $('.EmailAlert').removeClass('d-none')
           }
    }
    if (phoneInputFocus) {
        if (rejexPhone()) {
            $('.PhoneAlert').addClass('d-none')
           }else{
            $('.PhoneAlert').removeClass('d-none')
           }
    } 
    if (ageInputFocus) {
        if (rejexAge()) {
            $('.AgeAlert').addClass('d-none')
           }else{
            $('.AgeAlert').removeClass('d-none')
           }
    }

    if (passwordInputFocus) {
        if (rejexPassword()) {
            $('.PasswordAlert').addClass('d-none')
           }else{
            $('.PasswordAlert').removeClass('d-none')
           } 
    }
    if (repasswordInputFocus) {
        if (RePassword()) {
            $('.RePasswordAlert').addClass('d-none')
        }else{
            $('.RePasswordAlert').removeClass('d-none')
        }  
    }
    if (rejexName()&&rejexEmail()&&rejexPhone()&&rejexAge()&&rejexPassword()&&RePassword()) {
        $('#Submit').removeAttr("disabled")
        
    }
    else{
        $('#Submit').attr("disabled" , true)
    }
   
    }
function rejexName(){
   let rejexName = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
   let Name = $('#Name').val();
   if (rejexName.test( Name )) {
    return true
   }else{
    return false
   }
}
function rejexEmail() {
   let rejexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
   let Email = $('#Email').val();
   if (rejexEmail.test( Email )) {
    return true
   }else{
    return false
   }
}
function rejexPhone() {
   let rejexPhone = /^(?:\+?1)?[0-9]{3}[- ]?[0-9]{3}[- ]?[0-9]{5}$/;
   let Phone = $('#Phone').val();
   if (rejexPhone.test( Phone )) {
    return true
   }else{
    return false
   }
}
function rejexAge() {
   let rejexAge = /^([1-9]|1[0-9]|[2-9]\d)$/;
   let Age = $('#Age').val();
   if (rejexAge.test( Age )) {
    return true
   }else{
    return false
   }
}
function rejexPassword() {
   let rejexPassword =  /^(?=.*[a-z])(?=.*[0-9])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z0-9\d@$!%*?&#]{8,}$/;
   let Password= $('#Password').val();
   if (rejexPassword.test( Password )) {
    return true
   }else{
    return false
   }
}
function RePassword() {
    let Password =  $('#Password').val();
    let RePassword =  $('#RePassword').val();
    if (Password == RePassword) {
        return true
    }else{
        return false
    }
}
