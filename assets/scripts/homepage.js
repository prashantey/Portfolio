//Error Message
let timeout;

function showErrorMsg(message) {
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
    timeout = setTimeout(function () {
        errorMsg.style.display = 'none';
    }, 5000);
}
   
function clearErrorMsg() {
    const errorMsg = document.getElementById('errorMsg');
    clearTimeout(timeout);
    errorMsg.style.display = 'none';
}   
    
const errorMsg = document.getElementById('errorMsg');
errorMsg.addEventListener('mouseover', function () {
    clearTimeout(timeout);
});

errorMsg.addEventListener('mouseout', function () {
    timeout = setTimeout(function () {
        errorMsg.style.display = 'none';
    }, 5000);
});

// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;   
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {

            navLinks.forEach(links => {

                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');

            });
        }
    });


    // sticky header
     let header = document.querySelector("header");

     header.classList.toggle("sticky",window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // animation footer on scroll

}
// Contact Form
const form = document.querySelector("form");
const fullname = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const message = document.getElementById("message");


//  Form Validation
function Validation(){
    if(fullname.value == ""){
        showErrorMsg("Please Enter FullName")
        return false;
    }else if(email.value == ""){
        showErrorMsg("Please Enter Your Email")
        return false;
    }else if(phone.value ==""){
        showErrorMsg("Please Enter a Number")
        return false
    }else if(subject.value == ""){
        showErrorMsg("Enter Email subject")
        return false;
    }else if(message.value == ""){
        showErrorMsg("Enter Your Message")
        return false
    }else{
        return true
    }
}
//Email sending
form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (Validation()) {
        var data = new FormData(event.target);
        fetch(event.target.action, {
          method: form.method,
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        }).then(response => {
          if (response.ok) {
            Swal.fire({
                        title: "Success!",
                        text: "Message sent Successfully!",
                        icon: "success"
                    });
            form.reset();
          } else {
            response.json().then(data => {
              if (Object.hasOwnProperty(data, 'errors')) {
                showErrorMsg(data["errors"].map(error => error["message"]).join(", "))
              } else {
                Swal.fire({
                    title: "Oops..!",
                    text: "There was a problem Sending your message",
                    icon: "error"
                  });
              }
            })
          }
        }).catch(error => {
            Swal.fire({
                title: "Oops..!",
                text: "There was a problem Sending your message",
                icon: "error"
              });
        });
    }
});

function clearFields() {
    document.getElementById('name').value = ''
    document.getElementById("subject").value = ''
    document.getElementById("message").value = ''
    document.getElementById('email').value = ''
    document.getElementById('phone').value = ''
}

document.getElementById("readMoreLink").addEventListener("click", function(event){
    event.preventDefault(); // prevent default behavior of anchor tag
    
    var extraText = document.getElementById("extraText");
    var readMoreLink = document.getElementById("readMoreLink");
    
    if (extraText.style.display === "none") {
      extraText.style.display = "inline"; // show hidden text
      readMoreLink.textContent = "Hide"; // change text of read more link
    } else {
      extraText.style.display = "none"; // hide shown text
      readMoreLink.textContent = "Read More"; // change text of read more link
    }
  });