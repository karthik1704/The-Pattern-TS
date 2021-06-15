import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';

export default makeStyles((theme:Theme)=>createStyles({

    avatar:{
        display:'flex',
        '&>*':{
            margin: theme.spacing(1),
        }
    }
}))