function openModal() {
  document.getElementById('contactModal').style.display = 'block';
}

// function closeModal() {
//   document.getElementById('contactModal').style.display = 'none';
// }


// Open the Photo Gallery Modal
function openPhotoModal() {
  document.getElementById('photoModal').style.display = 'block';
}

// Open the Video Gallery Modal
function openVideoModal() {
  document.getElementById('videoModal').style.display = 'block';
}


// Close the modals
function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}



// Close the modal if clicked outside of the modal content
window.onclick = function(event) {
  if (event.target == document.getElementById("contactModal")) {
    closeModal('contactModal');
  } else if (event.target == document.getElementById("photoModal")) {
    closeModal('photoModal');
  } else if (event.target == document.getElementById("videoModal")) {
    closeModal('videoModal');
  }
}


// Initialize EmailJS (replace 'your_user_id' with your actual user ID)
emailjs.init("zxFNhP7UJF6ZKvs1I");

// Function to send email
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get form values
  var formData = new FormData(event.target);
  var name = formData.get('name');
  var email = formData.get('email');
  var phone = formData.get('phone');
  var message = formData.get('message');

  // Create the email data to send to EmailJS (this is for your own email)
  var emailData = {
    name: name,
    email: email,
    phone: phone,
    message: message
  };

  // Send the user's message to your email via EmailJS
  emailjs.sendForm('service_jdqkxpq', 'template_czvxoot', this)
    .then(function(response) {
      console.log('Email sent successfully!', response);
      
      // Close the modal after successful email submission
      closeModal();

      // Optionally reset the form after submission
      document.getElementById('contact-form').reset();


    })
    .catch(function(error) {
      console.error('Error sending email:', error);
    });
});


// JavaScript to control the gallery functionality
// Function to move to the next or previous image//
let currentIndex = 0;
const images = document.querySelectorAll('.gallery-slide img');
const totalImages = images.length;
const gallerySlide = document.querySelector('.gallery-slide');
const galleryContainer = document.querySelector('.gallery-container');

// Set the width of .gallery-slide based on the number of images
gallerySlide.style.width = `${totalImages * 100}%`;  // Total width for all images

// Event listeners for the buttons
document.querySelector('.prev').addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
  updateGallery();
});

document.querySelector('.next').addEventListener('click', () => {
  currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
  updateGallery();
});

// Function to update the gallery
function updateGallery() {
  gallerySlide.style.transform = `translateX(-${currentIndex * galleryContainer.offsetWidth}px)`;  // Move the gallery by container width
}
