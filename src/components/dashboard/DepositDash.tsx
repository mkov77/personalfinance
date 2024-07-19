import { Card, Text, Group, Flex, CardSection } from '@mantine/core';
import { IconCalendar, IconTargetArrow, IconBucket, IconUser } from '@tabler/icons-react';
import classes from './DepositDash.module.css';

const lastDepositAmount = 1000;

const mockdata = [
    { label: 'who', value: "Sondre", icon: IconUser },
    { label: 'where', value: "Travel Fund", icon: IconTargetArrow },
    { label: 'why', value: "Paycheck", icon: IconBucket },
    { label: 'when', value: "July 20", icon: IconCalendar },
];

export default function DepositDash() {
    const features = mockdata.map((feature) => (
        <Flex key={feature.value} align="center">
            <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
            <Text size="xs" ml="xs">{feature.value}</Text>
        </Flex>
    ));

    return (
        <Card withBorder radius="md" shadow='sm' className={classes.card} style={{ height: '250px' }}>
            <CardSection className={classes.section}>
                <Group justify="space-between" mt="md">
                    <div>
                        <Text fw={500}>Last Contribution</Text>
                        <Text style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                            ${lastDepositAmount}
                        </Text>
                    </div>
                </Group>
            </CardSection>
            <Card.Section className={classes.section} mt="md">
                <Text fz="sm" c="dimmed" className={classes.label}>
                    Details
                </Text>

                <Group gap={20} mb={20}>
                    {features}
                </Group>
            </Card.Section>
        </Card>
    );
}