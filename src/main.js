import '../Styles/style.css'
import { createTimeline, stagger, splitText, animate, svg  } from 'animejs';

const { chars } = splitText('#hero', {
    chars: {
        wrap: 'clip',
        clone: 'bottom'
    },
});

createTimeline()
.add(chars, {
    y: '-115%',
    loop: true,
    loopDelay: 5500,
    duration: 750,
    ease: 'inOut(2)',
}, stagger(150, { from: 'center' }));