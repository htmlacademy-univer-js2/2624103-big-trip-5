export const DESTINATIONS = [
  {
    id: 'ams',
    name: 'Amsterdam',
    description: 'Столица Нидерландов с каналами, велосипедами и музеями Ван Гога.',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=21',
        description: 'Амстердам с высоты птичьего полёта'
      }
    ]
  },
  {
    id: 'gva',
    name: 'Geneva',
    description: 'Жемчужина Швейцарии на берегу Женевского озера.',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=22',
        description: 'Фонтан Же-д’О в Женеве'
      }
    ]
  },
  {
    id: 'chx',
    name: 'Chamonix',
    description: 'Горнолыжный курорт у подножия Монблана.',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=23',
        description: 'Вид на Монблан из Шамони'
      }
    ]
  }
];
export const generateDestinations = () => {
  const cities = ['Amsterdam', 'Geneva', 'Chamonix', 'Berlin', 'Rome', 'Paris'];
  return cities.map((city, index) => ({
    id: index + 1,
    name: city,
    description: `${city} — прекрасный город для путешествий. Подробное описание...`,
    pictures: Array.from({ length: 3 }, (_, i) => ({
      src: `https://loremflickr.com/248/152/${city.toLowerCase()}?random=${i}`,
      description: `Фото ${city} ${i + 1}`
    }))
  }));
};