// components/goals/GoalCard.tsx

import React from 'react';
import { Card, Text, RingProgress, Center } from '@mantine/core';
import GoalModal from './GoalModal';

interface GoalCardProps {
  goalname: string;
  goaltargetdate: string;
  onDelete: (goalname: string) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goalname, goaltargetdate, onDelete }) => {
  // Directly convert goalTargetDate to locale date string
  // const formattedDate = new Date(goaltargetdate).toLocaleDateString();
  const completed = 5;
  const total = 20;

  const handleDeleteClick = () => {
    onDelete(goalname); // Call onDelete with goal name
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Center>
        <Text size="xl" style={{ marginBottom: 10 }}>
        {goalname}
        </Text>
      </Center>
      
      {/* <Badge>
        <Container style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} color="blue">
          <IconCalendarClock />
          {formattedDate}
        </Container>
      </Badge> */}

        <Center>
      <RingProgress
            roundCaps
            thickness={6}
            size={150}
            sections={[{ value: (completed / total) * 100, color: 'red' }]}
            label={
              <div>
                <Text ta="center" fz="lg" >
                  {/* {((completed / total) * 100).toFixed(0)}%
                  Saved */}
                  $20,000 
                </Text>
                <Text ta="center" fz="xs" c="dimmed">
                  Remaining
                </Text>
              </div>
            }
          />
          </Center>
          <GoalModal goal={goalname} />
    </Card>
  );
};

export default GoalCard;