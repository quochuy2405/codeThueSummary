const head = document.querySelector("header");
const body = document.querySelector("section");
var myobject = "";
let requestURL = "lab9.json";
let request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "text";
request.send();

request.onreadystatechange = function () {
  if (request.readyState === XMLHttpRequest.DONE) {
    if (request.status === 200) {
      const lab9Content = request.response;
      const lab9 = JSON.parse(lab9Content);
      populateHeader(lab9);
      console.table(lab9);
      // showLab9(lab9)
    } else {
      alert("There is something wrong.");
    }
  }
};
function populateHeader(obj) {
  const heading = document.createElement("h1");
  heading.textContent = obj["Category"];
  console.log(heading);
  head.appendChild(heading);
  head.style.textAlign = "center";

  const Text = document.createElement("p");
  Text.textContent = obj["Place"];
  console.log(Text);
  head.appendChild(Text);
  head.style.textAlign = "left";

  console.log(obj["teams"]);
  for (team of obj["teams"]) {
    const Text1 = document.createElement("p");
    Text1.textContent = team.name;
    alert(team.name);
    head.append(Text1);
    head.style.textAlign = "left";

  }
}

function showLab9() {}
//use the function to show the json data
