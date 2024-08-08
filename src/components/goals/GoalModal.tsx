import { Badge, Button, Card, Container, Grid, Group, Modal, NumberFormatter, Progress, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import GoalContributionCard from "./GoalContributionCard";
import axios from "axios";
import { Contribution } from "types/Contribution";
import { IconCalendarClock } from '@tabler/icons-react';
import { GoalSavingsTotal } from "../../functions/Computations";

interface GoalModalProps {
  goal: string;
  goalDate: string;
  goalamount: number;
}

export default function GoalModal({ goal, goalDate, goalamount }: GoalModalProps) {
  const [opened, setOpened] = useState(false);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const savedTotal = GoalSavingsTotal(goal);
  const percentGoal = savedTotal/goalamount*100;
  const leftToGo = goalamount - savedTotal;

  useEffect(() => {
    fetchContributions();
  }, []);

  const fetchContributions = () => {
    axios.get<Contribution[]>('http://localhost:5000/contributions')
      .then(response => {
        setContributions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the contributions!', error);
      });
  };

  // Filter contributions based on the current goal
  const filteredContributions = contributions.filter(contribution => contribution.contributiongoal === goal);

  return (
    <>
      <Button onClick={() => setOpened(true)} color='#707a82'>Open</Button>
      <Modal size="lg" opened={opened} onClose={() => setOpened(false)} title=<h1 style={{margin: 0}}>{goal + ' Goal'}</h1>>
        <Card radius="md" withBorder mt={20} shadow="sm">
            <h3 style={{margin: 0}}>Progress</h3>
          <Group justify="space-between" mt="xs">
            <Text fz="sm">
            <NumberFormatter decimalScale={0} prefix="$" value={savedTotal} thousandSeparator/>
              { " / " }
              <NumberFormatter decimalScale={0}  value={goalamount} thousandSeparator/>
            </Text>
            <Text fz="sm" c="dimmed">
              {percentGoal.toFixed(0)}%
            </Text>
          </Group>
          <Progress color='#946e96' value={percentGoal} mt={5} />
          <Group justify="space-between" mt="md">
            <Group gap="5px">
              <IconCalendarClock stroke={1.5}/>
              <Text fz="sm" m={0}>{new Date(goalDate).toLocaleDateString()}</Text>
            </Group>
            <Badge color='#707a82' size="sm"><NumberFormatter decimalScale={0} prefix="$" value={leftToGo} thousandSeparator/>{ " to go"}</Badge>
          </Group>
        </Card>

        <Card radius="md" withBorder mt={20} style={{ padding: '10px' }} shadow="sm">
        <h3 style={{margin: 0, marginBottom: 10}}>Contributions</h3>
          <Grid>
            {filteredContributions.map((contribution) => (
              <GoalContributionCard
                key={contribution.contributionid}
                contribution={contribution}
              />
            ))}
          </Grid>
        </Card>
        <Card radius="md" withBorder mt={20} style={{ padding: '10px' }} shadow="sm">
        <h3 style={{margin: 0}}>Options</h3>
        <Container>
        <Grid >
            <Button color='#707a82' style={{margin: 10}}>Edit</Button>
            <Button color='#707a82' style={{margin: 10}}>Archive</Button>
            <Button color='red' style={{margin: 10}}>Delete</Button>
          </Grid>
          </Container>
          </Card>
      </Modal>
    </>
  );
}