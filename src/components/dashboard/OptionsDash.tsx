import {
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import {
  IconTablePlus,
  IconReceipt,
  IconDeviceDesktopAnalytics,
  IconTargetArrow,
  IconBuildingBank,
  IconSettings
} from '@tabler/icons-react';
import classes from './OptionsDash.module.css';

const options = [
  { title: 'Quick Add', icon: IconTablePlus, color: 'violet', pageIndex: null },
  { title: 'Log', icon: IconReceipt, color: 'blue', pageIndex: 1 },
  { title: 'Goals', icon: IconTargetArrow, color: 'teal', pageIndex: 2 },
  { title: 'Analytics', icon: IconDeviceDesktopAnalytics, color: 'cyan', pageIndex: 3 },
  { title: 'Debt', icon: IconBuildingBank, color: 'red', pageIndex: 4 },
  { title: 'Settings', icon: IconSettings, color: 'orange', pageIndex: 5 }
];

export default function OptionsDash({ onNavigate }: { onNavigate: (pageIndex: number) => void }) {
  const theme = useMantineTheme();

  function handleQuickAdd() {
    // Your logic for quick add
  }

  function handleNavigate(pageIndex: number | null) {
    if (pageIndex !== null) {
      onNavigate(pageIndex);
    }
  }

  const items = options.map((item) => (
    <UnstyledButton
      key={item.title}
      className={classes.item}
      onClick={item.title === 'Quick Add' ? handleQuickAdd : () => handleNavigate(item.pageIndex)}
    >
      <item.icon color={theme.colors[item.color][6]} size="2rem" />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
    </Card>
  );
}