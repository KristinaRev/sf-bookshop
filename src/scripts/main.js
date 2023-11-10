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

        fetch(booksApi)
            .then(response => response.json())

            .then(data => {
                console.log(data)
            })
            .catch(error => console.error('Ошибка при запросе:', error))

    }
})
