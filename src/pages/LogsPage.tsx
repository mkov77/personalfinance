// src/pages/LogsPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContributionCard from '../components/logs/ContributionCard';
import AddContributionForm from '../components/logs/AddContributionForm';
import { Contribution } from '../types/Contribution';

function LogsPage() {
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

  const handleAddContribution = (newContribution: Omit<Contribution, 'contributionid'>) => {
    axios.post('http://localhost:5000/contributions', newContribution)
      .then(response => {
        fetchContributions();
      })
      .catch(error => {
        console.error('There was an error adding the contribution!', error);
      });
  };

  const handleDeleteContribution = (id: number) => {
    axios.delete(`http://localhost:5000/contributions/${id}`)
      .then(response => {
        fetchContributions();
      })
      .catch(error => {
        console.error('There was an error deleting the contribution!', error);
      });
  };

  const handleEditContribution = (updatedContribution: Contribution) => {
    axios.put(`http://localhost:5000/contributions/${updatedContribution.contributionid}`, updatedContribution)
      .then(response => {
        fetchContributions();
      })
      .catch(error => {
        console.error('There was an error editing the contribution!', error);
      });
  };

  return (
    <div>
      <AddContributionForm onAdd={handleAddContribution} />
      {contributions.map((contribution) => (
        <ContributionCard
          key={contribution.contributionid}
          contribution={contribution}
          onDelete={handleDeleteContribution}
          onEdit={handleEditContribution}
        />
      ))}
    </div>
  );
}

export default LogsPage;