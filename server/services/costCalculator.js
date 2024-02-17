async function calculateCosts(shoppingList) {
  let balances = {};

  shoppingList.forEach((item) => {
    const amountPerPerson = item.price / (item.sharedWith.length + 1);

    item.sharedWith.forEach((participant) => {
      if (!balances[participant]) balances[participant] = 0;

      if (participant !== item.buyer) balances[participant] -= amountPerPerson;
    });

    balances[item.buyer] = (balances[item.buyer] || 0) + item.price;
  });

  return balances;
}

module.exports = calculateCosts;
