//! Course constructor

function Course(title, instructor, image) {
    this.title = title;
    this.instructor = instructor;
    this.image = image;

}
//! UI constructor
function UI() {

}
UI.prototype.addCourseToList = function(course) {
    const list = document.getElementById('course-list');
    var html = `
    <tr>
    <td><img src="img/${course.image}" />
    
    </td>
    <td>${course.title}
    
    </td>
    <td>${course.instructor}
    
    </td>
    <td><a href="#" class="btn btn-danger btn-sm delete">Delete </a>
    
    </td>
    </tr>`;
    list.innerHTML += html;


}


UI.prototype.clearConrols = function() {
    const title = document.getElementById('title').value = "";
    const instructor = document.getElementById('instructor').value = "";
    const image = document.getElementById('image').value = "";

}
UI.prototype.deleteCourse = function(target) {
    if (target.classList.contains('delete')) {
        target.parentElement.parentElement.remove();
    }




}
UI.prototype.alert = function(message, alert) {
    var alert = `<div class="alert alert-${alert}"> ${message}</div>`


    const row = document.querySelector('.row');


    //* beforeBegin , afterBegin,  beforeEnd afterEnd
    row.insertAdjacentHTML('beforeBegin', alert);
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 2000);
}

document.getElementById('new-course').addEventListener('submit', function(e) {
    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    const image = document.getElementById('image').value;


    //! Create Course Obje
    const course = new Course(title, instructor, image);

    //! Create UI
    const ui = new UI();
    if (title === '' || instructor === '' || image === '') {
        ui.alert('Please complete the form', 'warning')



    } else {
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
    ui.deleteCourse(e.target);
    ui.alert('the course has been the delete', 'success');

})