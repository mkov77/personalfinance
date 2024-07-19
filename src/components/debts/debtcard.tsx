import { Card, NumberFormatter } from "@mantine/core";
import { Debt } from "../../types/Debt";

interface DebtCardProps {
    debt: Debt;
}

export default function DebtCard({ debt }: DebtCardProps) {

    return (
        <Card withBorder>

            <h3 style={{ padding: 0, margin: 0 }}>{debt.debtname}</h3>

            <NumberFormatter prefix='$' decimalScale={2}  value={debt.debtamount} thousandSeparator/>

        </Card>

    );
}