import { FC, ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import { styled } from '@mui/material/styles';

// Emotion Styled Components
const RootDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    backgroundColor: '#E6EFFF',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}));

// React Code

const Coffee: FC = (): ReactElement => {
    return (
        <RootDiv>
            <Container maxWidth="lg">
                <Typography variant="body2">
                    We spend more time to give a quality content & our pocket
                    money for project expenses such as website & server hosting.
                </Typography>
                <Link
                    color="primary"
                    underline="none"
                    component={RouterLink}
                    to="/donate"
                >
                    <LocalCafeIcon fontSize="small" /> Buy me a coffee
                </Link>
            </Container>
        </RootDiv>
    );
};

export default Coffee;
