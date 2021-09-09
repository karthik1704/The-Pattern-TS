import { FC, ReactElement, MouseEvent } from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Zoom from '@mui/material/Zoom';
import { styled } from '@mui/material/styles';

// emotion styled component
const Div = styled('div')(({ theme }) => ({
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
}));

//old code

// const useStyles = makeStyles((theme) =>
//     createStyles({
//         root: {
//             position: 'fixed',
//             bottom: theme.spacing(2),
//             right: theme.spacing(2),
//         },
//     })
// );

// React Code
interface Props {
    children: ReactElement;
}

const ScrollTop: FC<Props> = ({ children }): ReactElement => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        const anchor = (
            (event.target as HTMLDivElement).ownerDocument || document
        ).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <Zoom in={trigger}>
            <Div onClick={handleClick} role="presentation">
                {children}
            </Div>
        </Zoom>
    );
};

export default ScrollTop;
