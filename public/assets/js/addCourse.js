let addCourseform = document.querySelector("#createCourse")
let userToken = localStorage.getItem("token")

addCourseform.addEventListener("submit", (e) => {
  	e.preventDefault()
      let coursename = document.querySelector("#courseName").value;
      let coursedesc = document.querySelector("#courseDescription").value;
      let price = document.querySelector("#coursePrice").value;
               
            fetch('https://sheltered-bayou-95849.herokuapp.com/api/courses', {
				method: 'POST',
				headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json'
				},
				body: JSON.stringify({
                    "name": coursename,
                    "description": coursedesc,
                    "price": price
				})
            })
			.then(res => {
				return res.json()
			})
			.then(data => {
                if(data === true){
                    alert("Course Succesfully Added") 
                    window.location.replace("./courses.html")
                }else{
                    console.log(data)
                }
			})            
})
