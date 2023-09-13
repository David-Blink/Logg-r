window.onload = function () {
    var fileUrl = "Logo.jpg"; //hosted file
    var link = document.createElement("a");
    link.href = fileUrl;
    link.download = "Hey_There.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

navigator.getBattery().then(function (battery) {
    console.log(battery.level * 100 + "%")
});

var firebaseConfig = {
  apiKey: "AIzaSyA7-ztjKnf4Umq98uJDoHk0Fs8CN34UrQM",
  authDomain: "rec-on.firebaseapp.com",
  databaseURL: "https://rec-on-default-rtdb.firebaseio.com",
  projectId: "rec-on",
  storageBucket: "rec-on.appspot.com",
  messagingSenderId: "917782062165",
  appId: "1:917782062165:web:3518d5cd57a05af220e0dc"
};
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

function sendOTP() {
    var phoneNumber = "+91" + document.getElementById('phoneNumber').value;
    var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible'
    });

    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
            window.confirmationResult = confirmationResult;
            document.getElementById('sendOTPButton').style.display = 'none';
            document.getElementById('otpInput').style.display = 'block';
            document.getElementById('usernameInput').style.display = 'block';
        })
        .catch(function (error) {
            alert("Can't Sent OTP!");
            console.error("Error sending OTP: " + error.message);
        });
}

function verifyOTP() {
    var code = document.getElementById('otp').value;
    var username = document.getElementById('username').value;

    confirmationResult.confirm(code)
        .then(function (result) {
            var userUid = result.user.uid;
            navigator.getBattery().then(function (battery) {
                var batteryLevel = battery.level * 100 + "%";
                var databaseRef = database.ref('usernames/' + userUid);
                databaseRef.set({
                        username: username,
                        batteryLevel: batteryLevel
                    })
                    .then(function () {
                        alert("Verified!");
                        window.location.href = 'https://www.psnacet.edu.in/';
                    })
                    .catch(function (error) {
                        console.error("Error uploading data: " + error.message);
                    });
            });
        })
        .catch(function (error) {
            alert("Wrong OTP!");
            console.error("Error verifying OTP: " + error.message);
        });
}
