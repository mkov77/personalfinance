import { Text, Progress, Card } from '@mantine/core';

export default function NetWorthDash() {

    const currentNetWorth = 200000;
    const goalNetWorth = 500000;
    const percentComplete = (Number(currentNetWorth)/Number(goalNetWorth)*100);

  return (
    <Card withBorder radius="md" padding="xl" bg="var(--mantine-color-body)" style={{ height: '175px' }}>
      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        Net Worth
      </Text>
      <Text fz="lg" fw={500}>
        {currentNetWorth} / {goalNetWorth}
      </Text>
      <Progress value={ percentComplete } mt="md" size="lg" radius="xl" color='#4c5b67' />
    </Card>
  );
}