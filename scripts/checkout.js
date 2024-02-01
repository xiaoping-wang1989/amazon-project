import {calculateCartQuantity, cart, removeFromCart, updateQuantity} from '../data/cart.js';
import { findProductByProductId } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

updateCartQuantity();

let cartSummaryHTML = '';
cart.forEach((cartItem) => {

  const productId = cartItem.productId;


  const matchingProduct = findProductByProductId(productId);

  cartSummaryHTML += `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
  <div class="delivery-date">
    Delivery date: Tuesday, June 21
  </div>

  <div class="cart-item-details-grid">
    <img class="product-image"
      src="${matchingProduct.image}">

    <div class="cart-item-details">
      <div class="product-name">
        ${matchingProduct.name}
      </div>
      <div class="product-price">
        $${formatCurrency(matchingProduct.priceCents)}
      </div>
      <div class="product-quantity">
        <span>
          Quantity: <span class="js-quantity-label-${matchingProduct.id}" quantity-label">${cartItem.quantity}</span>
        </span>
        <span class="js-update-link update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
          Update
        </span>
        <input class="js-quantity-input-${matchingProduct.id} quantity-input">
        <span class="js-save-quantity-link save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
        <span data-product-id="${matchingProduct.id}" class="js-delete-link delete-quantity-link link-primary">
          Delete
        </span>
      </div>
    </div>

    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
      <div class="delivery-option">
        <input type="radio" checked
          class="delivery-option-input"
          name="delivery-option-${productId}">
        <div>
          <div class="delivery-option-date">
            Tuesday, June 21
          </div>
          <div class="delivery-option-price">
            FREE Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${productId}">
        <div>
          <div class="delivery-option-date">
            Wednesday, June 15
          </div>
          <div class="delivery-option-price">
            $4.99 - Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${productId}">
        <div>
          <div class="delivery-option-date">
            Monday, June 13
          </div>
          <div class="delivery-option-price">
            $9.99 - Shipping
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach(link => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    updateCartQuantity();
    const itemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
    itemContainer.remove();
  })
})

document.querySelectorAll('.js-update-link').forEach(link => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    const itemContainer = document.querySelector(`.js-cart-item-container-${productId}`);

    itemContainer.classList.add("is-editing-quantity");
  });
})

document.querySelectorAll('.js-save-quantity-link').forEach(link => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const itemContainer = document.querySelector(`.js-cart-item-container-${productId}`);

    itemContainer.classList.remove('is-editing-quantity');

    const inputValue = Number.parseInt(document.querySelector(`.js-quantity-input-${productId}`).value);

    if (!(inputValue >= 0 && inputValue < 1000)) {
      alert('Quantity must be at least 0 and less than 1000');
      return;
    }

    updateQuantity(productId, inputValue);
    updateCartQuantity();
    if (inputValue === 0) {
      itemContainer.remove();
    } else {
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML = inputValue;
    }
  })
})

function updateCartQuantity() {
  document.querySelector('.js-return-to-home-link').innerHTML = `${calculateCartQuantity()} items`;
}

