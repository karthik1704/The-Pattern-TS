import { FC, ReactElement } from "react";
import { APP_NAME } from "../../../constants/base";

import Typography from "@material-ui/core/Typography";

import useStyles from './Footer.style';

const Footer:FC = ():ReactElement => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div>
                <Typography variant="h6" noWrap >
                        {APP_NAME}
                </Typography>
            </div>

        </div>
    )
}

export default Footer;