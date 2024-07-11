// src/components/goals/AddGoalForm.tsx
import React, { useState } from 'react';
import { Button, TextInput, Modal, Center } from '@mantine/core';

interface AddGoalFormProps {
  onAdd: (goalName: string, goalTargetDate: string) => void;
}

const AddGoalForm: React.FC<AddGoalFormProps> = ({ onAdd }) => {
  const [opened, setOpened] = useState(false);
  const [goalName, setGoalName] = useState('');
  const [goalTargetDate, setGoalTargetDate] = useState('');

  const handleSubmit = () => {
    onAdd(goalName, goalTargetDate);
    setOpened(false);
    setGoalName('');
    setGoalTargetDate('');
  };

  return (
    <>
      <Button onClick={() => setOpened(true)} color='#707a82'>Add Goal</Button>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Add Goal">
        <TextInput label="Goal Name" value={goalName} onChange={(event) => setGoalName(event.currentTarget.value)} />
        <TextInput
          label="Target Date"
          type="date"
          value={goalTargetDate}
          onChange={(event) => setGoalTargetDate(event.currentTarget.value)}
        />
        <Center style={{marginTop: '20px'}}><Button onClick={handleSubmit} style={{backgroundColor: '#707a82'}}>Submit</Button></Center>
      </Modal>
    </>
  );
};

export default AddGoalForm;
