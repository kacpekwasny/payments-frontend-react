export function P2HUserPayment(userPayment) {
  const uPay = userPayment;
  delete uPay.data.waiting;
  delete uPay.data.accepted;
  return uPay;
}

export function P2HEventPayment(eventPayment) {
  const ePay = eventPayment;
  delete ePay.data.waiting;
  delete ePay.data.accepted;
  return ePay;
}
