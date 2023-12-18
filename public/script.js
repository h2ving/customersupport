supportForm = document.getElementById('supportForm')
supportForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var formData = {
        name: this.name.value,
        email: this.email.value,
        message: this.message.value
    };
    console.log(formData);

    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
	console.log(data);
	alert('Inquiry sent successfully');
	supportForm.reset();
	populateInquiries(formData);
    })
    .catch(error => console.error(error));
});

const inquiryDiv = document.getElementById('inquiries')

function populateInquiries(formData) {
    const inquiryCard = document.createElement('div');
    inquiryCard.className = 'inquiryCard';
    const inquiryMessage = document.createElement('p');
    inquiryMessage.className = 'inquiryText';
    const inquiryEmail = document.createElement('p');
    inquiryEmail.className = 'inquiryEmail';
    inquiryEmail.innerHTML = formData.email;
    inquiryMessage.innerHTML = formData.message;
    inquiryCard.appendChild(inquiryMessage);
    inquiryDiv.appendChild(inquiryCard);
}
