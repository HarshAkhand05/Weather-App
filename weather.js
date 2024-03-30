const usertab= document.querySelector("[data-user]")
const searchtab=document.querySelector("[data-any]") 
const weathercontainer =document.querySelector(".weather-cont")
const grantacessloc =document.querySelector(".grant-location")
const searchbar =document.querySelector("[data-formserch]")
const loadingscreen =document.querySelector(".loading-screen")
const userinfo =document.querySelector(".user-info")

// variable
let currenttab=usertab;
const API_KEY="d1845658f92b31c64bd94f06f7188c9c";
currenttab.classList.add("current-tab")


function switchtab(clicked) {
    if(clicked!=currenttab)
    {
        currenttab.classList.remove("current-tab");
        currenttab=clicked;
        currenttab.classList.add("current-tab") 

        if(!searchbar.classList.contains("active"))
        {
            loadingscreen.classList.remove("active");
            userinfo.classList.remove("active");
            searchbar.classList.add("active");
        }
        else{
            searchbar.classList.remove("active");
            userinfo.classList.remove("active");
            getfromsessionstorage(); 
        }
        
    }
    
}

usertab.addEventListener("click",()=>{
    switchtab(usertab);
})
searchtab.addEventListener("click",()=>{
    switchtab(searchtab);
})
 
//  check coordinate present or not
function getfromSessionStorage()
{
            const localCoordinates= sessionStorage.getItem("user-coordinate");
            if(!localCoordinates)
            {
                grantacessloc.classList.add("active")
            } 
            else{
                const coordi=JSON.parse(localCoordinates);
                fetchuserweatherinfo(coordi);
            }
            
}
async function fetchuserweatherinfo(coordinates)
{
    const {lat,lon}=coordinates;
    grantacessloc.classList.remove("active")
    loadingscreen.classList.add("active")
    try {
        const res= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data= await res.json();
        loadingscreen.classList.remove("active");
        userinfo.classList.add("active");
        renderweatherinfo(data);
    } catch (error) {
       loadingscreen.classList.remove("active") 
       
    }

}