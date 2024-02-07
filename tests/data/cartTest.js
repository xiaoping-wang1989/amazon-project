import { addToCart, cart, getFromStorage } from "../../data/cart.js";

describe('test suite: addToCart', () => {
  it ('adds an existing product to the cart', () => {
    const existingProductId = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([{
      productId: existingProductId ,
      quantity: 2,
      deliveryOptionId: '1'
    }]));

    spyOn(localStorage, 'setItem').and.callFake(() => {
      return;
    });

    getFromStorage();

    addToCart(existingProductId, 2);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(existingProductId);
    expect(cart[0].quantity).toEqual(4);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'setItem').and.callFake(() => {
      return;
    });

    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([]));

    getFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 2);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  })
});