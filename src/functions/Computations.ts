import axios from "axios";
import { useEffect, useState } from "react";
import { Contribution } from "types/Contribution";
import { Debt } from "types/Debt";


// Get all savings contributions
function ContributionsGetter() {
    const [contributions, setContributions] = useState<Contribution[]>([]);

    useEffect(() => {
        fetchContributions();
    }, []);

    const fetchContributions = () => {
        console.log("Getting contributions");
        axios.get<Contribution[]>('http://localhost:5000/contributions')
            .then(response => {
                setContributions(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the contributions.', error);
            });
    };

    return contributions;
}


// Add up all the savings for a specific goal
export function GoalSavingsTotal(goal: string) {

    const filteredContributions = ContributionsGetter().filter(contribution => contribution.contributiongoal === goal);


    let total = 0;



    filteredContributions.map((contribution) =>
        total += Number(contribution.contributionamount)
    )

    console.log('Total saved for ' + goal + ' is: ' + total);
    return total;

}

// Add up all the savings for a specific contributor
export function ContributorSavingsTotal(contributor: string) {

    const filteredContributions = ContributionsGetter().filter(contribution => contribution.contributor === contributor);


    let total = 0;



    filteredContributions.map((contribution) =>
        total += Number(contribution.contributionamount)
    )

    console.log('Total saved by ' + contributor + ' is: ' + total);
    return total;

}

// Add up all the savings for a specific contributor
export function ContributorSavingsCount(contributor: string) {

    const filteredContributions = ContributionsGetter().filter(contribution => contribution.contributor === contributor);

    return filteredContributions.length;

}


// Add up the total savings
export function SavingsTotal() {

    let total = 0;

    ContributionsGetter().map((contribution) =>
        total += Number(contribution.contributionamount)
    )

    return total;

}

// Add up the total amount of debt
export function DebtTotal() {

    const [debts, setDebts] = useState<Debt[]>([]);

    useEffect(() => {
        fetchDebts();
    }, []);

    const fetchDebts = () => {
        console.log("Getting debts");
        axios.get<Debt[]>('http://localhost:5000/debts')
            .then(response => {
                setDebts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the contributions.', error);
            });
    };

    let total = 0;

    debts.map((debt) =>
        total += Number(debt.debtamount)
    )

    return total;

}