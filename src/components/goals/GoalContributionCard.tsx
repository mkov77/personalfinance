import { Card, Grid, Text, Container, rem } from "@mantine/core";
import { IconBucket, IconCalendar, IconTargetArrow, IconUser } from "@tabler/icons-react";
import { Contribution } from "types/Contribution";

interface GoalContributionCardProps {
    contribution: Contribution;
  }

const GoalContributionCard: React.FC<GoalContributionCardProps> = ({ contribution }) => {
    

    return (
        <>
            <Card shadow="sm" padding="sm" radius="md" withBorder key={contribution.contributionid} style={{ marginTop: '10px', paddingRight: '25px' }}>
                <Grid grow gutter="lg" align='center' justify='flex-start'>
                    {/* Amount */}
                    <Grid.Col span={3}>
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
                    <Grid.Col span={3}>
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
