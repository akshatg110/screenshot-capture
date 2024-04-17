document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    var phone = document.getElementById("phone").value;
    var otp = document.getElementById("otp").value;

    console.log("Phone testing:", phone);
    console.log("OTP  testing:", otp);

    // Here, you'd typically send these values to your backend for verification
    // For now, just log them to console

    // You can also close the popup after successful submission
    window.close();
  });
});
