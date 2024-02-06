// default export
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

// named export
import {cart, removeFromCart, updateDeliveryOption, updateQuantity} from '../../data/cart.js';
import { findProductByProductId } from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

export function renderOrderSummary() {
  let cartSummaryHTML = '';
  cart.forEach((cartItem) => {

  const productId = cartItem.productId;

  const matchingProduct = findProductByProductId(productId);

  cartSummaryHTML += `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="js-delivery-date-${matchingProduct.id} delivery-date">
      Delivery date: ${calculateDeliveryDate(getDeliveryOption(cartItem.deliveryOptionId))}
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
        ${generateDeliveryOptionsHTML(matchingProduct, cartItem)}
      </div>
    </div>
  </div>`;
  });

  document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach(link => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    })
  })
  
  document.querySelectorAll('.js-delivery-option').forEach(option => {
    option.addEventListener('click', () => {
      const {productId, deliveryOptionId} = option.dataset;
      
      updateDeliveryOption(productId, deliveryOptionId);
  
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
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

      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    })
  })
}

function generateDeliveryOptionsHTML(matchingProduct, cartItem) {
  let optionsHTML = '';
  const deliveryOptionId = cartItem.deliveryOptionId;

  deliveryOptions.forEach(option => {
    const dateString = calculateDeliveryDate(option);
    const priceString = option.priceCents === 0 ? 'FREE' : `$${formatCurrency(option.priceCents)} -`;

    const isChecked = option.id === cartItem.deliveryOptionId;

    optionsHTML += `      <div class="js-delivery-option delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${option.id}">
    <input type="radio"
      ${isChecked ? 'checked' : ''}
      class="delivery-option-input"
      name="delivery-option-${matchingProduct.id}">
    <div>
      <div class="delivery-option-date">
        ${dateString}
      </div>
      <div class="delivery-option-price">
        ${priceString} Shipping
      </div>
    </div>
  </div>`
  });

  return optionsHTML;
}



