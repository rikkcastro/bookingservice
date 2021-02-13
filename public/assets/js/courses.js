let adminUser = localStorage.getItem("isAdmin")
let modalButton = document.querySelector("#adminButton")
let searchButtons = document.querySelector("#searchButton")
let searchButtons2 = document.querySelector("#searchButton2")
let cardFooter
let cardFooterEnable
console.log(adminUser)
// let adminUser = "false"
// var ab = document.getElementById("searchButton2");
//     ab.style.display = "none"

if(adminUser == "false" || !adminUser){
	modalButton.innerHTML = null

	var x = document.getElementById("coursesContainers");
	x.style.display = "none"
	var y = document.getElementById("enablecourse");
	y.style.display = "none"
	
}else{

	modalButton.innerHTML =
	`
	<div class="col-md-2 offset-md-10">
		<a href="./addCourse.html" class="btn btn-block btn-primary"><b>Add Course</b></a>
	</div>
	`
	// searchButtons.innerHTML =
	// `
	// <div class="col-md-2 offset-md-10">
	// 	<a href="" class="btn btn-block btn-primary"><b>Search Course</b></a>
	// </div>
	// `
	
fetch('https://sheltered-bayou-95849.herokuapp.com/api/courses/getall')
.then(res => res.json())
.then(data => {

	let courseDataf;
	
	
		courseDataf = data.map(coursef => {
           
				cardFooterEnable = `
					<a href="./enableCourse.html?courseId=${coursef._id}" value={course._id} class="btn btn-primary text-white btn-block editButton"> <b>Edit</b>
					</a>
				
					<a href="./enableCourse.html?courseId=${coursef._id}" value={course._id} class="btn btn-success text-white btn-block enableButton"> <b>Enable Course</b>
					</a>

					<a href="./enrollees.html?courseId=${coursef._id}" value={course._id} class="btn btn-info text-white btn-block viewButton"> <b>View Enrollees</b>
                    </a>
				`
			
			return(
				`
				<div class="col-md-6 my-3">
					<div class="card">
						<div class="card-body">
							<h5 class="card-title"><b>${coursef.name}</b></h5>
							<p class="card-text text-left">
								${coursef.description}
							</p>
							<p class="card-text text-right">
								${coursef.price}
							</p>
						</div>
						<div class="card-footer">
                        ${cardFooterEnable}
						</div>
					</div>	
				</div>
				`
			)
		}).join("")
		
		let containers = document.querySelector("#coursesContainers")

		containers.innerHTML = courseDataf	
		
		
	
})
}




	
fetch('https://sheltered-bayou-95849.herokuapp.com/api/courses')
.then(res => res.json())
.then(data => {

	let courseData;
	
	if(data.length < 1){
		courseData = "No courses available."
	}else{
		
		courseData = data.map(course => {
            if(adminUser == "false" || !adminUser){
				let dc = course.createdOn
				id = dc.substr(0, 10)
				let stringif 
				if (typeof adminUser !== 'undefined' && adminUser) {
					stringif = `./course.html?courseId=${course._id}`
				}else{ 
					stringif = "./login.html"
				}
				cardFooter = `
                    <p>
                     Date Created: ${id}
                    </p>
                    <a href="${stringif}" value={course._id} class="btn btn-primary text-white btn-block viewButton"><b>Select Course</b>
                    </a>                 
                `
            }else{

                cardFooter = `
                    <a href="./editCourse.html?courseId=${course._id}" value={course._id} class="btn btn-warning text-white btn-block editButton"> <b>Edit</b>
                    </a>
                
                    <a href="./deleteCourse.html?courseId=${course._id}" value={course._id} class="btn btn-danger text-white btn-block deleteButton"> <b>Disable Course</b>
					</a>
					
					<a href="./enrollees.html?courseId=${course._id}" value={course._id} class="btn btn-info text-white btn-block viewButton"> <b>View Enrollees</b>
                    </a>
				`
				cardFooterEnable = `
					<a href="./editCourse.html?courseId=${course._id}" value={course._id} class="btn btn-warning text-white btn-block editButton"><b> Edit Course </b>
					</a>
				
					<a href="./deleteCourse.html?courseId=${course._id}" value={course._id} class="btn btn-success text-white btn-block enableButton"> <b> Enable Course </b>
					</a>

					<a href="./enrollees.html?courseId=${course._id}" value={course._id} class="btn btn-info text-white btn-block viewButton"> <b>ViewEnrolees</b>
                    </a>
				`
            }
			
			
			return(
				`
				<div class="col-md-6 my-3">
					<div class="card">
						<div class="card-body">
							<h5 class="card-title"><b>${course.name}</b></h5>
							<p class="card-text text-left">
								${course.description}
							</p>
							<p class="card-text text-right">
								${course.price}
							</p>
						</div>
						<div class="card-footer">
                        ${cardFooter}
						</div>
					</div>	
				</div>
				`
				
			)
		}).join("")

		let container = document.querySelector("#coursesContainer")
		container.innerHTML = courseData
		
	}
})

