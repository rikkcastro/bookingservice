let params = new URLSearchParams(window.location.search);
let courseId = params.get('courseId')
let deleteuserToken = localStorage.getItem("token")



fetch(`https://sheltered-bayou-95849.herokuapp.com/api/courses/${courseId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${deleteuserToken}`
				}
			}).then(res => {
				return res.json()
			}).then(result => {
                alert("Course disabled")
                console.log(result)
                window.location.replace("./courses.html")
			})