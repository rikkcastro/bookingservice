let registerForm = document.querySelector("#registerUser")
console.log(registerForm)

registerForm.addEventListener("submit", (e) => {
  	e.preventDefault()

  	let firstName = document.querySelector("#firstName").value;
	let lastName = document.querySelector("#lastName").value;
	let mobileNumber = document.querySelector("#mobileNumber").value;
	let userEmail = document.querySelector("#userEmail").value;
	let password1 = document.querySelector("#password1").value;
	let password2 = document.querySelector("#password2").value;
	let registerUser = document.querySelector("#registerUser").value;


	if((password1 !== '' && password2 !== '') && (password2 === password1) && (mobileNumber.length === 11)){

		fetch('https://sheltered-bayou-95849.herokuapp.com/api/users/email-exists', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"email": userEmail //fix
			})
		})

        .then(res => res.json())

		.then(data =>{
            

            if(data === false){
                fetch('https://sheltered-bayou-95849.herokuapp.com/api/users/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"firstName": firstName,
					"lastName": lastName,
					"email": userEmail,
					"password": password1,
					"mobileNo": mobileNumber
				})
            })
            
			.then(res => {
				return res.json()
			})
			.then(data => {
				console.log(data)
                if(data === true){
                    alert("Registered Successfully")
                    window.location.replace("./login.html")
                }
			})
               
            }
            else{
                alert("Email Already Used, try another one") 
            }

		})
	}else{
		alert("Something Went Wrong, Please try again")
	}


});
