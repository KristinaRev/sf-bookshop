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
                delay: 3000,
            },
        });

    }
})
