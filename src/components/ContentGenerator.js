//функции для генерации контента
const randomRange = (min, max) => (min + Math.random() * (max - min));
const randomRangeRound = (min, max) => Math.round(randomRange(max, min));
//возвращает набор букв длиной от min до max
const gName = (min, max) => new Array(randomRangeRound(min, max)).fill(0).map(() => (String.fromCharCode(randomRangeRound(65, 90)))).join('');
//возвращает год от min до max
const gYear = (min, max) => (randomRangeRound(min, max));
//возвращает вес от min до max НЕ ОКРУГЛЕННЫЙ
const gWeight = (min, max) => (randomRange(min, max));
//возвращает булевое значение 
const gStock = (min, max) => (randomRangeRound(min, max) > 0 ? true : false);
//генерирует случайную ссылку из набора букв длиной от min до max
const gLink = (min, max) => `http://some_link/${gName(min, max)}.com`;
//генерирует рейтинг от min до max
const gRating = (min, max) => (randomRangeRound(min, max));

//возвращает массив объектов JSON формата, это заглушка эмуляции получения данных с сервера
const contentGenerator = (elementsCount = 30) => new Array(elementsCount).fill(0).map(() => {
  return {
    brand: gName(3, 8),
    year: gYear(1930, 1990),
    weight: gWeight(1, 5),
    stock: gStock(0, 1),
    link: gLink(3, 9),
    rating: gRating(-25, +25)
  }
});

export default contentGenerator;