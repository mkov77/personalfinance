import { Card, Grid, GridCol } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Debt } from "../../types/Debt";
import DebtCard from "./DebtCard";

export default function DebtGrid() {

    const [debts, setDebts] = useState<Debt[]>([]);

    useEffect(() => {
        fetchDebts();
    }, []);

    const fetchDebts = () => {
        console.log("Getting debts");
        axios.get<Debt[]>('http://localhost:5000/debts')
            .then(response => {
                setDebts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the contributions.', error);
            });
    };

    return (
        <Card withBorder shadow='sm'>
            <h2 style={{ padding: 0, margin: 0 }}>Debts</h2>

            <Grid columns={3}>

                <GridCol span={1}>

            {
                debts.map((debt) =>
                    <DebtCard debt={debt}/>
                )

            }
            </GridCol>

        </Grid>


        </Card>

    );
}