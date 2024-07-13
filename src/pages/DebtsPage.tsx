import React from "react";
import { Card, Text } from "@mantine/core";
import { DebtTotal } from "../functions/Computations";

export default function DebtsPage() {

    const totaldebt = Number(DebtTotal());

    return (
        <>
            <Text>Oof</Text>
            <Card withBorder radius="md">
                <h1 style={{padding: 0, margin: 0}}>Total Debt</h1>
                <Text>${totaldebt}</Text>
            </Card>
        </>
    )
}