const container = document.querySelector('.container');

const updateLibrary = (myLibrary) => {
    return sessionStorage.setItem('myLibrary', JSON.stringify(myLibrary));
};

const getLibrary = () => {
    return JSON.parse(sessionStorage.getItem('myLibrary'));
};

let myLibrary = getLibrary();

// function reseting cards
const clearLibrary = () => {
    return updateLibrary([]);
};

const clearAllBooks = () => {
    clearLibrary();
    displayBooks();
};


if (sessionStorage.getItem('myLibrary') === null) {
    clearLibrary();
}

const changeBook = () => {
    console.log('changeBook');
};

const displayBook = () => {
    console.log('displayBook');
};

const removeBookFromLibrary = (book) => {
    myLibrary.splice(book, 1);
    updateLibrary(myLibrary);
    displayBooks(); // display books
};

document.getElementById('form').addEventListener('submit', addBook);
document.getElementById('resetBooks').addEventListener('click', clearAllBooks);
container.addEventListener('click', changeBook);

displayBooks();

// function with variable collected data from input
function getBookFromInput(book) {
    const title = document.getElementById('formTitle').value;
    const author = document.getElementById('formAuthor').value;
    const genre = document.getElementById('formGenre').value;
    return new Book(title, author, genre);
}

// function add books to the library
function addBook(book) {
    const newBook = getBookFromInput(book);
    addBookToLibrary(newBook);
    displayBooks();
    book.preventDefault();
    document.getElementById('form').reset();
}


// add constructor
class Book{
    constructor(
        title = "Unknown",
        author = "Unknown",
        genre = "Unknown",
    ) {
        this.title = title;
        this.author = author;
        this.genre = genre;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    updateLibrary(myLibrary);
}

// function creating card with books
function displayBooks() {
    container.innerHTML = ''; // reset container
    myLibrary = getLibrary();

    for (i = 0; i < myLibrary.length; i++) {
        makeCard(myLibrary[i]);
    }
}

// function to create new book cards

function makeCard(book)
{
    const card = document.createElement('div');
    const title = document.createElement('h1');
    const author = document.createElement('h2');
    const genre = document.createElement('p');
    const removeButton = document.createElement('BUTTON');

    removeButton.className = 'removeButton';
    removeButton.innerText = 'Remove Book';
    const bookIndex = myLibrary.indexOf(book);
    removeButton.setAttribute("data-index", bookIndex);
    removeButton.addEventListener('click', () => removeBookFromLibrary(bookIndex));
    card.classList.add('card');

    title.textContent = book.title;
    author.textContent = book.author;
    genre.textContent = `${book.genre} genre`;

    card.append(title);
    card.append(author);
    card.append(genre);
    card.append(removeButton);
    card.setAttribute("data-index", myLibrary.indexOf(book));

    container.append(card);
}

// open and close form window

function openForm() {
    document.getElementById("bookForm").style.display = "block";
}
