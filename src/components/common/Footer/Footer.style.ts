import { createStyles, makeStyles, Theme } from "@material-ui/core";


export default makeStyles((theme:Theme)=>createStyles({
    root:{
        display: 'flex',
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(1),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    }
}));