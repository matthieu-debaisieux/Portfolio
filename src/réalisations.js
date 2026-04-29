import '../styles/style.css'
import { animate } from 'animejs'

const cards = document.querySelectorAll('[data-proj]')

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        const idx = Array.from(cards).indexOf(entry.target)

        animate(entry.target, {
            opacity: { from: 0, to: 1 },
            translateY: { from: 30, to: 0 },
            duration: 530,
            delay: idx * 100,
            ease: 'outExpo',
        })

        observer.unobserve(entry.target)
        })
    },
    { threshold: 0.08 }
)

cards.forEach((card) => observer.observe(card))