// function weather_api() {
//   fetch("http://api.weatherapi.com/v1/current.json?key=54e4284f6ee544f3af490603242701&q=${state_type.value}")
//   .then(res=> res.json())
//   .then(data=> console.log(data.location.name))
// }



  const region = [ "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry"]

  const state_type = document.querySelector(".search-bar");
  const select_type = document.getElementById("regionselect");

  function filterstate(){
    const filter_text = state_type.value.toUpperCase();
    const filter_state = region.filter(state => state.toUpperCase().startsWith(filter_text))

    select_type.innerHTML = "";

    filter_state.forEach(
      state => {
        const option = document.createElement("option")
        option.textContent = state;
        select_type.appendChild(option);
      }
    );

    select_type.style.display = filter_state.length > 0 ? "block" : "none";
  }

  function selecttext(){
    state_type.value = select_type.value
    select_type.style.display = "none"
  }

  async function weather_api() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=54e4284f6ee544f3af490603242701&q=${state_type.value}`)
    .then(res=> res.json())
    .then(data=> {
      console.log(data)
      document.querySelector(".curcel").innerHTML = data.current.temp_c + "&degC";
      document.querySelector(".feels").innerHTML = data.current.feelslike_c + "&degC";
      document.querySelector(".viskm").innerHTML = data.current.vis_km + "km/h";
      document.querySelector(".vismiles").innerHTML = data.current.vis_miles + "km/h";
      document.querySelector(".Perstyle").innerHTML = data.current.humidity + "%";
      document.querySelector(".speedstyle").innerHTML = data.current.wind_kph + "km/h";
      document.querySelector(".Pressure").innerHTML = data.current.pressure_mb + "hpa";
      document.querySelector(".Uv").innerHTML = data.current.uv;
      const daytext = document.querySelector(".daytext")
      daytext.innerHTML = data.current.condition.text;
      if(data.current.condition.text == "Partly cloudy" || "Partly Cloudy" ){
        daytext.style.width = "167px";
        daytext.style.fontSize = "24px"
        daytext.style.marginLeft = "76px"
      }
      else{
        daytext.style.width = "160px";
        daytext.style.fontSize = "24px";
        daytext.style.marginLeft = "115px";
      }
      document.querySelector(".sun").src = data.current.condition.icon;
      document.getElementById("precipin").innerHTML = data.current.precip_in;
      document.getElementById("precipmm").innerHTML = data.current.precip_mm;
      document.getElementById("gustkph").innerHTML = data.current.gust_kph;
      document.getElementById("gustmph").innerHTML = data.current.gust_mph;
      document.querySelector(".dir").innerHTML = data.current.wind_dir;
      document.querySelector(".dir2").innerHTML = data.current.wind_degree + "&deg";
      document.querySelector(".dir3").innerHTML = data.current.wind_mph;
    })
  }

  function apievent(fetch){
    console.log("Event Completed, Function Initiated: ", fetch)
  }

  let wetapi = document.querySelector(".search-btn")

  wetapi.addEventListener("click", fethapi);

  async function fethapi(){
    let fetch = await weather_api();

    apievent(fetch);
  }

  const currentdata = new Date();
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  // const weekday = weekdays[currentdata.getDate()];
  // const curdate = currentdata.getDate();

  // const hour = currentdata.getHours();
  // const min = currentdata.getMinutes();

  setInterval(function() {
    currentdata.setSeconds(currentdata.getSeconds() + 1);
    document.getElementById("time").innerHTML = currentdata.getHours() + " : " + currentdata.getMinutes();
  }, 1000);
  document.getElementById("week").innerHTML = weekdays[currentdata.getDay()] + ", " + currentdata.getDate();

let weatherapi = document.querySelector(".search-btn")

weatherapi.addEventListener("click", fethapi);

async function fethapi(){
  let fetch = await weather_api();
  apievent(fetch);

  // Update weather data every 10 minutes
  setInterval(async function() {
    fetch = await weather_api();
    apievent(fetch);
  }, 1 * 60 * 1000);
}
  
