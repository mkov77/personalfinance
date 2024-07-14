// src/pages/LogsPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContributionCard from '../components/logs/ContributionCard';
import AddContributionForm from '../components/logs/AddContributionForm';
import { Contribution } from '../types/Contribution';
import { Button, Group, Menu, rem } from '@mantine/core';
import { IconChevronDown, IconChevronCompactUp, IconChevronUp } from '@tabler/icons-react';

function LogsPage() {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [sortOption, setSortOption] = useState<string>('Date');
  const [sortDirection, setSortDirection] = useState<string>('asc'); // Added state for sort direction

  useEffect(() => {
    handleSort(sortOption); // Sort contributions when sortOption or sortDirection changes
  }, [sortOption, sortDirection]); // Added sortDirection dependency

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

  const handleSort = (option: string) => {
    setSortOption(option);
    let sortedContributions = [...contributions];
    switch (option) {
      case 'Amount':
        sortedContributions.sort((a, b) => parseFloat(b.contributionamount.toString()) - parseFloat(a.contributionamount.toString()));
        break;
      case 'Date':
        sortedContributions.sort((a, b) => new Date(b.contributiondate).getTime() - new Date(a.contributiondate).getTime());
        break;
      case 'Contributor':
        sortedContributions.sort((a, b) => a.contributor.localeCompare(b.contributor));
        break;
      case 'Source':
        sortedContributions.sort((a, b) => a.contributionsource.localeCompare(b.contributionsource));
        break;
      case 'Goal':
        sortedContributions.sort((a, b) => a.contributiongoal.localeCompare(b.contributiongoal));
        break;
      default:
        break;
    }
    if (sortDirection === 'asc') {
      sortedContributions.reverse();
    }
    setContributions(sortedContributions);
  };

  const toggleSortDirection = () => {
    setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    handleSort(sortOption); // Re-sort with the new direction
  };

  const renderSortBy = () => {
    return (
      <Group wrap="nowrap" gap={0}>
        <Menu
          transitionProps={{ transition: 'pop-top-right' }}
          position="top-end"
          width={220}
          withinPortal
        >
          <Menu.Target>
            <Button
              style={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              Sort
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => handleSort('Amount')}>Amount</Menu.Item>
            <Menu.Item onClick={() => handleSort('Date')}>Date</Menu.Item>
            <Menu.Item onClick={() => handleSort('Contributor')}>Contributor</Menu.Item>
            <Menu.Item onClick={() => handleSort('Source')}>Source</Menu.Item>
            <Menu.Item onClick={() => handleSort('Goal')}>Goal</Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Button
          style={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          onClick={toggleSortDirection}
        >
          {sortDirection === 'asc' ? (
            <IconChevronDown style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          ) : (
            <IconChevronUp style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          )}
        </Button>
      </Group>
    );
  };

  return (
    <div>
      <Group>
        <AddContributionForm onAdd={handleAddContribution} />
        {renderSortBy()}
      </Group>
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