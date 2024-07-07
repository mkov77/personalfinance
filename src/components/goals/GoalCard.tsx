// components/goals/GoalCard.tsx

import React from 'react';
import { Card, Text, Badge, Container } from '@mantine/core';
import { IconCalendarClock } from '@tabler/icons-react';

interface GoalCardProps {
  goalname: string;
  goaltargetdate: string;
}

const GoalCard: React.FC<GoalCardProps> = ({ goalname, goaltargetdate }) => {
  // Directly convert goalTargetDate to locale date string
  const formattedDate = new Date(goaltargetdate).toLocaleDateString();
  console.log('Formatted: ', formattedDate);
  console.log('Not Formatted: ', goaltargetdate);

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