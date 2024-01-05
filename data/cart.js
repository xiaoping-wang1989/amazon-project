export const cart = [];

export function addToCart(productId, _quantity = 1) {
  let matchingItem;

    cart.forEach(cartItem => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    })

    if (matchingItem) {
      matchingItem.quantity++;
    } else {
      cart.push({
        productId,
        quantity: 1
      });
    }
}
