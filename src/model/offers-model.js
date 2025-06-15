export default class OffersModel {
  constructor() {
    this._offers = [];
  }

  getOffers() {
    return this._offers;
  }

  getOffersByType(type) {
    const offerGroup = this._offers.find((offer) => offer.type === type);
    return offerGroup ? offerGroup.offers : [];
  }

  setOffers(offers) {
    this._offers = offers;
  }
}
