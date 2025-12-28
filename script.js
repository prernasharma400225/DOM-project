function openFeatures() {
    var allElems = document.querySelectorAll(".elem");
    var allFullElems = document.querySelectorAll('.fullElem')
    var allFullElemsBackBtn = document.querySelectorAll('.fullElem .back')

    allElems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            allFullElems[elem.id].style.display = 'block'
        })
    })
    allFullElemsBackBtn.forEach(function (back) {
        back.addEventListener('click', function () {
            allFullElems[back.id].style.display = 'none'
        })

    })
}
// openFeatures()

function todoList() {

    let form = document.querySelector('.addTask form')
    let taskInput = document.querySelector('.addTask form #task-input')
    let taskDetailsInput = document.querySelector('.addTask form textarea')
    let taskCheckbox = document.querySelector('.addTask form #check')


    let currentTask = []

    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    } else {

        console.log('Task list is empty');
    }


    function renderTask() {
        localStorage.setItem('currentTask', JSON.stringify(currentTask));
        var allTask = document.querySelector('.allTask')

        var sum = ''
        currentTask.forEach(function (elem, idx) {
            sum = sum + `
        <div class="task">
        <h5>${elem.task} <span class = ${elem.imp}>imp</spam></h5>
        <button id = ${idx}>Mark as Completed</button>
        </div>`

        })

        allTask.innerHTML = sum

        localStorage.setItem('currentTask', JSON.stringify(currentTask));

        document.querySelectorAll('.task button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentTask.splice(btn.id, 1)
                renderTask()
            })
        })
    }
    renderTask()


    form.addEventListener('submit', function (e) {
        e.preventDefault()
        currentTask.push(
            {
                task: taskInput.value,
                details: taskDetailsInput.value,
                imp: taskCheckbox.checked
            }
        )
        renderTask()
        taskInput.value = ''
        taskDetailsInput.value = ''
        taskCheckbox.checked = false




    })

}
// todoList()