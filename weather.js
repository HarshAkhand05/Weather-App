const usertab = document.querySelector("[data-user]")
const searchtab = document.querySelector("[data-any]")
const weathercontainer = document.querySelector(".weather-cont")
const grantacessloc = document.querySelector(".grant-location")
const searchbar = document.querySelector("[data-formserch]")
const loadingscreen = document.querySelector(".loading-screen")
const userinfo = document.querySelector(".user-info")

// variable
let currenttab = usertab;
const API_KEY = "168771779c71f3d64106d8a88376808a";
currenttab.classList.add("current-tab")
 getfromsessionstorage();

function switchtab(clicked) {
    if (clicked != currenttab) {
        currenttab.classList.remove("current-tab");
        currenttab = clicked;
        currenttab.classList.add("current-tab")

        if (!searchbar.classList.contains("active")) {
            loadingscreen.classList.remove("active");
            userinfo.classList.remove("active");
            searchbar.classList.add("active");
        }
        else {
            searchbar.classList.remove("active");
            userinfo.classList.remove("active");
            getfromsessionstorage();
        }

    }

}

usertab.addEventListener("click", () => {
    switchtab(usertab);
})
searchtab.addEventListener("click", () => {
    switchtab(searchtab);
})

//  check coordinate present or not
function getfromsessionstorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinate");
    if (!localCoordinates) {
        grantacessloc.classList.add("active")
    }
    else {
        const coordi = JSON.parse(localCoordinates);
        fetchuserweatherinfo(coordi);
    }

}
async function fetchuserweatherinfo(coordinates) {
    const { lat, lon } = coordinates;
    grantacessloc.classList.remove("active")
    loadingscreen.classList.add("active")
    try {
        const res =await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        const data = await res.json();
    
        loadingscreen.classList.remove("active");
        userinfo.classList.add("active");
        renderweatherinfo(data);
    } catch (error) {
        loadingscreen.classList.remove("active");
        userinfo.computedStyleMap.im

    }

}
function renderweatherinfo(weatherinfo) {
    const cityname = document.querySelector("[data-city]")
    const country = document.querySelector("[data-contry-icon]")
    const citydisc = document.querySelector("[data-discrp]")
    const weathericon = document.querySelector("[weather-icon]")
    const temp = document.querySelector("[data-temp]")
    const windspeed = document.querySelector("[data-wind-speed ]")
    const humidity = document.querySelector("[humidity-data]")
    const cloudinfo = document.querySelector("[colud-info ]")


    // Fetch value from weather info 
    cityname.innerText = weatherinfo?.name;
    country.src = `https://flagcdn.com/144x108/${weatherinfo?.sys?.country.toLowerCase()}.png`;
    citydisc.innerText = weatherinfo?.weather?.[0]?.description;
    weathericon.src = `http://openweathermap.org/img/w/${weatherinfo?.weather?.[0]?.icon}.png`
    temp.innerText = `${weatherinfo?.main?.temp} °C`;
    windspeed.innerText =`${ weatherinfo?.wind?.speed}  m/s`;
    humidity.innerText = `${weatherinfo?.main?.humidity}%`;
    cloudinfo.innerText =`${ weatherinfo?.clouds?.all}%`;
}



function getuserloc() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
    }
    else {
        alert("NO Geolocation support available");
    }

}


function showPosition(position) {
    const usercoordinates =
    {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    console.log(usercoordinates.lat)
    sessionStorage.setItem("user-coordinate", JSON.stringify(usercoordinates));
    fetchuserweatherinfo(usercoordinates);
}

const grantacessbutton = document.querySelector("[data-access]")
grantacessbutton.addEventListener('click', getuserloc)


const searchinpt= document.querySelector("[data-searchinput]")
searchbar.addEventListener("submit",(e)=>{
    e.preventDefault();
    let citynaam= searchinpt.value;
    console.log(citynaam);
    if(citynaam==="")
    {
        return;
    }
    else{
        fetchsearchweatherinfo(citynaam);
    }

})


async function fetchsearchweatherinfo(citynaam)
{
    loadingscreen.classList.add("active");
    userinfo.classList.remove("active");
    grantacessloc.classList.remove("active");
    try {
        const response1 =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citynaam}&appid=${API_KEY}&units=metric`);
        const data = await response1.json();
        console.log("city",data);
        loadingscreen.classList.remove("active");
        userinfo.classList.add("active");
        renderweatherinfo(data);
    } catch (err) {
        
    }
}