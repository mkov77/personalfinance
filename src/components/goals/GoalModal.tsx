import { Badge, Button, Card, Container, Grid, Group, Modal, Progress, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import GoalContributionCard from "./GoalContributionCard";
import axios from "axios";
import { Contribution } from "types/Contribution";

interface GoalModalProps {
  goal: string;
}

export default function GoalModal({ goal }: GoalModalProps) {
  const [opened, setOpened] = useState(false);
  const [contributions, setContributions] = useState<Contribution[]>([]);

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
      <Button onClick={() => setOpened(true)} style={{ backgroundColor: '#707a82' }}>Open</Button>
      <Modal size="lg" opened={opened} onClose={() => setOpened(false)} title=<h1 style={{margin: 0}}>{goal + ' Goal'}</h1>>
        <Card radius="md" withBorder mt={20} shadow="sm">
            <h3 style={{margin: 0}}>Progress</h3>
          <Group justify="space-between" mt="xs">
            <Text fz="sm">
              $50,0000 / $80,000
            </Text>
            <Text fz="sm" c="dimmed">
              62%
            </Text>
          </Group>
          <Progress value={62} mt={5} />
          <Group justify="space-between" mt="md">
            <Text fz="sm">05/30/2025</Text>
            <Badge size="sm">20 weeks left</Badge>
          </Group>
        </Card>

        <Card radius="md" withBorder mt={20} style={{ padding: '10px' }} shadow="sm">
        <h3 style={{margin: 0}}>Contributions</h3>
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
            <Button>Edit</Button>
            <Button>Archive</Button>
            <Button>Delete</Button>
          </Grid>
          </Container>
          </Card>
      </Modal>
    </>
  );
}