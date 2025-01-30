import { inject } from '@vercel/analytics';

// Import images
import check from './assets/check.svg';
import star from './assets/star.svg';
import sushi12 from './assets/sushi-12.png';
import sushi11 from './assets/sushi-11.png';
import sushi10 from './assets/sushi-10.png';

inject();

const trendingSushis = [
    'Make Sushi',
    'Nigiri Sushi',
    'Oshizushi',
    'Temaki Sushi',
    'Uramaki Sushi',
    'Inari Sushi'
];

const trendingDrinks = [
    "Oruncha",
    "Ofukucha",
    "Sakura Tea",
    "Kombu-cha",
    "Aojiru",
    "Mugicha",
];

const cards = [
    {
        imgSrc: sushi12,
        alt: "sushi-12",
        title: "Chezu Sushi",
        rating: "4.8",
        price: "$21.00"
    },
    {
        imgSrc: sushi11,
        alt: "sushi-11",
        title: "Originale Sushi",
        rating: "4.8",
        price: "$21.00",
        active: true
    },
    {
        imgSrc: sushi10,
        alt: "sushi-10",
        title: "Ramen Legendo",
        rating: "4.8",
        price: "$21.00"
    }
];

function renderSushiCards() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <h1>Trending Sushis</h1>
        <ul>
            ${trendingSushis.map(sushi => `<li>${sushi}</li>`).join('')}
        </ul>
        
        <h1>Trending Drinks</h1>
        <ul>
            ${trendingDrinks.map(drink => `<li>${drink}</li>`).join('')}
        </ul>

        <h1>Popular Items</h1>
        <div class="card-container">
            ${cards.map(card => `
                <div class="card">
                    <img src="${card.imgSrc}" alt="${card.alt}">
                    <h2>${card.title}</h2>
                    <p>⭐ ${card.rating} - ${card.price}</p>
                    <button class="order-btn" data-name="${card.title}">Order Now</button>
                </div>
            `).join('')}
        </div>
    `;

    document.querySelectorAll('.order-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const sushiName = event.target.getAttribute('data-name');
            trackOrder(sushiName);
        });
    });
}

function trackOrder(sushiName) {
    import('@vercel/analytics').then(({ track }) => {
        track('order_clicked', { item: sushiName });
        alert(`Order placed for: ${sushiName}`);
    });
}

renderSushiCards();
