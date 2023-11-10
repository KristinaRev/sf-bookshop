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

        const booksApi = 'https://www.googleapis.com/books/v1/volumes?q="subject:Business"&key=AIzaSyBJze3ZHSv24m5POOMQO0TpJ7SibtMK17s&printType=books&startIndex=0&maxResults=6&langRestrict=en';

        const truncateText = (text, maxLenght) => {
            if (text.length > maxLenght) {
                return text.slice(0, maxLenght) + '...'
            }

            return text
        }


        fetch(booksApi)
            .then(response => response.json())

            .then(data => {
                console.log(data)

                const booksContainer = document.querySelector('.shop__books-container')

                data.items.forEach(book => {

                    const bookContainer = Object.assign(document.createElement('div'),  {
                        className: 'book'
                    })
                    const createElem = (tag, text, className) => Object.assign(document.createElement(tag), {
                        textContent: text,
                        className: className
                    })

                    const imgContainer = document.createElement('div')
                    imgContainer.classList.add('book__img')
                    const imgSrc = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumnail : 'img.jpg'
                    const bookImg = createElem('img', '', '')
                    bookImg.src = imgSrc
                    imgContainer.appendChild(bookImg)

                    const innerContainer = document.createElement('div')
                    innerContainer.classList.add('book__inner')

                    const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : ''
                    innerContainer.appendChild(createElem('h5', authors, 'book__authors'))

                    innerContainer.appendChild(createElem('h3', book.volumeInfo.title, 'book__title'))

                    const description = book.volumeInfo.description ? truncateText(book.volumeInfo.description, 87) : 'No description'
                    innerContainer.appendChild(createElem('p', description, 'book__description'))

                    innerContainer.appendChild(createElem('h4', book.saleInfo.retailPrice ? book.saleInfo.retailPrice.amount + '' + book.saleInfo.retailPrice.currencyCode : 'No price', 'book__price'))

                    const saleAbility = book.saleInfo.saleability
                    const saleAbilityBtnText = saleAbility === 'FOR_SALE' ? 'Buy now': saleAbility === 'FREE' ? 'free' :  'in the cart'
                    const saleBtnStyles = saleAbility === 'FOR_SALE' ? 'book__button book__button_buy': saleAbility === 'FREE' ? 'book__button book__button_free' :  'book__button book__button_cart'
                    const buyButton = createElem('button', saleAbilityBtnText, saleBtnStyles)
                    innerContainer.appendChild(buyButton)

                    bookContainer.appendChild(imgContainer)
                    bookContainer.appendChild(innerContainer)

                    booksContainer.appendChild(bookContainer)

                })
            })
            .catch(error => console.error('Ошибка при запросе:', error))

    }
})
