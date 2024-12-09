document.addEventListener('DOMContentLoaded', () => {
    const interBubble = document.querySelector('.interactive');
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    const move = () => {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(move);
    };

    window.addEventListener('mousemove', event => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.onmousemove = (event) => {

            const x = event.clientX - card.getBoundingClientRect().left;
            const y = event.clientY - card.getBoundingClientRect().top;
            card.style.setProperty('--x', x + 'px');
            card.style.setProperty('--y', y + 'px');
        }
        let isTouching = false;

        card.addEventListener('touchstart', (event) => {
            isTouching = true;
            card.classList.add('active');
        });

        card.addEventListener('touchmove', (event) => {
            if (isTouching) {
                const rect = card.getBoundingClientRect();
                const x = event.touches[0].clientX - rect.left;
                const y = event.touches[0].clientY - rect.top;

                card.style.setProperty('--x', x + 'px');
                card.style.setProperty('--y', y + 'px');
            }
        });

        card.addEventListener('touchend', (event) => {
            isTouching = false;
            card.classList.remove('active');
        });
    })
    const myAtropos = Atropos({
        el: '.atropos',
        shadow: false,
        rotateXMax: 10,
        rotateYMax: 10,
        activeOffset: 20,

    });
})

function adjustFontSize() {
    const content = document.getElementsByClassName('container')[0];
    let fontSize = parseFloat(window.getComputedStyle(document.body).fontSize);


    while (document.getElementsByClassName('content')[0].scrollHeight > parseFloat(window.getComputedStyle(content).height)) {
        fontSize -= 0.1;
        document.body.style.fontSize = `${fontSize}px`;
    }
    content.style.opacity = 1;
}


window.addEventListener('load', adjustFontSize);

window.addEventListener('resize', adjustFontSize);
