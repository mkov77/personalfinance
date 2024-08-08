import { Text, Progress, Card, NumberFormatter } from '@mantine/core';
import { SavingsTotal, DebtTotal } from '../../functions/Computations'

export default function NetWorthDash() {
    const currentSavings = SavingsTotal();
    const currentDebt = DebtTotal();
    const currentNetWorth = (currentSavings-currentDebt).toFixed(2);
    const goalNetWorth = 25000;
    const percentComplete = (Number(currentNetWorth)/Number(goalNetWorth)*100);

  return (
    <Card withBorder radius="md" padding="xl" bg="var(--mantine-color-body)" shadow='sm' style={{ height: '175px' }}>
      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        Net Worth
      </Text>
      <Text fz="lg" fw={500}>
        <NumberFormatter prefix='$' decimalScale={0}  value={currentNetWorth} thousandSeparator/>
        {' / '}
        <NumberFormatter prefix='$' decimalScale={0}  value={goalNetWorth} thousandSeparator/>
      </Text>
      <Progress value={ percentComplete } mt="md" size="lg" radius="xl" color='#4c5b67' />
    </Card>
  );
}