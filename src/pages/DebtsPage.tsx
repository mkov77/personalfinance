import React from "react";
import { Card, Grid, GridCol, NumberFormatter, Text } from "@mantine/core";
import { DebtTotal } from "../functions/Computations";
import DebtGrid from "../components/debts/DebtGrid";

export default function DebtsPage() {

    const totaldebt = Number(DebtTotal());

    return (
        <>
            {console.log('Big oof.')}
            <Grid columns={4}>
                <GridCol span={1}>

                    <Card withBorder radius="md" shadow='sm'>
                        <h2 style={{ padding: 0, margin: 0 }}> <NumberFormatter decimalScale={2} prefix="$" value={totaldebt} thousandSeparator /> </h2>
                        <Text fz="xs" tt="uppercase" fw={700} c="dimmed">Total Debt</Text>
                    </Card>
                </GridCol>

                <GridCol span={3}>
                    <DebtGrid />
                </GridCol>
            </Grid>

        </>
    )
}