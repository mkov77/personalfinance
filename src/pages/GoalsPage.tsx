// src/pages/GoalsPage.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Loader } from '@mantine/core'; // Import Grid and Loader for layout and loading states
import GoalCard from '../components/goals/GoalCard';
import AddGoalForm from '../components/goals/AddGoalForm';

interface Goal {
  goalname: string;
  goalTargetDate: string;
}

const GoalsPage: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = () => {
    axios.get<Goal[]>('http://localhost:5000/goals')
      .then(response => {
        setGoals(response.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching goals:', error);
        setLoading(false); // Handle loading state on error
      });
  };

  const handleAddGoal = (goalname: string, goalTargetDate: string) => {
    axios.post('http://localhost:5000/goals', { goalname, goalTargetDate })
      .then(response => {
        fetchGoals();
      })
      .catch(error => {
        console.error('Error adding goal:', error);
      });
  };

  return (
    <div>
      <AddGoalForm onAdd={handleAddGoal} />
      <Grid gutter="lg" style={{ marginTop: '10px' }}>
        {loading ? (
          <Loader />
        ) : (
          goals.map((goal, index) => (
            <Grid.Col key={index} span={3}>
              <GoalCard goalname={goal.goalname} goalTargetDate={goal.goalTargetDate} />
            </Grid.Col>
          ))
        )}
      </Grid>
    </div>
  );
};

export default GoalsPage;