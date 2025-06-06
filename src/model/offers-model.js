export default class OffersModel {
  constructor() {
    this._offers = [
      {
        type: 'taxi',
        offers: [
          { id: 1, title: 'Повысить класс', price: 20 },
          { id: 2, title: 'Детское кресло', price: 10 }
        ]
      }
    ];
  }

  getOffers() {
    return this._offers;
  }
}