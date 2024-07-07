import { Button, Center, Container, Grid, Modal, Progress, Text } from "@mantine/core";
import { IconCalendarClock, IconTrophy } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import GoalContributionCard from "./GoalContributionCard";
import axios from "axios";
import { Contribution } from "types/Contribution";

export default function GoalModal() {

    const [opened, setOpened] = useState(false);

    const [contributions, setContributions] = useState<Contribution[]>([]);

    useEffect(() => {
        fetchContributions();
    }, []);


    const fetchContributions = () => {
        axios.get<Contribution[]>('http://localhost:5000/contributions')
            .then(response => {
                setContributions(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the contributions!', error);
            });
    };

    return (
        <>
            <Button onClick={() => setOpened(true)} style={{ backgroundColor: '#707a82' }}>Open</Button>
            <Modal opened={opened} onClose={() => setOpened(false)} title="Wedding">

                <Text ta="center" fz="lg" >
                    $20,000 / 50,000 saved
                </Text>

                <Progress value={50}></Progress>

                

                <Text ta="center" fz="xs" c="dimmed">
                    20 weeks left
                </Text>

                {/* <Center><IconCalendarClock/> <Text>05/30/25</Text></Center> */}


                <Grid>
                {contributions.map((contribution) => (
                    <GoalContributionCard
                        key={contribution.contributionid}
                        contribution={contribution}
                    />
                ))}
                </Grid>

                    <Grid align="center">
                        <Button>Edit</Button>
                        <Button>Archive</Button>
                        <Button>Delete</Button>
                    </Grid>
            </Modal>
        </>
    );
}