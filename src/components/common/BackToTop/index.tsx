import { FC, ReactElement } from 'react';
import Fab from '@material-ui/core/Fab';
import ScrollTop from '../ScrollTop';
import  KeyboardArrowUp  from '@material-ui/icons/KeyboardArrowUp';


const BackToTop:FC = ():ReactElement=>{

    return (
        <ScrollTop>
            <Fab color="secondary" size="small" aria-label="scroll back to top">
                <KeyboardArrowUp />
            </Fab>
        </ScrollTop>
    )

}

export default BackToTop;