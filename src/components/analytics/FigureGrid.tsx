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

    // Generate a range of dates between two dates
    const generateDateRange = (startDate: Date, endDate: Date): Date[] => {
        const dateArray = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            dateArray.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dateArray;
    };

    // Calculate cumulative contribution amount and ensure every date is included
    const calculateCumulativeData = (data: Contribution[]) => {
        if (data.length === 0) {
            return [];
        }

        const sortedData = data
            .filter(contribution => contribution && contribution.contributiondate)
            .sort((a, b) => new Date(a.contributiondate).getTime() - new Date(b.contributiondate).getTime());

        if (sortedData.length === 0) {
            return [];
        }

        const startDate = new Date(sortedData[0].contributiondate);
        const endDate = new Date();
        const dateRange = generateDateRange(startDate, endDate);

        let cumulativeAmount = 0;
        let contributionIndex = 0;

        return dateRange.map(date => {
            if (contributionIndex < sortedData.length && new Date(sortedData[contributionIndex].contributiondate).toDateString() === date.toDateString()) {
                cumulativeAmount += Number(sortedData[contributionIndex].contributionamount);
                contributionIndex++;
            }
            return {
                date: date.toLocaleDateString(), // Format the date as a string
                contributionamount: cumulativeAmount
            };
        });
    };

    const formattedData = calculateCumulativeData(contributions);

    // Generate tick values based on the desired interval (e.g., every 7 days)
    const generateTickValues = (data: { date: string }[], interval: number): string[] => {
        const tickValues = [];
        for (let i = 0; i < data.length; i += interval) {
            tickValues.push(data[i].date);
        }
        return tickValues;
    };

    const tickValues = generateTickValues(formattedData, 7); // Change 7 to your desired interval


    // Aggregate contributions by month and contributor
    const aggregateContributions = (data: Contribution[]) => {
        const contributionsByMonth: { [key: string]: { [key: string]: number } } = {};

        data.forEach(contribution => {
            const date = new Date(contribution.contributiondate);
            const month = date.toLocaleString('default', { month: 'long', year: 'numeric' });

            if (!contributionsByMonth[month]) {
                contributionsByMonth[month] = {};
            }

            if (!contributionsByMonth[month][contribution.contributor]) {
                contributionsByMonth[month][contribution.contributor] = 0;
            }

            contributionsByMonth[month][contribution.contributor] += Number(contribution.contributionamount);
        });

        return contributionsByMonth;
    };

    const aggregatedData = aggregateContributions(contributions);

    // Format data for BarChart
    const formattedBarData = Object.keys(aggregatedData).map(month => {
        return {
            month,
            ...aggregatedData[month]
        };
    }).sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

    // Extract unique contributors for series definition
    const uniqueContributors = Array.from(new Set(contributions.map(contribution => contribution.contributor)));

    // Define colors for each contributor
    const contributorColors = (contributor: string): string => {
        switch (contributor) {
            case 'Sondre':
                return '#87a179';  
            case 'MK':
                return '#b5677b';
            case 'Joint':
            default:
                return '#485160'; 
        }
    };

    return (
        <Card withBorder shadow='sm'>
            {/* <h2 style={{ margin: 0, marginBottom: 20, padding: 0 }}>Figures</h2> */}

            <h3>Savings Growth</h3>

            {/* Area chart to show savings growth over time */}
            <AreaChart
                h={300}
                data={formattedData}
                dataKey="date"
                series={[
                    { name: 'contributionamount', color: '#946e96' }
                ]}
                curveType="stepAfter"
                connectNulls
                xAxisProps={{
                    tickFormatter: (date: string) => date, // Date is already formatted as string
                    ticks: tickValues
                }}
                withDots={false}
            />

            <h3>Contribution Total by Month</h3>
            {/* Stacked bar chart for contribution amount by month and broken down by contributor */}
            <BarChart
                h={400}
                data={formattedBarData}
                dataKey="month"
                type="stacked"
                series={uniqueContributors.map(contributor => ({
                    name: contributor,
                    dataKey: contributor,
                    color: contributorColors(contributor)
                }))}
            />
        </Card>
    );
}
