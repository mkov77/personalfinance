// components/goals/GoalCard.tsx

import React from 'react';
import { Card, Text, RingProgress, Center, NumberFormatterFactory, NumberFormatter } from '@mantine/core';
import GoalModal from './GoalModal';
import { GoalSavingsTotal } from '../../functions/Computations';

interface GoalCardProps {
  goalname: string;
  goaltargetdate: string;
  goalamount: number;
  onDelete: (goalname: string) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goalname, goaltargetdate, goalamount, onDelete }) => {
  // Directly convert goalTargetDate to locale date string
  // const formattedDate = new Date(goaltargetdate).toLocaleDateString();
  const currentTotal = Number(GoalSavingsTotal(goalname));
  const goalTotal = goalamount;
  console.log('Savings Total: ' + currentTotal);
  console.log('Goal Amount: ' + goalamount);
  console.log('Percent: ' + (currentTotal / goalTotal) * 100);

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
            sections={[{ value: (currentTotal / goalTotal) * 100, color: '#946e96' }]}
            label={
              <div>
                <Text ta="center" fz="lg" >
                  {/* {((completed / total) * 100).toFixed(0)}%
                  Saved */} 
                  <NumberFormatter prefix='$' decimalScale={0}  value={currentTotal} thousandSeparator/>
                </Text>
                <Text ta="center" fz="xs" c="dimmed">
                  Saved
                </Text>
              </div>
            }
          />
          </Center>
          <GoalModal goal={goalname} goalDate={goaltargetdate} goalamount={goalamount} />
    </Card>
  );
};

export default GoalCard;