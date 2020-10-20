var section = document.querySelector('.section-carousel');
var sectionInd = document.querySelector('.section-indicators');
var carousel = document.querySelector('.carousel');
var carouselInnerWrap = carousel.querySelector('.carousel-images-wrap');
var carouselItemWraps = carousel.querySelectorAll('.carousel-item-wrap');

var images = carousel.querySelectorAll('img');
var arrows = carousel.querySelectorAll('.carousel-arrow');

// getting central item's index & margin counter

var counterCenter = 0;
var counterMargin = 1;

for (var i = 0; i < carouselItemWraps.length; i++) {
    counterMargin--;
    if (carouselItemWraps[i].classList.contains('carousel-center')) {
        counterCenter = i;
        counterMargin++;
        break;
    }
}

// calculate sizes

function calcSizes() {
    for (var i = 0; i < images.length; i++) {
        if (i === counterCenter) {
            images[i].style.width = '100%';
            images[i].style.marginLeft = 0;
            images[i].style.marginRight = 0;
        } else if (i < counterCenter) {
            images[i].style.width = '80%';
            images[i].style.marginLeft = '15%';
            images[i].style.marginRight = '5%';
        } else if (i > counterCenter) {
            images[i].style.width = '80%';
            images[i].style.marginLeft = '5%';
            images[i].style.marginRight = '15%';
        }
    }
}

// calculate margins

function calcMargins() {
    var itemWrapWidth = carouselItemWraps[0].style.width;
    itemWrapWidth = +itemWrapWidth.split('px')[0];
    itemWrapWidth = isNaN(itemWrapWidth) ? 0 : itemWrapWidth;

    carouselInnerWrap.style.setProperty('margin-left', (itemWrapWidth * counterMargin) + 'px');
    carouselInnerWrap.style.setProperty('width', ((itemWrapWidth * carouselItemWraps.length) + 500) + 'px');
}

// calculate heights

function calcHeights() {
    var carouselItemWraps = carousel.querySelectorAll('.carousel-item-wrap');
    var centerPosition = 0;

    for (var i = 0; i < carouselItemWraps.length; i++) {    
        if (carouselItemWraps[i].classList.contains('carousel-center')) {
            centerPosition = i;
            break;
        }
    }

    var imgPosition = [0, 1].includes(centerPosition) ? carouselItemWraps.length - 1 : centerPosition - 2;
    var imgNotCenter = carouselItemWraps[imgPosition].querySelector('img');

    carouselItemWraps.forEach(function(wrap) {
        var img = wrap.querySelector('img');

        if (wrap.classList.contains('carousel-center')) {
            wrap.style.paddingTop = 0;
            wrap.style.paddingBottom = 0;
        } else {
            wrap.style.paddingTop = ((carousel.offsetHeight - imgNotCenter.offsetHeight) / 2) + 'px';
        }

        img.style.transition = 'all ease-in-out 1s';
        wrap.style.transition = 'all ease-in-out 1s';
        carouselInnerWrap.style.transition = 'all ease-in-out 1s';
    });

    sectionInd.style.setProperty('padding-top', carousel.offsetHeight + 'px');
    arrows.forEach(arrow => {
        arrow.style.setProperty('top', (carousel.offsetHeight - arrow.offsetHeight) / 2 + 'px');
    });
}

var carouselImages = carousel.querySelectorAll('.carousel-item-wrap img');

carouselImages.forEach(function(img) {
    img.onload = function() {
        calcHeights();
    };
});

// arrows

arrows.forEach(arrow => {
    arrow.addEventListener('click', function(event) {
        if (event.target.classList.contains('arrow-prev') && counterCenter > 0) {
            counterCenter--;
            counterMargin++;
        }

        if (event.target.classList.contains('arrow-next') && counterCenter < (carouselItemWraps.length - 1)) {
            counterCenter++;
            counterMargin--;
        }

        for (var i = 0; i < carouselItemWraps.length; i++) {
            carouselItemWraps[i].classList.remove('carousel-center');
        }

        carouselItemWraps[counterCenter].classList.add('carousel-center');
        calcMargins();
        calcSizes();
        calcHeights();
    });
});

function carouselCalc() {
    carouselItemWraps.forEach(wrapItem => {
        wrapItem.style.width = (window.innerWidth / 3) + 'px';
    });
    carouselInnerWrap.width = carouselItemWraps && carouselItemWraps[0].style.width * carouselItemWraps.length;

    arrows.forEach(arrow => {
        arrow.style.top = ((carousel.offsetHeight - arrow.offsetHeight) / 2) + 'px';
    });
    calcMargins();
    // calcHeights();
}

carouselCalc();
calcSizes();
calcHeights();

window.onresize = carouselCalc;

