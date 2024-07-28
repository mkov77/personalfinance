import React from "react";
import { Grid, GridCol, Text } from "@mantine/core";
import Networth from "../components/analytics/NetworthCard";
import ContributorGrid from "../components/analytics/ContributorGrid";
import FigureGrid from "../components/analytics/FigureGrid";

export default function AnalyticsPage() {
    return (
        <Grid>
            {/* <GridCol>
                <Networth />
            </GridCol> */}
            <GridCol>
                <ContributorGrid />
            </GridCol>
            <GridCol>
                <FigureGrid />
            </GridCol>
        </Grid>

    )
}