document.getElementById('phoneForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Retrieve the phone number from the form
  var phoneNumber = document.getElementById('phoneNumber').value;


  // Store the phone number in the hidden input field
  document.getElementById('hiddenPhoneNumber').value = phoneNumber;


  window.location.href = 'otp_popup.html?phoneNumber=' + encodeURIComponent(phoneNumber);
  // Execute the JavaScript file
  // phoneScriptFunction();
});
