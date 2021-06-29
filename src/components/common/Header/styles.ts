import { makeStyles } from "@material-ui/core/styles";


export default makeStyles((theme)=>({

    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title:{
        flexGrow: 1,
        display: 'block',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
    },

    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]:{
            display: 'none',
        }
    },
    
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]:{
            display: 'flex',
        }
    },
    avatar:{
        margin: theme.spacing(1),
    }

}));