import axios from "axios";
import { useEffect, useState } from "react";
import { Contribution } from "types/Contribution";
import { Debt } from "types/Debt";

function contributionsGetter() {
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

export function SavingsTotal() {
    
    let total = 0;

    contributionsGetter().map((contribution) =>
        total += Number(contribution.contributionamount)
    )

    return total;

}


export function GoalSavingsTotal(goal: string) {

    const filteredContributions = contributionsGetter().filter(contribution => contribution.contributiongoal === goal);

    
    let total = 0;



    filteredContributions.map((contribution) =>
        total += Number(contribution.contributionamount)
    )

    console.log('Total saved for ' + goal + ' is: ' + total);
    return total;

}

export function DebtTotal() {

    const [debts, setDebts] = useState<Debt[]>([]);

    useEffect(() => {
        fetchContributions();
    }, []);

    const fetchContributions = () => {
        console.log("Getting contributions");
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