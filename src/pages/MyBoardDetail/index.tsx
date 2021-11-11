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

import DeleteIcon from '@mui/icons-material/Delete';

import { useGetBoardDetailQuery } from '../../features/myBoards/myBoardsApi';

import Helmet from 'react-helmet';
import { APP_NAME } from '../../constants/base';

const MyBoardDetail: FC = (): ReactElement => {
    const { slug } = useParams();
    const { data: board, isFetching } = useGetBoardDetailQuery(slug!);

    return (
        <>
            <Helmet>
                <title>
                    {slug} Detail - {APP_NAME}
                </title>
            </Helmet>
            <Box>
                {board && (
                    <Container sx={{ justifyContent: 'space-between' }}>
                        <Typography variant="h4">{board.board_name}</Typography>
                    </Container>
                )}
            </Box>
        </>
    );
};

export default MyBoardDetail;
