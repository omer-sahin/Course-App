//! Course Class 
class Course {
    constructor(title, instructor, image) {
        this.courseId = Math.floor(Math.random() * 1000);
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }
}
//! Arayüz Class
class UI {
    addCourseToList(course) {
        const list = document.getElementById('course-list');
        var html = `
        <tr>
        <td  ><img class="img" src="img/${course.image}" />
        
        </td>
        <td  class="td" >${course.title}
        
        </td>
        <td  class="td" >${course.instructor}
        
        </td>
        <td  class="td" ><a href="#" data-id="${course.courseId}" class="btn btn-danger btn-sm delete">Delete </a>
        
        </td>
        </tr>`;
        list.innerHTML += html;

    }
    clearConrols() {
        const title = document.getElementById('title').value = "";
        const instructor = document.getElementById('instructor').value = "";
        const image = document.getElementById('image').value = "";

    }
    deleteCourse(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
            return true;
        }


    }
    alert(message, alert) {
        var alert = `<div class="alert alert-${alert}"> ${message}</div>`


        const row = document.querySelector('.row');


        //* beforeBegin , afterBegin,  beforeEnd afterEnd
        row.insertAdjacentHTML('beforeBegin', alert);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2000);

    }
}


class Storage {
    static getCourses() {
        let courses;
        if (localStorage.getItem('courses') === null) {
            courses = [];

        } else {
            courses = JSON.parse(localStorage.getItem('courses'));
        }
        return courses;

    }
    static displayCourses() {
        const courses = Storage.getCourses();
        courses.forEach(course => {
            const ui = new UI();
            ui.addCourseToList(course)

        });

    }
    static addCourse(course) {
        const courses = Storage.getCourses();
        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses));

    }
    static deleteCourse(element) {
        if (element.classList.contains('delete')) {
            const id = element.getAttribute('data-id');

            const courses = Storage.getCourses();
            courses.forEach((course, index) => {
                if (course.courseId == id) {
                    courses.splice(index, 1);

                }
            });
            localStorage.setItem('courses', JSON.stringify(courses));
        }



    }


}






document.addEventListener('DOMContentLoaded', Storage.displayCourses);
document.getElementById('new-course').addEventListener('submit', function(e) {
    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    const image = document.getElementById('image').value;


    //! Create Course Obje
    const course = new Course(title, instructor, image);
    console.log(course.courseId);


    //! Create UI
    const ui = new UI();
    if (title === '' || instructor === '' || image === '') {
        ui.alert('Please complete the form', 'warning')



    } else {
        //! Save To LS
        Storage.addCourse(course);
        //! add course to list
        ui.addCourseToList(course);
        //! Clear controls
        ui.clearConrols();

        ui.alert('the course has been added', 'success');

    }
    e.preventDefault();

});

document.getElementById('course-list').addEventListener('click', function(e) {
    const ui = new UI();
    if (ui.deleteCourse(e.target) == true) {
        Storage.deleteCourse(e.target)
        ui.alert('the course has been the delete', 'success');
    }
    //!delete From Ls


})