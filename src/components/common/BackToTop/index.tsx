import { FC, ReactElement } from 'react';
import Fab from '@mui/material/Fab';
import ScrollTop from '../ScrollTop';
import  KeyboardArrowUp  from '@mui/icons-material/KeyboardArrowUp';


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