// default export
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

// named export
import {cart, removeFromCart, updateDeliveryOption} from '../data/cart.js';
import { findProductByProductId } from '../data/products.js';
import formatCurrency from './utils/money.js';
import deliveryOptions from '../data/deliveryOptions.js';


// const today = dayjs();

// const deliveryDate = today.add(7, 'days');

// deliveryDate.format('dddd MMMMD');

// console.log(deliveryDate.format('dddd, MMMM D'));

let cartSummaryHTML = '';
cart.forEach((cartItem) => {

  const productId = cartItem.productId;


  const matchingProduct = findProductByProductId(productId);

  cartSummaryHTML += `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
  <div class="js-delivery-date-${matchingProduct.id} delivery-date">
    Delivery date: ${getChoosenDeliveryDateString(cartItem.deliveryOptionId)}
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
          Quantity: <span class="quantity-label">${cartItem.quantity}</span>
        </span>
        <span class="js-update-link update-quantity-link link-primary">
          Update
        </span>
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

function getChoosenDeliveryDateString(deliveryOptionId) {
  let choosenDeliveryOption;

  deliveryOptions.forEach(option => {
    if (option.id === deliveryOptionId) {
      choosenDeliveryOption = option;
    }
  })

  const today = dayjs();
  const choosenDeliveryDate = today.add(choosenDeliveryOption.deliveryDates, 'days');
  const choosenDeliveryDateString = choosenDeliveryDate.format('dddd, MMMM D');
  return choosenDeliveryDateString;
}

function generateDeliveryOptionsHTML(matchingProduct, cartItem) {
  let optionsHTML = '';
  const deliveryOptionId = cartItem.deliveryOptionId;

  deliveryOptions.forEach(option => {
    const today = dayjs();
    const deliveryDate = today.add(option.deliveryDates, 'days')
    const dateString = deliveryDate.format('dddd, MMMM D');
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

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach(link => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    const itemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
    console.log(itemContainer);
    itemContainer.remove();
  })
})

document.querySelectorAll('.js-delivery-option').forEach(option => {
  option.addEventListener('click', () => {
    const {productId, deliveryOptionId} = option.dataset;
    
    updateDeliveryOption(productId, deliveryOptionId);

    document.querySelector(`.js-delivery-date-${productId}`).innerHTML = `Delivery date: ${getChoosenDeliveryDateString(deliveryOptionId)}`;
  })
})

