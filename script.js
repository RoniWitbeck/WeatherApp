const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("saved-list");
const saved = document.getElementById("saved");

let weather = {
    apiKey: "15b089aa9cb865937c4cf145b36c48e2",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city +
            "&units=imperial&appid=" +
            this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "mph";
        document.querySelector(".weather").classList.remove("loading");
        saved.push(city);
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
    displayList: async function(data) {
        const response = await fetch(`&appid=${apiKey}`);
        var data = await response.json(data);
        document.getElementById(".save-btn");
        this.innerHTML = inputBox.apiKey.value;
        list.displayList;
    },

    addSaved: function() {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        li.addEventListener('click',() => {
            this.fetchWeather(li.textContent);
        })
        listContainer.appendChild(li);
        inputBox.value = "";
    }
};

document.querySelector(".search").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

document.querySelector(".save-btn").addEventListener("click", function () {
    weather.addSaved();
    weather.displayList(data);
});


const history = document.getElementById("saved-list");
const delSaved = document.getElementById("del-saved");
const searchCard = document.getElementById("search-card");
    
let saved1 = localStorage.getItem("saved-list") ? JSON.parse(localStorage.getItem("saved-list")): [];

delSaved.addEventListener("click", () => {
    history.firstElementChild.remove();
    saved.splice(0, 1);
    localStorage.setItem("saved-list", JSON.stringify(saved));
});