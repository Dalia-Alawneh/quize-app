const nameInput = document.getElementById('name')
const certificateLink = document.getElementById('certificate-link')
nameInput?.addEventListener('change', () => {
    certificateLink.setAttribute('href', `certificate.html?name=${nameInput.value}`)
})

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const name = urlParams?.get('name');

const username = document.getElementById('username')
username?.textContent = name
if (username) {
    username.textContent = name;
}

const dateElement = document.getElementById('date')

if (dateElement) {
    const currentDate = new Date();
    const day = currentDate.getUTCDate();
    const month = currentDate.getUTCMonth() + 1; // Month is zero-based, so add 1
    const year = currentDate.getUTCFullYear();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    dateElement.textContent = formattedDate;
}


