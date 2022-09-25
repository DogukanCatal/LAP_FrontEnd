let nav = 0;
let clicked = null;
let events = localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")) : [];

const calendar = document.getElementById("calendar");
const newEventModal = document.getElementById("newEventModal");
// const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventModal = document.getElementById("eventModal");
const eventBackDrop = document.getElementById("eventBackDrop")
const eventTitleInput = document.getElementById('eventTitleInput');

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date){
    loadTime();
    clicked = date;

    newEventModal.style.display = "block"
    backDrop.style.display = "block";
}

function load(){

    const dt = new Date();

    // Current Hour with minutes
    // console.log(dt.getUTCHours()+3,dt.getUTCMinutes());

    if(nav != 0){
        dt.setMonth(new Date().getMonth()+nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    console.log(day,month,year);

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year,month+1,0).getDate();

    const dateString = firstDayOfMonth .toLocaleDateString("en-us",{
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });

    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

    document.getElementById("title").innerText=`${dt.toLocaleDateString("en-us",{month:"long"})} ${year}`;

    console.log(dateString,paddingDays);

    calendar.innerHTML="";

    for(let i =1 ;i <= paddingDays + daysInMonth; i++){
                const daySquare = document.createElement("div");
                daySquare.classList.add("day");

                const dayString = `${month + 1}/${i - paddingDays}/${year}`;
        
                if(i>paddingDays){
                    daySquare.innerText = i-paddingDays;

                    if(i-paddingDays == day && nav == 0){
                        daySquare.id = "currentDay";
                    }
        
                    daySquare.addEventListener("click",()=>openModal(dayString));
                }else{
                    daySquare.classList.add("padding");
        
                }
        
                calendar.appendChild(daySquare);
            }

}
function closeModal(){
    newEventModal.removeChild(newEventModal.firstChild);
    newEventModal.style.display = 'none';
    // deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    // eventTitleInput.value = '';
    clicked = null;
    load();
}
function closeEventModal(){
    eventModal.style.display="none";
    eventBackDrop.style.display="none";
    clicked=null;
    newEventModal.removeChild(newEventModal.firstChild);
    loadTime();
}

function initButtons(){
    document.getElementById("forward").addEventListener("click",()=>{
        nav++;
        load();
    })

    document.getElementById("back").addEventListener("click",()=>{
        nav--;
        load();
    })

    // document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);
    document.getElementById("cancelEventButton").addEventListener("click",closeEventModal);
    // document.getElementById('deleteButton').addEventListener('click', deleteEvent);
    // document.getElementById('closeButton').addEventListener('click', closeModal);
}

function openEventModal(time){
    clicked = time;

    eventModal.style.display="block";
    eventBackDrop.style.display="block";
}

function loadTime(){
    var table = document.createElement("table");
    table.classList.add("table");
    var thead=document.createElement("thead");
    var tr = document.createElement("tr");
    var th = document.createElement("th")
    var text=document.createTextNode("Time");
    th.appendChild(text);
    tr.appendChild(th);
    for(var i = 0 ; i<7;i++){
        var th = document.createElement("th");
        var text = document.createTextNode(weekdays[i]);
        th.appendChild(text);
        tr.appendChild(th);
    }
    
    thead.appendChild(tr);
    var tbody = document.createElement("tbody");
    for(var i=0;i<11;i++){
        console.log("yarrak");
        var tr = document.createElement("tr");
        var th=document.createElement("th");
        if(i+7<10){
            
            var text = document.createTextNode("0"+(i+7)+":00");
        }
        else{
            var text = document.createTextNode((i+7)+":00");
        }
        th.appendChild(text);
        tr.appendChild(th);
        for(var j=0;j<7;j++){
            var td=document.createElement("td");
            td.classList.add("timeSlotDay");
            td.addEventListener("click",()=>openEventModal(text));
            var text1 = document.createTextNode(" ")
            td.appendChild(text1);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    console.log(tbody);
    table.appendChild(thead);
    table.appendChild(tbody);
    newEventModal.insertBefore(table,newEventModal.firstChild)
    // newEventModal.appendChild(table);

}

initButtons();
load();

// let nav = 0;
// let clicked = null;
// let events = localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")) : []

// const calender = document.getElementById("calendar");
// const weekdays = ["Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi","Pazar"];

// function load(){
//     const dt = new Date();

//     console.log(dt);

//     const day = dt.getDate();
//     const month = dt.getMonth();
//     const year = dt.getFullYear();

//     console.log(day,month,year);

//     const firstDayOfMonth = new Date(year,month,1);
//     const daysInMonth = new Date(year,month+1,0).getDate();

//     console.log(firstDayOfMonth,daysInMonth);

//     const dateString = firstDayOfMonth.toLocaleDateString("tr-tr",{
//         weekday: "long",
//         year: "numeric",
//         month: "numeric",
//         day: "numeric",
//     });

//     console.log(dateString);

//     const paddingDays = weekdays.indexOf(dateString.split(" ")[1]);

//     console.log(paddingDays);

//     for(let i =1 ;i <= paddingDays + daysInMonth; i++){
//         const daySquare = document.createElement("div");
//         daySquare.classList.add("day");

//         if(i>paddingDays){
//             daySquare.innerText = i-paddingDays;

//             daySquare.addEventListener("click",()=>console.log("click"));
//         }else{
//             daySquare.classList.add("padding");

//         }

//         calender.appendChild(daySquare);
//     }
// }

// load();