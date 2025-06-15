export const DESTINATIONS = [
  {
    id: 'ams',
    name: 'Amsterdam',
    description: 'Столица Нидерландов с живописными каналами, сотнями велосипедов и богатой культурной жизнью. Обязательно посетите музей Ван Гога и квартал Йордан.',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152/amsterdam,canal?random=1',
        description: 'Каналы Амстердама в солнечный день'
      },
      {
        src: 'https://loremflickr.com/248/152/amsterdam,bikes?random=2',
        description: 'Велосипеды - главный транспорт Амстердама'
      }
    ]
  },
  {
    id: 'gva',
    name: 'Geneva',
    description: 'Элегантный швейцарский город на берегу Женевского озера, известный своими банками, шоколадом и знаменитым фонтаном Же-д’О.',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152/geneva,lake?random=3',
        description: 'Женевское озеро с видом на Альпы'
      },
      {
        src: 'https://loremflickr.com/248/152/geneva,fountain?random=4',
        description: 'Знаменитый фонтан Же-д’О'
      }
    ]
  },
  {
    id: 'chx',
    name: 'Chamonix',
    description: 'Легендарный горнолыжный курорт у подножия Монблана - самой высокой вершины Альп. Идеальное место для любителей активного отдыха.',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152/chamonix,mountain?random=5',
        description: 'Вид на заснеженные вершины Монблана'
      },
      {
        src: 'https://loremflickr.com/248/152/chamonix,ski?random=6',
        description: 'Горнолыжные трассы Шамони'
      }
    ]
  },
  {
    id: 'ber',
    name: 'Berlin',
    description: 'Столица Германии, где современность встречается с историей. От Бранденбургских ворот до стрит-арта в районе Кройцберг.',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152/berlin,wall?random=7',
        description: 'Остатки Берлинской стены'
      },
      {
        src: 'https://loremflickr.com/248/152/berlin,brandenburg?random=8',
        description: 'Бранденбургские ворота ночью'
      }
    ]
  },
  {
    id: 'rom',
    name: 'Rome',
    description: 'Вечный город с богатой историей, где на каждом шагу встречаются древние руины, барочные фонтаны и вкуснейшая итальянская кухня.',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152/rome,colosseum?random=9',
        description: 'Колизей - символ Рима'
      },
      {
        src: 'https://loremflickr.com/248/152/rome,pasta?random=10',
        description: 'Традиционная римская паста'
      }
    ]
  },
  {
    id: 'par',
    name: 'Paris',
    description: 'Город любви и света, известный Эйфелевой башней, Лувром и уютными кафе на Монмартре. Не забудьте попробовать круассаны!',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152/paris,eiffel?random=11',
        description: 'Эйфелева башня в лучах заката'
      },
      {
        src: 'https://loremflickr.com/248/152/paris,croissant?random=12',
        description: 'Свежие круассаны в парижской пекарне'
      }
    ]
  }
];

export const generateDestinations = () => {
  const cities = [
    {
      name: 'Amsterdam',
      keywords: ['canal', 'bikes', 'museum']
    },
    {
      name: 'Geneva',
      keywords: ['lake', 'fountain', 'chocolate']
    },
    {
      name: 'Chamonix',
      keywords: ['mountain', 'ski', 'alps']
    },
    {
      name: 'Berlin',
      keywords: ['wall', 'brandenburg', 'modern']
    },
    {
      name: 'Rome',
      keywords: ['colosseum', 'pasta', 'history']
    },
    {
      name: 'Paris',
      keywords: ['eiffel', 'croissant', 'louvre']
    }
  ];

  return cities.map((city, index) => ({
    id: `city-${index + 1}`,
    name: city.name,
    description: getCityDescription(city.name),
    pictures: Array.from({ length: 3 }, (_, i) => ({
      src: `https://loremflickr.com/248/152/${city.name.toLowerCase()},${city.keywords[i]}?random=${index}${i}`,
      description: getPhotoDescription(city.name, city.keywords[i])
    }))
  }));
};

function getCityDescription(cityName) {
  const descriptions = {
    'Amsterdam': 'Город каналов и свободы, где каждый найдет что-то по душе - от музеев до ночных клубов.',
    'Geneva': 'Строгая элегантность Швейцарии в сочетании с живописными видами на озеро и горы.',
    'Chamonix': 'Рай для альпинистов и лыжников с потрясающими горными пейзажами.',
    'Berlin': 'Контрастный город, где бурная ночная жизнь соседствует с памятниками истории.',
    'Rome': 'Каждый камень здесь дышит историей, а воздух пропитан ароматом свежей пасты.',
    'Paris': 'Романтичная столица Франции, где искусство встречается с гастрономией.'
  };
  return descriptions[cityName] || `${cityName} — прекрасный город для путешествий.`;
}

function getPhotoDescription(cityName, keyword) {
  const keywords = {
    'canal': 'Живописный канал в центре города',
    'bikes': 'Типичная улица с велосипедами',
    'museum': 'Один из знаменитых музеев',
    'lake': 'Вид на озеро с набережной',
    'fountain': 'Знаменитый городской фонтан',
    'chocolate': 'Местные шоколадные деликатесы',
    'mountain': 'Величественные горные вершины',
    'ski': 'Горнолыжные трассы курорта',
    'alps': 'Панорама Альпийских гор',
    'wall': 'Исторический памятник архитектуры',
    'brandenburg': 'Символ города - Бранденбургские ворота',
    'modern': 'Современный архитектурный ансамбль',
    'colosseum': 'Древний амфитеатр - свидетель истории',
    'pasta': 'Традиционное итальянское блюдо',
    'history': 'Улицы, хранящие многовековую историю',
    'eiffel': 'Главная достопримечательность города',
    'croissant': 'Свежая выпечка в местной булочной',
    'louvre': 'Знаменитый музей искусств'
  };
  return `${cityName}: ${keywords[keyword] || 'Красивый вид города'}`;
}
