import { FC, ReactElement, useState } from 'react';

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
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';

import { useGetBoardDetailQuery } from '../../features/myBoards/myBoardsApi';

import DeleteBoard from '../../components/DeleteBoard/DeleteBoard';

import Helmet from 'react-helmet';
import { APP_NAME } from '../../constants/base';

const MyBoardDetail: FC = (): ReactElement => {
    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

    const { slug } = useParams();
    const { data: board, isFetching } = useGetBoardDetailQuery(slug!);

    const handleDeleteAlertOpen = () => {
        setDeleteAlertOpen(true);
    };

    const handleDeleteAlertClose = () => {
        setDeleteAlertOpen(false);
    };

    return (
        <>
            <Helmet>
                <title>
                    {slug} Detail - {APP_NAME}
                </title>
            </Helmet>
            <Box>
                {board && (
                    <>
                        <Container
                            sx={{
                                display: { md: 'flex' },
                                justifyContent: 'space-between',

                                mb: 1,
                                mt: 2,
                            }}
                        >
                            <Box>
                                <Typography variant="h4">
                                    {board.board_name}
                                </Typography>
                                <Typography variant="subtitle2">
                                    Created on{' '}
                                    {new Date(board.created_at).toString()}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: {
                                        xs: 'flex',
                                    },
                                    justifyContent: { xs: 'space-between' },
                                    mt: {
                                        xs: 2,
                                    },
                                }}
                            >
                                <IconButton aria-label="Edit Board">
                                    <EditIcon />
                                </IconButton>

                                <IconButton aria-label="Download Board">
                                    <DownloadIcon />
                                </IconButton>
                                <IconButton aria-label="Share Board">
                                    <ShareIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="Delete Board"
                                    onClick={handleDeleteAlertOpen}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Container>
                        <Divider />
                        <Container sx={{ mt: 2 }}>
                            <Grid
                                container
                                spacing={2}
                                sx={{ display: 'flex' }}
                            >
                                {board.board_items.length > 0 ? (
                                    board?.board_items?.map((board) => (
                                        <Grid
                                            key={board.id}
                                            item
                                            xs={8}
                                            sm={4}
                                            md={2}
                                        >
                                            <Card sx={{ height: 300 }}>
                                                <CardActionArea
                                                    sx={{ height: '100%' }}
                                                >
                                                    <CardContent
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            justifyContent:
                                                                'center',
                                                            height: '100%',
                                                            width: '100%',
                                                        }}
                                                    ></CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    ))
                                ) : (
                                    <Box>
                                        <Typography>
                                            Your Board is empty
                                        </Typography>
                                    </Box>
                                )}
                            </Grid>
                        </Container>
                    </>
                )}
            </Box>
            <DeleteBoard
                open={deleteAlertOpen}
                handleClose={handleDeleteAlertClose}
                slug={slug}
            />
        </>
    );
};

export default MyBoardDetail;
