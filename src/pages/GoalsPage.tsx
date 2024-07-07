// src/pages/GoalsPage.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Loader } from '@mantine/core'; // Import Grid and Loader for layout and loading states
import GoalCard from '../components/goals/GoalCard';
import AddGoalForm from '../components/goals/AddGoalForm';

interface Goal {
  goalname: string;
  goaltargetdate: string;
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

  const handleDeleteGoal = (goalname: string) => {
    axios.delete(`http://localhost:5000/goals/${goalname}`)
      .then(response => {
        fetchGoals();
      })
      .catch(error => {
        console.error('There was an error deleting the goal!', error);
      });
  };

  return (
    <div>
      <AddGoalForm onAdd={handleAddGoal} />
      <Grid gutter="lg" style={{ marginTop: '10px' }} columns={5}>
        {loading ? (
          <Loader />
        ) : (
          goals.map((goal, index) => (
            <Grid.Col key={index} span={1}>
              <GoalCard goalname={goal.goalname} goaltargetdate={goal.goaltargetdate} onDelete={handleDeleteGoal} />
            </Grid.Col>
          ))
        )}
      </Grid>
    </div>
  );
};

export default GoalsPage;