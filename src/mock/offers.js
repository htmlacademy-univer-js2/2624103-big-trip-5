export const OFFERS = [
  {
    type: 'taxi',
    offers: [
      { id: 1, title: 'Повысить класс', price: 20 },
      { id: 2, title: 'Детское кресло', price: 10 }
    ]
  },
  {
    type: 'flight',
    offers: [
      { id: 1, title: 'Бизнес-класс', price: 150 },
      { id: 2, title: 'Доп. багаж', price: 50 }
    ]
  },
  {
    type: 'drive',
    offers: [
      { id: 1, title: 'Завтрак', price: 15 },
      { id: 2, title: 'Улучшенный номер', price: 80 }
    ]
  }
];
export const generateOffers = () => {
  const offerTypes = {
    taxi: ['Повысить класс', 'Детское кресло'],
    bus: ['Кондиционер', 'Wi-Fi'],
    train: ['Купе', 'Обед'],
    ship: ['Каюта', 'Экскурсия'],
    drive: ['Полный бак', 'Страховка'],
    flight: ['Бизнес-класс', 'Доп. багаж'],
    'check-in': ['Завтрак', 'Улучшенный номер'],
    sightseeing: ['Гид', 'Фотосессия'],
    restaurant: ['Дегустация', 'Вино']
  };

  return Object.entries(offerTypes).map(([type, titles]) => ({
    type,
    offers: titles.map((title, id) => ({
      id: id + 1,
      title,
      price: Math.floor(Math.random() * 100) + 10 // Цена от 10 до 110
    }))
  }));
};