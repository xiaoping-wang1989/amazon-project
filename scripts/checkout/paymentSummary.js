import { cart } from '../../data/cart.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { findProductByProductId } from '../../data/products.js';
import formatCurrency from '../utils/money.js';

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  let totalQuantity = 0;
  cart.forEach(cartItem => {
    totalQuantity += cartItem.quantity;
    const product = findProductByProductId(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  })

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 10 /100;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
      <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${totalQuantity}):</div>
        <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>`;
  
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}