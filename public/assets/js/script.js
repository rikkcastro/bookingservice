let navItems = document.querySelector("#navSession")
let navItemss = document.querySelector("#navSession2")
let navItemsc = document.querySelector("#navSessionc")
let navItemssc = document.querySelector("#navSession2c")
let homeif = document.getElementById("homeid")
console.log(homeif)


let userToken = localStorage.getItem("token")
console.log(userToken)

let userIDprofile = localStorage.getItem("id");
console.log(userIDprofile)

let isadminh = localStorage.getItem("isAdmin")
console.log(isadminh)

if(isadminh == "false" || !isadminh){
    console.log('tfalse');
    0
}else{
    console.log('true');
    var x = document.getElementById("hidethis")
    x.style.display = "none"
}
if (typeof isadminh !== 'undefined' && isadminh) {
    
}else{
    var x = document.getElementById("hidethis")
    x.style.display = "none"
    var a = document.getElementById("hidethiss")
    a.style.display = "none"
    if (typeof homeif !== 'undefined' && homeif) {
        navItems.innerHTML = 
    
    `
    <li class="nav-item"id="">
        <a href="./pages/register.html" class="nav-link"> Register </a>
    </li>
    `
    navItemss.innerHTML = 
    `
    <li class="nav-item"id="">
		<a href="./pages/login.html" class="nav-link"> Login </a>
	</li>
    `
    }else{ 
        navItemsc.innerHTML = 
    `
    <li class="nav-item"id="">
        <a href="./register.html" class="nav-link"> Register </a>
    </li>
    `
    navItemssc.innerHTML = 
    `
    <li class="nav-item"id="">
		<a href="./login.html" class="nav-link"> Login </a>
	</li>
    `
    }
   
   
}

// if(isadminh != "false"){
//     console.log('true');
//     var x = document.getElementById("hidethis")
//     x.style.display = "none"
// }else{
//     console.log('true');
    
// }

if(!userToken){

}else{
   
}

