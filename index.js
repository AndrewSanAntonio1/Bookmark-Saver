const bookmarkElement = document.querySelector('.js-name-input');
const urlElement = document.querySelector('.js-url-input');
const button = document.querySelector('.js-bookmark-button');
const display = document.querySelector('.display');

let bookmarks = [];
const savedBookmarks = localStorage.getItem('bookmarks');
if (savedBookmarks) {
    bookmarks = JSON.parse(savedBookmarks);
    updateDisplay();
}
button.addEventListener('click', () => {
    let name = bookmarkElement.value;
    let url = urlElement.value;

    if (!url || !name) return;

    bookmarks.push({
        name: name,
        url: url
    });

    updateDisplay();
    bookmarkElement.value = "";
    urlElement.value = "";
});

function updateDisplay() {
    display.innerHTML = "";

    bookmarks.forEach((book,index) => {
        display.innerHTML += `
            <div class="display-div">
                <a href="${book.url}">${book.name}</a>
                <button class="btn" data-index="${index}">
                    Remove
                </button>
            </div>
        `;
    });

    const removeButton = document.querySelectorAll('.btn');
    removeButton.forEach(btn => {
        btn.addEventListener('click', () => {
            let i = btn.getAttribute('data-index');
            bookmarks.splice(i, 1);
            updateDisplay();
        });
    });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}