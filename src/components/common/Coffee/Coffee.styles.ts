import { createStyles, makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            backgroundColor: '#E6EFFF',
            textAlign: 'center',
            [theme.breakpoints.up('md')]: {
                paddingTop: theme.spacing(1),
                paddingBottom: theme.spacing(1),
            },
        },
    })
);
