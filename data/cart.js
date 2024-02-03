export let cart = getFromStorage() || [
  {productId:
    "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", quantity: 2,
  deliveryOptionId: '1'
  }, 
  {productId: 
    "15b6fc6f-327a-4ec4-896f-486349e85a3d",
quantity
: 1, deliveryOptionId: '2'}];


function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function getFromStorage() {
  return JSON.parse(localStorage.getItem('cart'));
}
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
        quantity: 1,
        deliveryOptionId: '1'
      });
    }

    saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach(item => {
    if (item.productId !== productId) {
      newCart.push(item);
    }
  })
  cart = newCart;
  saveToStorage();
}
