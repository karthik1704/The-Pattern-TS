import { FC, ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import LocalCafeIcon from '@material-ui/icons/LocalCafe';

import useStyles from './Coffee.styles';

const Coffee: FC = (): ReactElement => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
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
        </div>
    );
};

export default Coffee;
