import { Progress, Box, Text, Group, Paper, SimpleGrid} from '@mantine/core';
import classes from './SavingsDash.module.css';

const data = [
  { label: 'CD', count: '$8,000', percentage: 40, color: '#b98abc' },
  { label: 'Travel', count: '$6,000', percentage: 30, color: '#0d1012' },
  { label: 'Wedding', count: '$6,000', percentage: 30, color: '#8dbc8a' },
];

export default function SavingsDash() {

  const amountSaved = 20000;
  const segments = data.map((segment) => (
    <Progress.Section value={segment.percentage} color={segment.color} key={segment.color}>
      {segment.percentage > 10 && <Progress.Label>{segment.percentage}%</Progress.Label>}
    </Progress.Section>
  ));

  const descriptions = data.map((stat) => (
    <Box key={stat.label} style={{ borderBottomColor: stat.color }} className={classes.stat}>
      <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
        {stat.label}
      </Text>

      <Group justify="space-between" align="flex-end" gap={0}>
        <Text fw={700}>{stat.count}</Text>
        <Text c={stat.color} fw={700} size="sm" className={classes.statCount}>
          {stat.percentage}%
        </Text>
      </Group>
    </Box>
  ));

  return (
      <Paper withBorder p="md" radius="md" style={{ height: '250px' }}>
        <Group align="flex-end" gap="xs">
          <Text fz="xl" fw={700}>
            ${amountSaved}
          </Text>
        </Group>

        <Text c="dimmed" fz="sm">
          Total Savings
        </Text>

        <Progress.Root size={34} classNames={{ label: classes.progressLabel }} mt={40}>
          {segments}
        </Progress.Root>
        <SimpleGrid cols={{ base: 1, xs: 3 }} mt="xl">
          {descriptions}
        </SimpleGrid>
      </Paper>
  );
}