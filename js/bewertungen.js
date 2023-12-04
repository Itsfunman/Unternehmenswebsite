function saveReview() {
    var title = document.getElementById('reviewTitle').value.trim();
    var text = document.getElementById('reviewText').value.trim();
    var stars = document.getElementById('reviewStars').value;

    if (!title || !text || stars < 1 || stars > 5) {
        alert('Bitte füllen Sie alle Felder korrekt aus. Sternebewertung muss zwischen 1 und 5 liegen.');
        return;
    }

    var reviewHTML = '<div class="commonStyles panel review slideInLeft">' +
                     '<div class="stars">' + '&#9733;'.repeat(stars) + '&#9734;'.repeat(5-stars) + '</div>' +
                     '<h3 class="boxTitleBewertung">' + title + '</h3>' +
                     '<p class="text-bewertung">' + text + '</p></div>';

    document.querySelector('.boxes').innerHTML += reviewHTML;
    document.getElementById('reviewPopup').style.display = 'none';
}


function closeReviewPopup() {
    var closeConfirmation = confirm('Möchten Sie das Bewertungspopup schließen? Alle ungespeicherten Änderungen gehen verloren.');
    if (closeConfirmation) {
        document.getElementById('reviewPopup').style.display = 'none';
        document.getElementById('reviewTitle').value = '';
        document.getElementById('reviewText').value = '';
        document.getElementById('reviewStars').value = '';
    }
}


function showReviewPopup() {
    document.getElementById('reviewPopup').style.display = 'block';
}