import React from "react";
import { Grid, GridCol, Text } from "@mantine/core";
import Networth from "../components/analytics/NetworthCard";
import ContributorGrid from "../components/analytics/ContributorGrid";

export default function AnalyticsPage() {
    return (
        <Grid>
            <GridCol>
                <Networth />
            </GridCol>
            <GridCol>
                <ContributorGrid />
            </GridCol>
        </Grid>

    )
}