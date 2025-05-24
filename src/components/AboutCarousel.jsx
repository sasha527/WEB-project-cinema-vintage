// src/components/AboutCarousel.jsx
import React, { useState, useEffect } from 'react';
import './AboutCarousel.css';

const slides = [
  {
    title: 'Наш стиль',
    text: `Пориньте в атмосферу справжньої опери: позолочені балкони, оксамитові крісла та
           вишукані різьблені деталі інтер’єру. Cinema Vintage відтворює аромат автентичного
           театру – щоби кожен ваш візит став урочистою подією.`,
    img: '/images/opera-interior.jpg',
  },
  {
    title: 'Легендарне кіно',
    text: `Ми відібрали шедеври світового кінематографа — від золотого віку Голлівуду до сучасних
           культових стрічок. Кожен сеанс супроводжується аналітикою від провідних кінокритиків,
           щоб ви побачили не просто фільм, а історію мистецтва в кадрі.`,
    img: '/images/classics-collage.jpg',
  },
  {
    title: 'Лондонська локація',
    text: `Розташовані в самому серці Лондона, за крок від легендарного Covent Garden.
           Унікальні краєвиди, вишукані кав’ярні та вулиці театрального кварталу — все це
           відтіняє вашу кіноподорож у Cinema Vintage.`,
    img: '/images/london-covent-garden.jpg',
  },
];

export default function AboutCarousel() {
  const [idx, setIdx] = useState(0);

  // щоби автоматично змінювати слайд кожні 6 секунд
  useEffect(() => {
    const timer = setTimeout(() => setIdx((idx + 1) % slides.length), 6000);
    return () => clearTimeout(timer);
  }, [idx]);

  const { title, text, img } = slides[idx];

  const prev = () => setIdx((idx - 1 + slides.length) % slides.length);
  const next = () => setIdx((idx + 1) % slides.length);

  return (
    <div className="about-carousel">
      <button className="carousel-btn prev" onClick={prev}>‹</button>
      <div
        key={idx}
        className="carousel-slide"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="carousel-overlay">
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </div>
      <button className="carousel-btn next" onClick={next}>›</button>
    </div>
  );
}