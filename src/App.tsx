/**
 * App.tsx serves as the house for the app shell and handles navigation. 
 * The user's desired page is rendered in within the app shell from this component.
 */
import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem, Image } from '@mantine/core';
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconReceipt,
  IconSettings,
  IconTargetArrow,
  IconBuildingBank
} from '@tabler/icons-react';
import classes from './App.module.css';
import DashboardPage from './pages/DashboardPage';
import LogsPage from './pages/LogsPage';
import GoalsPage from './pages/GoalsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import DebtsPage from './pages/DebtsPage';
import SettingsPage from './pages/SettingsPage';
import React from 'react';
import logo from './images/SM_LOGO_JUMBOFONT.png';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const pages = [
  { icon: IconGauge, label: 'Dashboard', component: DashboardPage },
  { icon: IconReceipt, label: 'Log', component: LogsPage },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics', component: AnalyticsPage },
  { icon: IconTargetArrow, label: 'Goals', component: GoalsPage },
  { icon: IconBuildingBank, label: 'Debt', component: DebtsPage },
  { icon: IconSettings, label: 'Settings', component: SettingsPage }
];

export default function App() {
  const [active, setActive] = useState(0);

  const links = pages.slice(0, -1).map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  const ActivePage = pages[active].component;
  const activePageName = pages[active].label;

  return (
    <div className={classes.app}>
      <nav className={classes.navbar}>
        <Center>
          <Image 
            src={logo}
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
            alt="Logo"
          />
        </Center>

        <div className={classes.navbarMain}>
          <Stack justify="center" gap={0}>
            {links}
          </Stack>
        </div>

        <Stack justify="center" gap={0}>
          <NavbarLink 
            icon={IconSettings} 
            label="Settings" 
            active={active === pages.length - 1} 
            onClick={() => setActive(pages.length - 1)}
          />
        </Stack>
      </nav>
      
      <main className={classes.content}>
        <header className={classes.header}>
          <h1>{activePageName}</h1>
        </header>
        <div className={classes.pageContent}>
          <ActivePage />
        </div>
      </main>
    </div>
  );
}
