import { Card, Grid, GridCol, Group, NumberFormatter, Text } from "@mantine/core";
import { ContributorSavingsTotal, ContributorSavingsCount } from "../../functions/Computations"
import { IconAbacus, IconReceipt2, IconReportMoney, IconTallymarks } from "@tabler/icons-react";

interface ContributorCardProps {
    contributor: string;
}

export default function ContributorCard({ contributor }: ContributorCardProps) {
    const numContributions = ContributorSavingsCount(contributor);
    const totalContributions = ContributorSavingsTotal(contributor);

    return (
        <Card withBorder>
            <Grid columns={1}>
                <GridCol>
                    <Text fw={700}>{contributor}</Text>
                </GridCol>
                <GridCol>
                    <Group>
                        <IconReceipt2 />
                        <Text>
                            {'Total: '}
                            <NumberFormatter decimalScale={2} prefix="$" value={totalContributions} thousandSeparator />
                        </Text>
                    </Group>
                </GridCol>
                <Group>
                    <IconAbacus />
                    <Text>
                        {'Count: '} {numContributions}
                    </Text>
                </Group>
                <GridCol>

                </GridCol>
            </Grid>
        </Card>
    );
}