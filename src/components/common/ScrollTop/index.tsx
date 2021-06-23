import { FC,ReactElement, MouseEvent } from "react";
import  useScrollTrigger  from "@material-ui/core/useScrollTrigger";
import  Zoom  from "@material-ui/core/Zoom";
import { makeStyles, Theme, createStyles } from "@material-ui/core";


interface Props{
    children: ReactElement;
}

const useStyles = makeStyles((theme:Theme)=> createStyles({
    root:{
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}),
);

const ScrollTop:FC<Props> = ({children}):ReactElement => {

    const classes  = useStyles();

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,

    })

    const handleClick = (event:MouseEvent<HTMLDivElement>)=>{
        const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
            '#back-to-top-anchor',
          );
      
          if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
    }

    return(
        <Zoom in={trigger}>
            <div onClick={handleClick} role='presentation' className={classes.root}>
                {children}
            </div>
        </Zoom>
    )

}

export default ScrollTop;