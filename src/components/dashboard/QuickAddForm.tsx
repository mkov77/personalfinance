import { useEffect, useState } from "react";
import { Modal, Button, NumberInput, Select, Center } from "@mantine/core";
import axios from "axios";

export default function QuickAddForm({ onAdd }: { onAdd: (contribution: any) => void }) {
  const [opened, setOpened] = useState(false);
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [contributors, setContributors] = useState<{ value: string; label: string }[]>([]);
  const [selectedContributor, setSelectedContributor] = useState<string>('');
  const [sources, setSources] = useState<{ value: string; label: string }[]>([]);
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [goals, setGoals] = useState<{ value: string; label: string }[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string>('');

  useEffect(() => {
    fetchContributors();
    fetchSources();
    fetchGoals();
  }, []);

  const fetchContributors = () => {
    axios.get<string[]>('http://localhost:5000/contributors')
      .then(response => {
        const data = response.data.map(contributor => ({ value: contributor, label: contributor }));
        setContributors(data);
      })
      .catch(error => {
        console.error('Error fetching contributors:', error);
      });
  };

  const fetchSources = () => {
    axios.get<string[]>('http://localhost:5000/sources')
      .then(response => {
        const data = response.data.map(source => ({ value: source, label: source }));
        setSources(data);
      })
      .catch(error => {
        console.error('Error fetching sources:', error);
      });
  };

  const fetchGoals = () => {
    axios.get<any[]>('http://localhost:5000/goals')
      .then(response => {
        const formattedGoals = response.data.map(goal => ({
          value: goal.goalname,
          label: goal.goalname,
        }));
        setGoals(formattedGoals);
      })
      .catch(error => {
        console.error('Error fetching goals:', error);
      });
  };

   // Function to handle form submission
   const handleSubmit = async () => {
    // Check if all required fields are filled
    if (date && amount && selectedContributor && selectedSource && selectedGoal) {
      try {
        const response = await axios.post('http://localhost:5000/contributions', {
          contributiondate: date,
          contributionamount: amount,
          contributionsource: selectedSource,
          contributor: selectedContributor,
          contributiongoal: selectedGoal
        });
        console.log('Contribution added:', response.data);
        setOpened(false); // Close the modal after successful submission
        // Reset form fields
        setDate('');
        setAmount(0);
        setSelectedContributor('');
        setSelectedSource('');
        setSelectedGoal('');
      } catch (error) {
        console.error('Error adding contribution:', error);
        // Handle error appropriately, e.g., show an error message
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <>
        <input type="date" value={date} onChange={(event) => setDate(event.currentTarget.value)} required />
        <NumberInput
          label="Amount"
          value={amount}
          onChange={(value) => setAmount(typeof value === 'number' ? value : 0)}
          required
          min={0}
        />
        <Select
          label="Contributor"
          data={contributors}
          value={selectedContributor}
          onChange={(value) => setSelectedContributor(value as string)}
          placeholder="Select contributor"
          required
        />
        <Select
          label="Source"
          data={sources}
          value={selectedSource}
          onChange={(value) => setSelectedSource(value as string)}
          placeholder="Select source"
          required
        />
        <Select
          label="Goal"
          data={goals}
          value={selectedGoal}
          onChange={(value) => setSelectedGoal(value as string)}
          placeholder="Select goal"
          required
        />
        <Center style={{ marginTop: '20px' }}>
          <Button onClick={handleSubmit}>Submit</Button>
        </Center>
    </>
  );
}