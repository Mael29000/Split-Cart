async function calculateCosts(shoppingLists) {
  let totalCost = 0;
  let contributions = {};
  let participantCount = 0;

  shoppingLists.forEach((list) => {
    totalCost += list.price;

    list.units.forEach((unit) => {
      contributions[unit.user] = contributions[unit.user] || 0;
      contributions[unit.user] += list.price / list.units.length;
      participantCount = Math.max(participantCount, list.units.length);
    });
  });

  const averageContribution = totalCost / participantCount;

  let balances = {};
  for (const user in contributions) {
    balances[user] = contributions[user] - averageContribution;
  }

  return {
    totalCost,
    individualContributions: contributions,
    averageContribution,
    balances,
  };
}

module.exports = calculateCosts;
