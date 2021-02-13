let link = window.location.search
id = link.slice(10, link.length)
let params = new URLSearchParams(window.location.search);
let courseId = params.get('courseId')
let singleuserToken = localStorage.getItem("token")
let name = document.querySelector("#courseName")
let description = document.querySelector("#courseDesc")
let price = document.querySelector("#coursePrice")
let enroll = document.querySelector("#enrollContainer")

fetch(`https://sheltered-bayou-95849.herokuapp.com/api/courses/${id}`)
.then(res => res.json())
.then(data =>{
	if(data){
		name.innerHTML = data.name
		description.innerHTML = data.description
		price.innerHTML = data.price
		enrollContainer.innerHTML	= `
		<button href="#" value={data._id} class="btn btn-dark btn-info text-white btn-block viewButton" id="enroll">Enroll
		</button>
		`	
		let enrollBtn = document.querySelector("#enroll")

		enrollBtn.addEventListener("click", (e) => {
			e.preventDefault()
			fetch('https://sheltered-bayou-95849.herokuapp.com/api/users/enroll', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${singleuserToken}`
				},
				body: JSON.stringify({
					"courseId": courseId
				})
			}).then(res => {
				return res.json()
			}).then(result => {
				console.log(result)
				alert("Successfully Enrolled")
				window.location.replace("./profile.html")
			})
		})
		
	}else{
		alert("Data Unavailable")
	}
})