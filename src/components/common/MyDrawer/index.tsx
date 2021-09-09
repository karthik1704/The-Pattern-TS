import { FC, ReactElement } from 'react';

import Drawer, { DrawerProps } from '@mui/material/Drawer';

interface Props extends DrawerProps {
    anchor: 'right' | 'left';
    onClose: (open: boolean) => void;
    clickAway: ()=>void,
    children?: ReactElement;
}

const MyDrawer: FC<Props> = ({
    anchor,
    open,
    onClose,
    children,
    clickAway,
}): ReactElement => {
    return (
            <Drawer anchor={anchor} onClose={onClose} open={open} onBackdropClick={clickAway}>
                {children}
            </Drawer>
    );
};

export default MyDrawer;
