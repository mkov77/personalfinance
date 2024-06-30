// src/components/logs/ContributionCard.tsx
import React from 'react';
import { Card, Text, Badge, Button, Group, Menu, ActionIcon, rem, Container } from '@mantine/core';
import { Contribution } from '../../types/Contribution';
import { IconDots, IconTrash, IconPencil, IconCalendar, IconTargetArrow, IconBucket, IconUser } from '@tabler/icons-react';

interface ContributionCardProps {
  contribution: Contribution;
  onDelete: (id: number) => void; // Define onDelete prop
  onEdit: (updatedContribution: Contribution) => void; // Define onEdit prop
}

const ContributionCard: React.FC<ContributionCardProps> = ({ contribution, onDelete, onEdit }) => {
  const handleDeleteClick = () => {
    onDelete(contribution.contributionid); // Call onDelete with contribution id
  };

  const handleEditClick = () => {
    // For demonstration purposes, you could implement editing functionality here
    // Typically, this would open a modal or navigate to an edit form
    console.log('Edit clicked for contribution:', contribution);
    // Example of editing directly in the card
    const updatedContribution: Contribution = { ...contribution, contributionamount: contribution.contributionamount + 10 };
    onEdit(updatedContribution);
  };


  const renderMenu = () => {
    return (
      <Menu
        transitionProps={{ transition: 'pop' }}
        withArrow
        position="bottom-end"
        withinPortal
      >
        <Menu.Target>
          <ActionIcon variant="subtle" color="gray">
            <IconDots style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            color="black"
          >
            Edit
          </Menu.Item>
          <Menu.Item
            leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            color="red"
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  }

  return (
    <Card shadow="sm" padding="sm" radius="md" withBorder key={contribution.contributionid} style={{ marginTop: '10px' }}>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>${Number(contribution.contributionamount).toFixed(2)}</Text>


        <Container
          style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}
        >
          <IconCalendar style={{ width: rem(18), height: rem(18), marginRight: rem(6) }} />
          <Text>{new Date(contribution.contributiondate).toLocaleDateString()}</Text>
        </Container>

        <Container
          style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}
        >
          <IconUser style={{ width: rem(18), height: rem(18), marginRight: rem(6) }} />
          <Text>{contribution.contributor}</Text>
        </Container>
        
        <Container
          style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}
        >
          <IconBucket style={{ width: rem(18), height: rem(18), marginRight: rem(6) }} />
          <Text>{contribution.contributionsource}</Text>
        </Container>

        <Container
          style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}
        >
          <IconTargetArrow style={{ width: rem(18), height: rem(18), marginRight: rem(6) }} />
          <Text>{contribution.contributiongoal}</Text>
        </Container>

        {renderMenu()}
      </Group>
    </Card>
  );
};

export default ContributionCard;