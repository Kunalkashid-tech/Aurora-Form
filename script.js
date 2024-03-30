document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let formData = new FormData(this);
    let jsonData = {};  

    formData.forEach((value, key) => { 
        jsonData[key] = value; 
    });

    fetch("/send-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        if (response.ok) {
            alert("Message sent successfully!");
        } else {
            alert("Failed to send message. Please try again later.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    });
});