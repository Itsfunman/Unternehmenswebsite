document.addEventListener('DOMContentLoaded', loadReviewsFromLocalStorage);

function saveReview() {
    var title = document.getElementById('reviewTitle').value.trim();
    var text = document.getElementById('reviewText').value.trim();
    var stars = parseInt(document.getElementById('reviewStars').value, 10);

    if (!title || !text || isNaN(stars) || stars < 1 || stars > 5) {
        alert('Sternebewertung muss zwischen 1 und 5 liegen.');
        return;
    }

    var review = {
        title: title,
        text: text,
        stars: stars
    };

    addReviewToDOM(review);
    saveReviewToLocalStorage(review);

    document.getElementById('reviewPopup').style.display = 'none';
    resetReviewForm();
}

function resetReviewForm() {
    document.getElementById('reviewTitle').value = '';
    document.getElementById('reviewText').value = '';
    document.getElementById('reviewStars').value = '5';
}

function closeReviewPopup() {
    var closeConfirmation = confirm('Möchten Sie das Bewertungspopup schließen? Alle ungespeicherten Änderungen gehen verloren.');
    if (closeConfirmation) {
        document.getElementById('reviewPopup').style.display = 'none';
        resetReviewForm();
    }
}

function showReviewPopup() {
    document.getElementById('reviewPopup').style.display = 'block';
}

function saveReviewToLocalStorage(review) {
    var reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

function loadReviewsFromLocalStorage() {
    var reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.forEach(addReviewToDOM);
}

function addReviewToDOM(review) {
    var starsFilled = '&#9733;'.repeat(review.stars);
    var starsUnfilled = '&#9734;'.repeat(5 - review.stars);
    var reviewHTML = `<div class="commonStyles panel review slideInLeft">
                        <div class="stars">${starsFilled}${starsUnfilled}</div>
                        <h3 class="boxTitleBewertung">${review.title}</h3>
                        <p class="text-bewertung">${review.text}</p>
                      </div>`;

    document.querySelector('.boxes').innerHTML += reviewHTML;
}
