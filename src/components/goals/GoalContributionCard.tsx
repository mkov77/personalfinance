import { Card, Grid, Text, Container, rem } from "@mantine/core";
import { IconBucket, IconCalendar, IconUser } from "@tabler/icons-react";
import { Contribution } from "types/Contribution";
import { GoalSavingsTotal } from "functions/Computations";

interface GoalContributionCardProps {
    contribution: Contribution;
  }

const GoalContributionCard: React.FC<GoalContributionCardProps> = ({ contribution }) => {
    

    return (
        <>
            <Card shadow="sm" padding="sm" radius="md" mt={0} mb={10} m={10} withBorder key={contribution.contributionid} style={{ width: '100%' }}>
                <Grid>
                    {/* Amount */}
                    <Grid.Col span={2}>
                        <Text fw={500}>${Number(contribution.contributionamount).toFixed(2)}</Text>
                    </Grid.Col>
                    {/* Date */}
                    <Grid.Col span={3}>
                        <Container
                            style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}
                        >
                            <IconCalendar style={{ width: rem(18), height: rem(18), marginRight: rem(6) }} />
                            <Text>{new Date(contribution.contributiondate).toLocaleDateString()}</Text>
                        </Container>
                    </Grid.Col>
                    {/* Contributor */}
                    <Grid.Col span={3}>
                        <Container
                            style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}
                        >
                            <IconUser style={{ width: rem(18), height: rem(18), marginRight: rem(6) }} />
                            <Text>{contribution.contributor}</Text>
                        </Container>
                    </Grid.Col>
                    {/* Source */}
                    <Grid.Col span={4}>
                        <Container
                            style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}
                        >
                            <IconBucket style={{ width: rem(18), height: rem(18), marginRight: rem(6) }} />
                            <Text>{contribution.contributionsource}</Text>
                        </Container>
                    </Grid.Col>
                </Grid>
            </Card>
        </>

    );

}

export default GoalContributionCard;
