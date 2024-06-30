// components/goals/GoalCard.tsx

import React from 'react';
import { Card, Text, Badge } from '@mantine/core';

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
      <Badge color="blue">{formattedDate}</Badge>
    </Card>
  );
};

export default GoalCard;