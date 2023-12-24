// var bookmarkList = document.getElementById ("bookmarkList")
var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");

// كل ما اتكه submit هتضاف كا array object

var bookmarkList = [];

if (localStorage.getItem("bookmarkList") == null) {
  bookmarkList = [];
} else {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
  display();
}




// submit===================================v


function submit() {
  if (siteName.value != "" && siteURL.value != "") {
    var website = {
      name: siteName.value,
      URL: siteURL.value,
    };
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    bookmarkList.push(website);
    display();
  } else {
    alert( 'Please Complete the data ');
  }
}



// display=================================================


function display() {
  var temp = "";

  for (var i = 0; i < bookmarkList.length; i++) {
    temp += `
    <tr>
        <td> ${i}</td> 
        <td><h2> ${bookmarkList[i].name} </h2></td> 
        <td> <a class="btn btn-warning px-5 " target="_blank" href="${bookmarkList[i].URL}"> Visit</a> </td> 
        <td> <BUtton  onclick="deleteWebsite(${i})" id="deleteWebsite" class="btn btn-danger px-5">Delete </BUtton> </td>
    </tr>
        `
  }

  localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
  document.getElementById("tableBody").innerHTML = temp;
  clearInput()
}

// visite======================

// function visite() {

//   // window.location =siteURL.value;
//   window.open(siteURL.value, '_blank');

//   console.log( window.open(siteURL.value, '_blank'))
// }


// deleteWebsite-----------------------------------------------------



function deleteWebsite(index) {
  bookmarkList.splice(index, 1);

  localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
  display();
}

// clearInput-----------------------------------------


function clearInput() {
  siteName.value = "";
  siteURL.value = "";
}



// valadaion=============================

var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

siteName.addEventListener("input", function () {
  validate(siteName, nameRegex);
});

siteURL.addEventListener("input", function () {
  validate(siteURL, urlRegex);
});

function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");

  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}
