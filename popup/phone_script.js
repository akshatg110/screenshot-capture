// phone_script.js
document.getElementById('phoneForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // var phoneNumber = document.getElementById('phoneNumber').value;

  // Replace phone number input with OTP input and store phone number
  // document.getElementById('phoneNumber').outerHTML = '<input type="text" id="otp" placeholder="OTP" required>';
  // document.getElementById('hiddenPhoneNumber').value = phoneNumber;
});

document.addEventListener('submit', function(event) {
  if (event.target && event.target.id === 'otpForm') {
    event.preventDefault();

    var otp = document.getElementById('otp').value;
    var phoneNumber = document.getElementById('hiddenPhoneNumber').value;

    // Use the phone number and OTP
    console.log('Phone Number:', phoneNumber);
    console.log('OTP:', otp);

    // Reset or close the popup as needed
    // For example:
    // window.close();
  }
});
