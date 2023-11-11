import Swiper, {Pagination, Mousewheel, Autoplay} from 'swiper';

window.addEventListener('load', () => {
    if (!document.querySelector('.main')) {
        return false
    } else {

        // eslint-disable-next-line
        const swiper = new Swiper('.swiper-container', {
            modules: [Pagination, Mousewheel, Autoplay],
            loop: true,
            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 5000,
            },
        });

        const key = 'AIzaSyBJze3ZHSv24m5POOMQO0TpJ7SibtMK17s'
        const booksPerPage = 6;
        let startIndex = 0;
        let currentCategory = 'Architecture';

        const booksContainer = document.querySelector('.shop__books-container');
        const loadButton = document.querySelector('.shop__load-button');
        const categoryButtons = document.querySelectorAll('.shop__category-btn');

        const truncateText = (text, maxLength) => {
            if (text.length > maxLength) {
                return text.slice(0, maxLength) + '...';
            }
            return text;
        };

        const fetchBooks = (category) => {
            const booksApi = `https://www.googleapis.com/books/v1/volumes?q="subject:${category}"&key=${key}&printType=books&startIndex=${startIndex}&maxResults=${booksPerPage}&langRestrict=en`;

            fetch(booksApi)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    booksContainer.innerHTML = ''

                    data.items.forEach(book => {
                        const bookContainer = document.createElement('div');
                        bookContainer.className = 'book';

                        const createElem = (tag, text, className) => {
                            const element = document.createElement(tag);
                            element.textContent = text;
                            element.className = className;
                            return element;
                        };

                        const imgContainer = document.createElement('div');
                        imgContainer.classList.add('book__img');
                        const imgSrc = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '';
                        const bookImg = book.volumeInfo.imageLinks? createElem('img', '', '') : createElem('span', 'It`s awesome book', 'book__img-text');
                        bookImg.src = imgSrc;
                        imgContainer.appendChild(bookImg);

                        const innerContainer = document.createElement('div');
                        innerContainer.classList.add('book__inner');

                        const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : '';
                        innerContainer.appendChild(createElem('h5', authors, 'book__authors'));
                        innerContainer.appendChild(createElem('h3', book.volumeInfo.title, 'book__title'));

                        const description = book.volumeInfo.description ? truncateText(book.volumeInfo.description, 87) : 'No description';
                        innerContainer.appendChild(createElem('p', description, 'book__description'));

                        innerContainer.appendChild(createElem('h4', book.saleInfo.retailPrice ? book.saleInfo.retailPrice.amount + ' ' + book.saleInfo.retailPrice.currencyCode : 'No price', 'book__price'));

                        const saleAbility = book.saleInfo.saleability;
                        const saleAbilityBtnText = saleAbility === 'FOR_SALE' ? 'Buy now' : saleAbility === 'FREE' ? 'Free' : 'In the cart';
                        const saleBtnStyles = saleAbility === 'FOR_SALE' ? 'book__button book__button_buy' : saleAbility === 'FREE' ? 'book__button book__button_free' : 'book__button book__button_cart';
                        const buyButton = createElem('button', saleAbilityBtnText, saleBtnStyles);
                        innerContainer.appendChild(buyButton);

                        bookContainer.appendChild(imgContainer);
                        bookContainer.appendChild(innerContainer);

                        booksContainer.appendChild(bookContainer);
                    });
                })
                .catch(error => console.error('Ошибка при запросе:', error));
        };

        fetchBooks(currentCategory);

        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {

                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Обновляем текущую категорию и загружаем соответствующие книги
                currentCategory = button.textContent.trim();
                startIndex = 0;
                fetchBooks(currentCategory);
            });
        });

        loadButton.addEventListener('click', () => {
            startIndex += booksPerPage; // Увеличиваем startIndex для запроса следующей страницы
            fetchBooks(currentCategory);
        });

    }
})
