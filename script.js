// Function to show character details
function showCharacterDetails(character) {
  document.getElementById("name").textContent = character.name;
  document.getElementById("anime").textContent = character.anime;
  document.getElementById("poster").src = character.image_url;
  document.getElementById("poster").alt = character.name;  
  document.getElementById("abilities").textContent = `Abilities: ${character.abilities.join(", ")}`;
  document.getElementById("gif").src = character.gif_url;

  const reviewsList = document.getElementById("fan-reviews");
  reviewsList.innerHTML = ''; 

  if (character.reviews && character.reviews.length > 0) {
    character.reviews.forEach(review => {
      const reviewItem = document.createElement("li");
      
      reviewItem.textContent = `"${review.review}" - ${review.name}`;
      
      reviewsList.appendChild(reviewItem);
    });
  } else {
    const noReviewsItem = document.createElement("li");
    noReviewsItem.textContent = "No reviews available.";
    reviewsList.appendChild(noReviewsItem);
  }
}

fetch('db.json')
  .then(response => response.json())
  .then(data => {
    populateCharacterList(data.anime_characters);
    if (data.anime_characters.length > 0) {
      showCharacterDetails(data.anime_characters[0]);
    }
  })
  .catch(error => {
    console.error('Error loading the JSON data:', error);
  });

function populateCharacterList(characters) {
  const listElement = document.getElementById("maincharac");

  characters.forEach(character => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.textContent = character.name;

    listItem.addEventListener("click", () => showCharacterDetails(character));

    listElement.appendChild(listItem);
  });
}

document.getElementById("mode-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const button = document.getElementById("mode-toggle");
  if (document.body.classList.contains("dark-mode")) {
    button.textContent = "Switch to Light Mode";
  } else {
    button.textContent = "Switch to Dark Mode";
  }
});


const reviewForm = document.getElementById('review-form');
const reviewerNameInput = document.getElementById('reviewer-name');
const reviewTextInput = document.getElementById('review-text');
const outputDiv = document.querySelector('.output');

reviewForm.addEventListener('submit', function (event) {
  event.preventDefault(); 
  
  const reviewerName = reviewerNameInput.value;
  const reviewText = reviewTextInput.value;
  
  if (reviewerName && reviewText) {
    const reviewContainer = document.createElement('div');
    reviewContainer.classList.add('review-item');
    
    const nameElement = document.createElement('h5');
    nameElement.textContent = reviewerName;
    
    const reviewElement = document.createElement('p');
    reviewElement.textContent = reviewText;

    reviewContainer.appendChild(nameElement);
    reviewContainer.appendChild(reviewElement);

    outputDiv.appendChild(reviewContainer);

    reviewerNameInput.value = '';
    reviewTextInput.value = '';
  }
});

