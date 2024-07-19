import { Card } from "@mantine/core";
import { AreaChart, BarChart } from '@mantine/charts';
import { useEffect, useState } from "react";
import { Contribution } from "../../types/Contribution";
import axios from "axios";

export default function FigureGrid() {

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

    // Calculate cumulative contribution amount
    const calculateCumulativeData = (data: Contribution[]) => {
        let cumulativeAmount = 0;
        return data.map(contribution => {
            cumulativeAmount += Number(contribution.contributionamount);
            return {
                date: contribution.contributiondate,
                contributionamount: cumulativeAmount
            };
        });
    };

    // Ensure data is sorted by date before calculating cumulative sum
    const sortedContributions = [...contributions].sort((a, b) => new Date(a.contributiondate).getTime() - new Date(b.contributiondate).getTime());
    const formattedData = calculateCumulativeData(sortedContributions);


    const data = [
        { month: 'January', Smartphones: 1200, Laptops: 900, Tablets: 200 }]

    return (
        <Card withBorder shadow='sm'>
            <h2 style={{ margin: 0, marginBottom: 20, padding: 0 }}>Figures</h2>


            <h3>Savings Growth</h3>

            {/* Area chart to show savings growth over time */}
            <AreaChart
                h={300}
                data={formattedData}
                dataKey="date"
                series={[
                    { name: 'contributionamount', color: '#946e96' }
                ]}
                curveType="linear"
            />

            <h3>Savings Contributions per Month</h3>
            {/* Stacked bar chart for contribution amount by month and broken down by contributor */}
            <BarChart
                h={300}
                data={data}
                dataKey="month"
                type="stacked"
                series={[
                    { name: 'Smartphones', color: 'violet.6' },
                    { name: 'Laptops', color: 'blue.6' },
                    { name: 'Tablets', color: 'teal.6' },
                ]}
            />

        </Card>
    );
}
