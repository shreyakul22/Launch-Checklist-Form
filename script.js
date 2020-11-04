// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/


window.addEventListener("load", function() {
   let form = document.querySelector("#launchForm");
   form.addEventListener("submit", function(event) {
      //alert("submit clicked");
      event.preventDefault();
      let pilot = document.querySelector("input[name=pilotName]");
      let copilot = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");            
      if (pilot.value === "" || copilot.value === ""|| fuelLevel.value === ""|| cargoMass.value === "") {
         alert("All fields are required!"); //add validation to notify the user if they forgot to enter a value for any one of the fields.
         // stop the form submission
         event.preventDefault();
      };
      if (!isNaN(pilot.value) || !isNaN(copilot.value)) {
         alert("Type error: The pilot and co-pilot fields must be a string!");
         // stop the form submission
         event.preventDefault();
      };
      if (isNaN(fuelLevel.value) || isNaN(cargoMass.value)) {
         alert("Type error: The fuel level and cargo mass fields must be a number!");
         // stop the form submission
         event.preventDefault();
      };

      if (fuelLevel.value <= 10000) {
         alert("Type error: The fuel must be more than 10,000!");
         document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch."
         document.getElementById("launchStatus").style.color = "red";
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot.value} is ready for launch.`;
         document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilot.value} is ready for launch.`;
         document.getElementById("fuelStatus").innerHTML = "There is not enough fuel for the journey.";
         // stop the form submission
         event.preventDefault();
      };
      if (cargoMass.value >= 10000) {
         alert("Type error: The cargo mass must be less than 10,000!");
         document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch."
         document.getElementById("launchStatus").style.color = "red";
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot.value} is ready for launch.`;
         document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilot.value} is ready for launch.`;
         document.getElementById("cargoStatus").innerHTML = "There is too much cargo mass for the shuttle to take off.";
         // stop the form submission
         event.preventDefault();
      };
      if ((fuelLevel.value >= 10000) && (cargoMass.value <= 10000)) {
         //alert("All systems go!");
         document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch.";
         document.getElementById("launchStatus").style.color = "green";
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot.value} is ready for launch.`;
         document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilot.value} is ready for launch.`;
         event.preventDefault();
      };
   });
      
   let json =[];
      fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
         response.json().then( function(json) {
         //This block of code shows how to format the HTML once you fetch some planetary JSON!
      let div = document.getElementById("missionTarget");
      let i = Math.floor(Math.random() * json.length); 
      let planet = json[i];          
      div.innerHTML = `<h2>Mission Destination</h2>
      <ol>
         <li>Name: ${planet.name}</li>
         <li>Diameter: ${planet.diameter}</li>
         <li>Star: ${planet.star}</li>
         <li>Distance from Earth: ${planet.distance}</li>
         <li>Number of Moons: ${planet.moons}</li>
      </ol>
      <img src="${planet.image}">
      </img>
      `;
      });
   });
});