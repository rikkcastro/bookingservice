let token = localStorage.getItem('token');
let userProfile = document.querySelector('#profileContainer');

if (!token) alert('Something went wrong')
else {
    fetch('https://sheltered-bayou-95849.herokuapp.com/api/users/details', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(userData => {
        if (!userData) return false;
        else {
            userProfile.innerHTML = 
                `
                <div class="col-md-12">
                <main class="container my-5">
                <div id="profileContainer" class="row">
                    <div class="col-md-12">
                        <section class="jumbotron text-center my-5">		
                            <h4 class="my-2">First Name: ${userData.firstName}</h4>
                            <h4 class="my-2">Last Name: ${userData.lastName}</h4>
                            <h4 class="my-2">Email: ${userData.email}</h4>
                            <h4 class="my-2">Contact Number: 0${userData.mobileNo} </h4>
                            <h4 class="my-5 text-left">Class History</h4>
                            <div class="row" style="margin-left: 0%" style="margin-bottom: 0%">
                            <div class="column text-left" style="width: 40%">
                                <h6>Course ID</h6>
                            </div>
                            <div class="column" style="width: 15%">
                                <h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Enrolled On</h6>
                            </div>
                            <div class="column" style="width: 45%">
                                <h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Status</h6>
                            </div>
                            </div>
                            <table class="w-100 my-1">
                            <thead class="d-inline-block">
                                <tr class="tableHeader">
                                </tr>
                            </thead>
                            
                            <tbody id="tBody" class="d-inline-block w-100">
                                
                            </tbody>
                        </table>
                        </section>                  
                        </div>
                    </div>
                </main>
                </div>
                `
            let table = document.querySelector('#tBody');
            userData.enrollments.map(userInfo => {
                if (!userInfo) alert('No such data found!')
                fetch('https://sheltered-bayou-95849.herokuapp.com/api/courses')
                .then(result => result.json())
                .then(courseData => {
                    if (courseData.length < 1) alert('There is no such course')
                    courseData.map(course => {
                        if(course._id === userInfo.courseId) {
                            let dc = userInfo.enrolledOn
				            id = dc.substr(0, 10)
                            return table.innerHTML += (
                                `
                                <tr class="" style="width: 100%">
                                    <td class="py-lg-2 border-top border-bottom text-left" style="width: 40%">${course.name}</td>
                                    <td class="py-lg-2 border-top text-centers border-bottom" style="color: rgb(51, 51, 51);">abcde</td>
                                    <td class="py-lg-2 border-top text-centers border-bottom"  style="width: 15%" style="color: rgb(51, 51, 51);">${id}</td>
                                    <td class="py-lg-2 border-top border-bottom text-rights" style="width: 45%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${userInfo.status}</td>
                                    
                                </tr>
                                `
                            ) 
                        }
                    }).join('')
                })
            })
            
        }
    })
}