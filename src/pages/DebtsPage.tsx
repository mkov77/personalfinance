import React from "react";
import { Card, NumberFormatter, Text } from "@mantine/core";
import { DebtTotal } from "../functions/Computations";
import DebtGrid from "../components/debts/DebtGrid";

export default function DebtsPage() {

    const totaldebt = Number(DebtTotal());

    return (
        <>
            {console.log('Big oof.')}
            <Card withBorder radius="md" shadow='sm'>
                <h2 style={{padding: 0, margin: 0}}> <NumberFormatter decimalScale={2} prefix="$" value={totaldebt} thousandSeparator/> </h2>
                <Text>Total Debt</Text>
            </Card>

            <DebtGrid/>
            
        </>
    )
}