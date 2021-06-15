import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';

export default makeStyles((theme:Theme)=>createStyles({

    avatar:{
        display:'flex',
        //alignItems: 'center',
        flexDirection: 'column',
        '&>*':{
            margin: theme.spacing(1),
        }
    }
}))