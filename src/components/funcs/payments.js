export default function paymentFT(pft) {
  // pft = payment_from_to
  const acc = [];
  const unacc = [];

  switch (pft.from_accepted) {
    case true:
      acc.push(pft.from_username); break;
    default:
      unacc.push(pft.from_username);
  }
  switch (pft.to_accepted) {
    case true:
      acc.push(pft.to_accepted); break;
    default:
      unacc.push(pft.to_accepted);
  }
  return {
    type: 'UserPayment',
    data: {
      from: pft.from_username,
      to: pft.to_username,
      ammount: pft.value,
      title: pft.title,
      date: pft.created,
      id: pft.id,
      accepted: acc,
      waiting: unacc,
    },
  };
}
