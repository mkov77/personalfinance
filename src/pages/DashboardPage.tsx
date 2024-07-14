import React from "react";
import { Grid, Skeleton, Container } from "@mantine/core";
import NetWorthDash from "../components/dashboard/NetWorthDash";
import OptionsDash from "../components/dashboard/OptionsDash";
import DepositDash from "../components/dashboard/DepositDash"
import SavingsDash from "../components/dashboard/SavingsDash";

interface DashboardPageProps {
  onNavigate: (pageIndex: number) => void;
}

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  return (
    <Grid>
      <Grid.Col span={{ base: 12, xs: 8 }}><NetWorthDash /></Grid.Col>
      <Grid.Col span={{ base: 12, xs: 4 }}><OptionsDash onNavigate={onNavigate} /></Grid.Col>
      <Grid.Col span={{ base: 12, xs: 4 }}><DepositDash /></Grid.Col>
      <Grid.Col span={{ base: 12, xs: 8 }}><SavingsDash /></Grid.Col>
    </Grid>
  );
}