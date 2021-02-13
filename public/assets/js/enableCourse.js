let params = new URLSearchParams(window.location.search);
let courseId = params.get('courseId')
let deleteuserTokenss = localStorage.getItem("token")
console.log(courseId)
console.log(deleteuserTokenss)


fetch(`https://sheltered-bayou-95849.herokuapp.com/api/coursesv/${courseId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${deleteuserTokenss}`
				}
			}).then(res => {
				return res.json()
			}).then(result => {
                alert("Course Enabled")
                console.log(result)
                window.location.replace("./courses.html")
			})