let token = localStorage.getItem('token');
let enrollees = document.querySelector('#enrolleesContainer');
let params = new URLSearchParams(window.location.search);
let courseId = params.get('courseId')

if (!token) alert('Something went wrong')
else {
    fetch(`https://sheltered-bayou-95849.herokuapp.com/api/courses/${courseId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(courseData => {
        if (!courseData) return false;
        else {
            enrollees.innerHTML = 
                `
                <div class="col-md-12">
                <main class="container my-5">
                <div id="enrolleesContainer" class="row">
                    <div class="col-md-12">
                        <section class="jumbotron text-center my-5">		
                            <h4 class="my-2">Course Name: ${courseData.name}</h4>
                            <h4 class="my-2">Description: ${courseData.description}</h4>
                            <h4 class="my-2">Price: ${courseData.price}</h4>
                            <h4 class="my-4 text-left">Enrollees</h4>
                            <div class="row" style="margin-left: 0%" style="margin-bottom: 0%">
                            <div class="column text-left" style="width: 40%">
                                <h6><b>Students Name</b></h6>
                            </div>
                            <div class="column" style="width: 15%">
                                <h6><b>Email</b></h6>
                            </div>
                            <div class="column" style="width: 45%">
                                <h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Mobile Number</b></h6>
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
            courseData.enrollees.map(courseInfo => {
                if (!courseInfo) alert('No such data found!')
                console.log(courseData.enrollees)
                fetch('https://sheltered-bayou-95849.herokuapp.com/api/users')
                .then(result => result.json())
                .then(userData => {
                    if (userData.length < 1) alert('There is no such course')
                    userData.map(user => {
                        if(user._id === courseInfo.userId) {
                            
                            return table.innerHTML += (
                                `
                                <tr class="" style="width: 100%">
                                    <td class="py-lg-2 border-top border-bottom text-left" style="width: 40%"> &nbsp;<small>${user.firstName} ${user.lastName}</small></td>
                                    <td class="py-lg-2 border-top text-centers border-bottom" style="color: rgb(51, 51, 51);">abcde</td>
                                    <td class="py-lg-2 border-top text-centers border-bottom"  style="width: 15%" style="color: rgb(51, 51, 51);"><small>${user.email} </small></td>
                                    <td class="py-lg-2 border-top border-bottom text-rights" style="width: 45%"><small>0${user.mobileNo}</small></td>
                                    
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