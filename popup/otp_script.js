document.getElementById('otpForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var otp = document.getElementById('otp').value;
  console.log("OTP DATA: ", otp);
  // Send message to background script with the OTP
  chrome.runtime.sendMessage({ action: 'submitOTP', otp: otp });
});
