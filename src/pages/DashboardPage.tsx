import React from "react";
import { Grid, Skeleton, Container } from "@mantine/core";
import NetWorthDash from "../components/dashboard/NetWorthDash";
import OptionsDash from "../components/dashboard/OptionsDash";
import DepositDash from "../components/dashboard/DepositDash"
import SavingsDash from "../components/dashboard/SavingsDash";
import classes from "./DashboardPage.module.css"

const child = <Skeleton height={140} radius="md" animate={false} />;

export default function DashboardPage() {
  return (
    <Container my="md">
      <div className={classes.gridContainer}>
        <Grid>
          <Grid.Col span={{ base: 12, xs: 8 }}><NetWorthDash /></Grid.Col>
          <Grid.Col span={{ base: 12, xs: 4 }}><OptionsDash /></Grid.Col>
          <Grid.Col span={{ base: 12, xs: 4 }}><DepositDash /></Grid.Col>
          <Grid.Col span={{ base: 12, xs: 8 }}><SavingsDash /></Grid.Col>
        </Grid>
      </div>
    </Container>
  );
}