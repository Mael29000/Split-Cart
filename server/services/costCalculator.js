async function calculateCosts(shoppingLists) {
  let totalCost = 0;
  let contributions = {};

  const filteredShoppingLists = shoppingLists.filter(list => 
      list.units.every(unit => unit.status !== "remaining")
  );

  filteredShoppingLists.forEach((list) => {
      totalCost += list.price;
      list.units.forEach((unit) => {
          contributions[unit.user] = contributions[unit.user] || 0;
          contributions[unit.user] += list.price / list.units.length;
      });
  });

  const participantCount = Object.keys(contributions).length;
  const averageContribution = totalCost / participantCount;

  let balances = Object.entries(contributions).map(([user, contribution]) => {
      return {
          user: user,
          total: contribution - averageContribution
      };
  });

  return { balances };
}

module.exports = calculateCosts;
