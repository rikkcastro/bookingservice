let params = new URLSearchParams(window.location.search);
let courseId = params.get('courseId')
let edituserToken = localStorage.getItem("token")
let name = document.querySelector("#courseName")
let description = document.querySelector("#courseDescription")
let price = document.querySelector("#coursePrice")

fetch(`https://sheltered-bayou-95849.herokuapp.com/api/courses/${courseId}`)
.then(res => res.json())
.then(data =>{
	if(data){
       name.placeholder = data.name
       price.placeholder = data.price
       description.placeholder = data.description

       editCourse.addEventListener("submit", (e) => { 
        e.preventDefault()
        let name2 = document.querySelector("#courseName").value
        let description2 = document.querySelector("#courseDescription").value
        let price2 = document.querySelector("#coursePrice").value
        let courseId2 = params.get('courseId')
        let edituserToken2 = localStorage.getItem("token")
        
        fetch(`https://sheltered-bayou-95849.herokuapp.com/api/courses/${courseId2}`, {
				method: 'PUT',
				headers: {
                    Authorization: `Bearer ${edituserToken}`,
                    'Content-Type': 'application/json'
				},
				body: JSON.stringify({
                    "name": name2,
                    "description": description2,
                    "price": price2
                   
				})
            })
            
			.then(res => {
				return res.json()
			})
			.then(data => {
                console.log(name2, courseId2,description2,price2,)
                    console.log(edituserToken)
                    console.log(edituserToken2)
                        alert("Course successfully updated")
                        window.location.replace("./courses.html")
                    
			})
        })
    }else{
        console.log("Cant fetch placeholders")
    }
});