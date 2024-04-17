document.getElementById('otpForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var otp = document.getElementById('otp').value;
  console.log("OTP DATA: ", otp);
  var queryString = window.location.search;

// Parse the query string to extract the parameters
  var urlParams = new URLSearchParams(queryString);

// Get the value of the 'phoneNumber' parameter
  var phoneNumber = urlParams.get('phoneNumber');

// Log the retrieved phone number
  console.log('Phone Number 321234:', phoneNumber);
  // Send message to background script with the OTP
  chrome.runtime.sendMessage({ action: 'submitOTP', otp: otp });
});
