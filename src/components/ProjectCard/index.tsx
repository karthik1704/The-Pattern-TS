import { FC, ReactElement } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const ProjectCard: FC = (): ReactElement => {
    return (
        <Card>
            <CardMedia />
            <CardContent>HI</CardContent>
            <CardActions></CardActions>
        </Card>
    );
};

export default ProjectCard;
