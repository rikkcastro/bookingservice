let loginForm = document.querySelector('#logInUser')

loginForm.addEventListener("submit", (e)=> {
    e.preventDefault()

    let email = document.querySelector("#userEmail").value;
    let password = document.querySelector("#password").value;
    if (email === "" || password === "") {
        alert("please input your email and/or password")
    }else {
        fetch('https://sheltered-bayou-95849.herokuapp.com/api/users/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            email: email,
            password: password
            })
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
        if (data.accessToken) {
        // successful authentication will return JSON web token
            localStorage.setItem('token', data.accessToken)

            fetch('https://sheltered-bayou-95849.herokuapp.com/api/users/details', {
            headers: {
            Authorization: `Bearer ${data.accessToken}`
        }
        })
        .then(res => {
         return res.json()
        })
        .then(data => {
                alert('Logged in Successfully');
                localStorage.setItem("id", data._id)
                localStorage.setItem("isAdmin", data.isAdmin)
                window.location.replace('./courses.html')
            })
            } else {
                alert('Authentication Failure')
            }
        })
    }
})