import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [
  {
    id: '1',
    deliveryDates: 7,
    priceCents: 0
  },
  {
    id: '2',
    deliveryDates: 3,
    priceCents: 499
  },
  {
    id: '3',
    deliveryDates: 1,
    priceCents: 999
  },

];

export function getDeliveryOption(deliveryOptionId) {
  let matchingOption;
  deliveryOptions.forEach(option => {
    if (option.id === deliveryOptionId) {
      matchingOption = option;
    }
  })
  return matchingOption;

}

export function calculateDeliveryDate(deliveryOption) {
  let daysToAdd = deliveryOption.deliveryDates;
  let deliveryDate = dayjs();;
  while(daysToAdd > 0) {
    deliveryDate = deliveryDate.add(1, 'days');
    if (isSatSun(deliveryDate)) {
      continue;
    }
    daysToAdd--;
  }
  return deliveryDate.format('dddd, MMMM D');
}

function isSatSun(dateObj) {
  const dateOfWeek = dateObj.format('dddd');
  return dateOfWeek === 'Saturday' || dateOfWeek === 'Sunday';
}