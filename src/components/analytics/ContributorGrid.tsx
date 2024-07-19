import { Card, Grid, GridCol, Group, Text } from "@mantine/core";
import axios from "axios";
import { ContributorSavingsTotal } from "../../functions/Computations";
import { useEffect, useState, useMemo } from "react";
import ContributionCard from "./ContributorCard";

export default function ContributorGrid() {
    const [contributors, setContributors] = useState<{ name: string}[]>([]);
    
    useEffect(() => {
        fetchContributors();
    }, []);

    const fetchContributors = () => {
        axios.get<string[]>('http://localhost:5000/contributors')
            .then(response => {
                const data = response.data.map(contributor => ({ name: contributor}));
                setContributors(data);
            })
            .catch(error => {
                console.error('Error fetching contributors:', error);
            });
    };


    console.log(contributors)
    
    return(
        <Card withBorder>
            <h3>Contributions by Contributor</h3>

            <Grid columns={3}>
                {contributors.map((contributor) => (
                    <GridCol span={1}>
                    <ContributionCard contributor={contributor.name.toString()} />
                    </GridCol>
                ))}
            </Grid>
        </Card>
    );
}
