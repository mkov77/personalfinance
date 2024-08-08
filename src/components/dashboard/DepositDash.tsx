import { Card, Text, Group, Flex, CardSection, NumberFormatter } from '@mantine/core';
import { IconCalendar, IconTargetArrow, IconBucket, IconUser } from '@tabler/icons-react';
import classes from './DepositDash.module.css';
import { Contribution } from "types/Contribution";
import axios from 'axios';
import { useEffect, useState } from 'react';

const lastDepositAmount = 1000;

const mockdata = [
    { label: 'who', value: "Sondre", icon: IconUser },
    { label: 'where', value: "Travel Fund", icon: IconTargetArrow },
    { label: 'why', value: "Paycheck", icon: IconBucket },
    { label: 'when', value: "July 20", icon: IconCalendar },
];

export default function DepositDash() {
    const [latestContribution, setLatestContribution] = useState<Contribution | null>(null);

    useEffect(() => {
        fetchContribution();
    }, []);
    

    const fetchContribution = async () => {
        try {
            const response = await axios.get<Contribution>('http://localhost:5000/latest-contribution');
            setLatestContribution(response.data);
        } catch (error) {
            console.error('Error fetching latest contribution:', error);
        }
    };

    if (!latestContribution) {
        return <Text>Loading...</Text>; // Display a loading state while data is being fetched
    }


    const features = [
        { label: 'who', value: latestContribution.contributor, icon: IconUser },
        { label: 'where', value: latestContribution.contributiongoal, icon: IconTargetArrow },
        { label: 'why', value: latestContribution.contributionsource, icon: IconBucket },
        { label: 'when', value: new Date(latestContribution.contributiondate).toLocaleDateString(), icon: IconCalendar },
    ].map((feature) => (
        <Flex key={feature.label} align="center">
            <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
            <Text size="xs" ml="xs">{feature.value}</Text>
        </Flex>
    ));

    return (
        <Card withBorder radius="md" shadow='sm' className={classes.card} style={{ height: '250px' }}>
            <CardSection className={classes.section}>
                <Group justify="space-between" mt="sm" m={0}>
                    <div>
                        <Text fw={500}>Last Contribution</Text>
                        <Text m={0} style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                            <NumberFormatter decimalScale={2} prefix="$" value={latestContribution.contributionamount} thousandSeparator />
                        </Text>
                    </div>
                </Group>
            </CardSection>
            <Card.Section className={classes.section}>
                <Text fz="sm" c="dimmed" className={classes.label} mb={15}>
                    Details
                </Text>

                <Group gap={30} mb={20}>
                    {features}
                </Group>
            </Card.Section>
        </Card>
    );
}  