import { Text, Progress, Card } from '@mantine/core';
import { SavingsTotal, DebtTotal } from '../../functions/Computations'

export default function NetWorthDash() {
    const currentSavings = SavingsTotal();
    const currentDebt = DebtTotal();
    const currentNetWorth = (currentSavings-currentDebt).toFixed(2);
    const goalNetWorth = 500000;
    const percentComplete = (Number(currentNetWorth)/Number(goalNetWorth)*100);

  return (
    <Card withBorder radius="md" padding="xl" bg="var(--mantine-color-body)" style={{ height: '175px' }}>
      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        Net Worth
      </Text>
      <Text fz="lg" fw={500}>
        $ {Number(currentNetWorth)} / {goalNetWorth}
      </Text>
      <Progress value={ percentComplete } mt="md" size="lg" radius="xl" color='#4c5b67' />
    </Card>
  );
}