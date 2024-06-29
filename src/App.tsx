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
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
} from '@tabler/icons-react';
import classes from './App.module.css';
import DashboardPage from './pages/DashboardPage';
import LogsPage from './pages/LogsPage';
import GoalsPage from './pages/GoalsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import DebtsPage from './pages/DebtsPage';
import SettingsPage from './pages/SettingsPage';
import React from 'react';

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
  { icon: IconCalendarStats, label: 'Log', component: LogsPage },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics', component: AnalyticsPage },
  { icon: IconUser, label: 'Goals', component: GoalsPage },
  { icon: IconFingerprint, label: 'Debt', component: DebtsPage },
  { icon: IconSettings, label: 'Settings', component: SettingsPage },
];

export default function App() {
  const [active, setActive] = useState(0);

  const links = pages.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  const ActivePage = pages[active].component;

  return (
    <div className={classes.app}>
      <nav className={classes.navbar}>
        <Center>
          <Image 
            src="https://github.com/mkov77/personalfinance/blob/main/src/images/SM_LOGO_JUMBOFONT.png?raw=true"
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
          <NavbarLink icon={IconLogout} label="Logout" />
        </Stack>
      </nav>
      
      <main className={classes.content}>
        <ActivePage />
      </main>
    </div>
  );
}