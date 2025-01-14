document.addEventListener('DOMContentLoaded', () => {
  // Initialize gallery state
  let currentIndex = 0;
  const images = document.querySelectorAll('.gallery-slide img');  // Get all the images in the gallery
  const totalImages = images.length;  // Get the total number of images
  const gallerySlide = document.querySelector('.gallery-slide');  // The container that holds the images
  const galleryContainer = document.querySelector('.gallery-container');  // The container that holds the gallery and buttons

  // Ensure gallery is not empty
  if (totalImages === 0) return;

// Function to update the gallery
function updateGallery() {
  gallerySlide.style.transform = `translateX(-${currentIndex * galleryContainer.offsetWidth}px)`;  
}


  // Event listener for the 'Previous' button
  const prevButton = document.querySelector('.prev');
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;  // Move to the previous image
      updateGallery();
    });
  }

  // Event listener for the 'Next' button
  const nextButton = document.querySelector('.next');
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;  // Move to the next image
      updateGallery();
    });
  }

  // Optional: Add swipe functionality (for mobile devices)
  let startX = 0;
  let endX = 0;

  galleryContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;  // Store the starting touch position
  });

  galleryContainer.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;  // Store the ending touch position

    if (startX - endX > 50) {  // Swipe left (next image)
      currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
      updateGallery();
    } else if (endX - startX > 50) {  // Swipe right (previous image)
      currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
      updateGallery();
    }
  });

  // Initial gallery update to show the first image
  updateGallery();
});





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
      
      // Display success message in the popup modal
      document.getElementById('statusMessage').innerText = 'Thank you for your message! We will get back to you soon.';
      document.getElementById('statusModal').style.display = 'block';

      // Optionally reset the form after submission
      document.getElementById('contact-form').reset();
      
      // Close the modal automatically after 3 seconds
      setTimeout(function() {
        document.getElementById('statusModal').style.display = 'none';
      }, 3000);
    })
    .catch(function(error) {
      console.error('Error sending email:', error);
      
      // Display error message in the popup modal
      document.getElementById('statusMessage').innerText = 'Oops! Something went wrong, please try again later.';
      document.getElementById('statusModal').style.display = 'block';

      // Close the modal automatically after 3 seconds
      setTimeout(function() {
        document.getElementById('statusModal').style.display = 'none';
      }, 3000);
    });
});

// Close the status popup manually when the close button is clicked
document.getElementById('closeStatusModal').addEventListener('click', function() {
  document.getElementById('statusModal').style.display = 'none';
});

