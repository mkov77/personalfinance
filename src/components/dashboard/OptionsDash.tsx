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
  import { useState } from 'react';
  import AddContributionForm from 'components/logs/AddContributionForm';
  
  const mockdata = [
    { title: 'Quick Add', icon: IconTablePlus, color: 'violet' },
    { title: 'Log', icon: IconReceipt, color: 'blue' },
    { title: 'Analytics', icon: IconDeviceDesktopAnalytics, color: 'teal' },
    { title: 'Goals', icon: IconTargetArrow, color: 'cyan' },
    { title: 'Debt', icon: IconBuildingBank, color: 'red' },
    { title: 'Settings', icon: IconSettings, color: 'orange' }
  ];
  
  export default function OptionsDash() {
    const theme = useMantineTheme();
    const [activeComponent, setActiveComponent] = useState<string | null>(null);
  
    const items = mockdata.map((item) => (
      <UnstyledButton key={item.title} className={classes.item}>
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