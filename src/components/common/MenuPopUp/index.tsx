import { FC, ReactElement } from 'react';
import Menu, { MenuProps } from '@mui/material/Menu';

interface Props extends MenuProps {
    children: ReactElement[];
}


const MenuPopUp:FC<Props> = ({id,anchorEl , onClose, open, children}):ReactElement=>{


    return (
        <Menu
        id = {id}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(open)}
        onClose={onClose}
        
        >
            {children}

        </Menu>
    )

}


export default MenuPopUp;

