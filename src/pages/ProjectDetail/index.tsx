import { FC, ReactElement } from 'react';

import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { Helmet } from 'react-helmet';
import { useGetProjectDetailQuery } from '../../features/projects/projectApiSlice';

const ProjectDetail: FC = (): ReactElement => {
    const { slug } = useParams();
    const {
        data: project,
        isLoading,
        isFetching,
    } = useGetProjectDetailQuery(slug!);
    return (
        <>
            <Helmet></Helmet>
            <Container>
                <Paper elevation={2}>
                    {project && (
                        <Box>
                            <img
                                src={project.image}
                                alt={project.project_name}
                            />
                            <Typography>{project.project_name}</Typography>
                            <Typography>
                                &copy; {project.copy_right} | {project.url}
                            </Typography>
                            <Divider />
                        </Box>
                    )}
                </Paper>
            </Container>
        </>
    );
};

export default ProjectDetail;
