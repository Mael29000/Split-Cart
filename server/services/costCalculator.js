async function calculateCosts(shoppingLists) {
    let totalCost = 0;
    let contributions = new Map();

    
    shoppingLists.forEach((list) => {
        if (list.units.some(unit => unit.status === "remaining")) {
            return; 
        }
        //console.log(list.price)
        totalCost += list.price;
        const unitCount = list.units.length;

        list.units.forEach((unit) => {
            if (!unit.user) return; 

            contributions.set(
                unit.user, 
                (contributions.get(unit.user) || 0) + list.price / unitCount
            );
        });
    });

    //console.log(contributions);
    //console.log(totalCost);

    if (contributions.size === 0) {
        return { balances: [] }; 
    }

    const averageContribution = totalCost / contributions.size;
    //console.log(averageContribution);

    
    let balances = Array.from(contributions, ([user, userContribution]) => ({
        user,
        total: userContribution - averageContribution
    }));
    //console.log(balances)
    return { balances };
}

module.exports = calculateCosts;