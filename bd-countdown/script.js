// Set the date we're counting down to
const countDownDate = new Date("Apr 28, 2021 00:00:00").getTime();

// Update the count down every 1 second
const x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  if (days === 1) {var dayNaming = " Tag, "} else {var dayNaming=" Tage, "}
  if (hours === 1) {var hourNaming = " Stunde, "} else {var hourNaming=" Stunden, "}
  if (minutes === 1) {var minuteNaming = " Minute, "} else {var minuteNaming=" Minuten, "}
  if (seconds === 1) {var secondNaming = " Sekunde"} else {var secondNaming=" Sekunden"}

  document.getElementById("countdown").innerHTML = days + dayNaming + hours + hourNaming + minutes + minuteNaming + seconds + secondNaming;

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "Feier mit uns 5 Jahre Codingschule!";
  }
}, 1000);