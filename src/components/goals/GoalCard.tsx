// components/goals/GoalCard.tsx

import React from 'react';
import { Card, Text, Badge, Container } from '@mantine/core';
import { IconCalendarClock } from '@tabler/icons-react';

interface GoalCardProps {
  goalname: string;
  goalTargetDate: string;
}

const GoalCard: React.FC<GoalCardProps> = ({ goalname, goalTargetDate }) => {
  // Parse the goalTargetDate string into a Date object
  const parsedDate = new Date(goalTargetDate);
  const formattedDate = parsedDate instanceof Date && !isNaN(parsedDate.getTime())
    ? parsedDate.toLocaleDateString()
    : 'Invalid Date';

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text size="xl" style={{ marginBottom: 10 }}>
        {goalname}
      </Text>
      
      <Badge>
        <Container style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} color="blue">
          <IconCalendarClock />
          {formattedDate}
        </Container>
      </Badge>
    </Card>
  );
};

export default GoalCard;