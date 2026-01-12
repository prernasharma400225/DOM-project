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
openFeatures()

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
todoList()

function dailyPlanner() {

    var dayPlanner = document.querySelector('.day-planner')

    var dayPlanData = JSON.parse(localStorage.getItem('.dayPlanData')) || {}

    var hours = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`)

    var wholeDaySum = ''
    hours.forEach(function (elem, idx) {

        var savedData = dayPlanData[idx] || ''

        wholeDaySum = wholeDaySum + `<div class = "day-planner-time">
   <p>${elem}</p>
   <input id=${idx} type="text" placeholder="..." value= ${savedData}>
   </div>`

    })

    dayPlanner.innerHTML = wholeDaySum

    var dayPlannerInput = document.querySelectorAll('.day-planner input')

    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            console.log('hello');

            dayPlanData[elem.id] = elem.value
            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
        })
    })


}
dailyPlanner()

function motivationalQuote() {
    var motivationQuote = document.querySelector('.motivation-2 h3')
    var motivationAuthor = document.querySelector('.motivation-3 h3')
    async function fetchQuote() {
        let response = await fetch('https://dummyjson.com/quotes/random')

        let data = await response.json();
        // console.log("this is the actual result ",data)

        motivationQuote.innerHTML = data.quote

        motivationAuthor.innerHTML = `__${data.author}`


    }
    fetchQuote()
}
motivationalQuote()


function pomodoro() {
    let timer = document.querySelector('.pomo-time h1')
    var startBtn = document.querySelector('.pomo-time .start-timer')
    var pauseBtn = document.querySelector('.pomo-time .pause-timer')
    var resetBtn = document.querySelector('.pomo-time .reset-timer')
    var session = document.querySelector('.pomodoro-fullpage .session')
    var isWorkSession = true

    let totalSeconds = 25 * 60
    let timerInterval = null

    function upDateTimer() {
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = totalSeconds % 60

        timer.innerHTML = `${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`
    }

    function startTimer() {
        clearInterval(timerInterval)

        if (isWorkSession) {
            timerInterval = setInterval(() => {
                if (totalSeconds > 0) {
                    totalSeconds--
                    upDateTimer()
                } else {
                    isWorkSession = false
                    clearInterval(timerInterval)
                    timer.innerHTML = '05:00'
                    session.innerHTML = 'Take a Break'
                    session.style.backgroundColor = 'var(--blue)'
                    totalSeconds = 5 * 60
                }
            }, 1000)
        } else {

            timerInterval = setInterval(() => {
                if (totalSeconds > 0) {
                    totalSeconds--
                    upDateTimer()
                } else {
                    isWorkSession = true
                    clearInterval(timerInterval)
                    timer.innerHTML = '25:00'
                    session.innerHTML = 'Work session'
                    session.style.backgroundColor = 'var(--green)'
                    totalSeconds = 25 * 60
                }

            }, 1000)
        }

    }

    function pauseTimer() {
        clearInterval(timerInterval)
    }
    function resetTimer() {
        totalSeconds = 25 * 60
        clearInterval(timerInterval)
        upDateTimer()
    }

    startBtn.addEventListener('click', startTimer)
    pauseBtn.addEventListener('click', pauseTimer)
    resetBtn.addEventListener('click', resetTimer)
}
pomodoro()

function weatherfunctionality() {
    var apiKey = '87cf32deedd9442793a70453250305'
    var city = 'bokaro';
    var bgsky= document.querySelector('.bg-sky')
    var header1Time = document.querySelector('.header1 h1')
    var header1Date = document.querySelector('.header1 h2')
    var header2Temp = document.querySelector('.header2 h1')
    var header2Condition = document.querySelector('.header2 h2')
    var header2precipitation = document.querySelector('.header2 .precipitation')
    var header2humidity = document.querySelector('.header2 .humidity')
    var header2wind = document.querySelector('.header2 .wind')
    var v = document.querySelector('#v')

    v.addEventListener('timeupdate', ()=>{
        if(v.duration - v.currentTime < 0.15){
            v.currentTime = 0;
            v.play();
        }
    })


    var data = null
    async function weatherAPICall() {
        var response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        data = await response.json()
        console.log(data.current);


        header2Temp.innerHTML = `${data.current.temp_c}°C`
        header2Condition.innerHTML = `${data.current.condition.text}`
        header2wind.innerHTML = `Wind: ${data.current.wind_kph}km/h`
        header2humidity.innerHTML = `Humidity: ${data.current.humidity}%`
        header2precipitation.innerHTML = `Heat_Index: ${data.current.heatindex_c}%`
    }
    weatherAPICall()


    function timeDate() {
        const totaldaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var date = new Date()
        var daysOfWeek = totaldaysOfWeek[date.getDay()]
        var hours = date.getHours()
        var minutes = date.getMinutes()
        var seconds = date.getSeconds()
        var dates = date.getDate()
        var month = months[date.getMonth()]
        var year = date.getFullYear()

        header1Date.innerHTML = `${dates} ${month}, ${year}`

        if (hours > 12) {
            header1Time.innerHTML = `${daysOfWeek}, ${String(hours - 12).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} PM`
            if(hours >=12  && hours<15){
                bgsky.querySelector('img').src = "images/afternoon.jpg"
                bgsky.querySelector('video').src = "Videos/sky.mp4"
            }else if(hours>=15 && hours<17){
                bgsky.querySelector('img').src = "images/eveningimg.avif"
                bgsky.querySelector('video').src = "Videos/evening.mp4"
            }
            else{
                bgsky.querySelector('img').src = "images/night.jpg"
                bgsky.querySelector('video').src = "Videos/night.mp4"
            }
            
        } else {
            header1Time.innerHTML = `${daysOfWeek}, ${String(hours).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} AM`
            if(hours>=5 && hours<12){
                bgsky.querySelector('img').src = "images/sky-blue.jpg"
                bgsky.querySelector('video').src = "Videos/morning.mp4"
            }
             else{
                bgsky.querySelector('img').src = "images/night.jpg"
                bgsky.querySelector('video').src = "Videos/night.mp4"
            }

        }
    }
    setInterval(() => {
        timeDate()
    }, 1000)
}
weatherfunctionality()

function changeTheme() {
    var theme = document.querySelector('.theme i')
    var Img = document.querySelectorAll('.elem img')
    var rootElement = document.documentElement

    // light

    var lightImg = [
        "images/todo-light.avif",

        "images/daily-planLight.jpg",

        "images/moti-light.jpg",

        "images/pomolight.jpeg",

        "images/goalsLight.avif"
    ]


    // darkimg

    var darkImg = [
        "images/todoDark.png",

        "images/daily-PlanDark.png",

        "images/moti-Dark.jpg",

        "images/pomoDark.jpg",

        "images/goalsDark.jpg"
    ]


    var flag = 0
    theme.addEventListener('click', function () {
        if (flag == 0) {
            rootElement.style.setProperty('--pri', '#bfc6cc')
            rootElement.style.setProperty('--sec', '#010f1a')
            rootElement.style.setProperty('--tri1', '#456882')
            rootElement.style.setProperty('--tri2', '#092133')
            rootElement.style.setProperty('--red', '#bfc6cc')
            rootElement.style.setProperty('--green', '#456882')

            Img.forEach((img,i)=>{
                img.src = darkImg[i]
            })

            theme.className = 'ri-moon-fill'
            flag = 1



        } else if (flag == 1) {
            rootElement.style.setProperty('--pri', '#010f1a')
            rootElement.style.setProperty('--sec', '#faf8f8')
            rootElement.style.setProperty('--tri1', '#092133')
            rootElement.style.setProperty('--tri2', '#456882')
            rootElement.style.setProperty('--red', '#456882')
            rootElement.style.setProperty('--green', '#bfc6cc')

            Img.forEach((img,i)=>{
                img.src = lightImg[i]
            })

            theme.className = 'ri-sun-fill'
            flag = 0


        }

    })
}
changeTheme()


function dailyGoals() {
    var currentgoals = []

    try {
        currentgoals = JSON.parse(localStorage.getItem('currentgoals')) || [];
    } catch (e) {
        currentgoals = [];
    }

    function rendergoals() {
        var allgoals = document.querySelector('.allgoals')

        var sum = ''

        currentgoals.forEach(function (elem, idx) {
            sum += ` <div class="daily-goals">
        <div class='d-goals'>
            <h2>${elem.goals}</h2>
            <h5>${elem.details}</h5>
        </div>
        <button id=${idx}><i class="ri-close-fill"></i></button>
        </div>`;


        });

        allgoals.innerHTML = sum
        localStorage.setItem('currentgoals', JSON.stringify(currentgoals))


        document.querySelectorAll('.daily-goals button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                let index = btn.getAttribute('id')
                currentgoals.splice(index, 1)
                rendergoals()

            })

        })
    }
    rendergoals()


    let form = document.querySelector('.addgoals form')
    let goalsInput = document.querySelector('.addgoals form #goals-input')
    let goalsDetailsInput = document.querySelector('.addgoals form textarea')

    form.addEventListener('submit', function (e) {
        e.preventDefault()

        currentgoals.push(
            {
                goals: goalsInput.value,
                details: goalsDetailsInput.value
            }
        )
        rendergoals()

        goalsInput.value = ''
        goalsDetailsInput.value = ''
        var markCompletedBtn = document.querySelectorAll('.daily-goals button')

    })

}
dailyGoals()