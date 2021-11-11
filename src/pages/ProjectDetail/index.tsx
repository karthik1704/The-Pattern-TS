import { FC, ReactElement } from 'react';

import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

const ProjectDetail: FC = (): ReactElement => {
    const { slug } = useParams();
    return <p>ProjectDetail- {slug}</p>;
};

export default ProjectDetail;
