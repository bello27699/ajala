import PropTypes from 'prop-types';
// @mui
import { Grid, Paper, Typography,Avatar,Stack,Button } from '@mui/material';

ParticipantSummary.propTypes = {
    participant: PropTypes.object
}

export default function ParticipantSummary({participant}){
    return (
        <Paper>
            <Stack direction="row" container columns={12}>
                <Grid item md={2}>
                    <Avatar alt={participant.name ?? 'IM'}  src={participant.image}/>
                </Grid>
                <Grid item md={7}>
                    <Stack direction="column">
                        <Grid item>
                            <Typography>
                                {participant.name ?? 'Hassan Sulaiman'}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography>
                                `${participant.idNumber ?? '27750'}-${participant.department ?? 'ITD'}`
                            </Typography>
                        </Grid>
                    </Stack>
                </Grid>
                <Grid item md={3}>
                    <Button variant="contained">
                        <Typography>
                            Remove
                        </Typography>
                    </Button>
                </Grid>
            </Stack>
        </Paper>
    )
}