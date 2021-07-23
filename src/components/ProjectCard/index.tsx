import { FC, ReactElement } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

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
