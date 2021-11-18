import { FC, ReactElement, useState } from 'react';

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// Icon
import AddIcon from '@mui/icons-material/Add';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
// Router
import { Link } from 'react-router-dom';

// RTK
import { useGetBoardsQuery } from '../../features/myBoards/myBoardsApi';

// Components
import CreateBoardModal from '../../components/CreateBoardModal/CreateBoardModal';

const MyBoards: FC = (): ReactElement => {
    const [createBoardModalOpen, setCreateBoardModalOpen] = useState(false);
    const handleCreateBoardModalOpen = () => setCreateBoardModalOpen(true);
    const handleCreateBoardModalClose = () => setCreateBoardModalOpen(false);
    const { data, isLoading, isFetching } = useGetBoardsQuery();

    return (
        <>
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                    mt: 2,
                }}
            >
                <Typography variant="h4">Myboards</Typography>
                <Button
                    sx={{ display: { xs: 'none', sm: 'flex' } }}
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleCreateBoardModalOpen}
                >
                    New Board
                </Button>
                <IconButton
                    aria-label="create board"
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={handleCreateBoardModalOpen}
                >
                    <CreateNewFolderIcon />
                </IconButton>
            </Container>
            <Divider />
            <Container sx={{ mt: 2 }}>
                <Grid container spacing={2} sx={{ display: 'flex' }}>
                    {data &&
                        data?.results?.map((board) => (
                            <Grid key={board.id} item xs={8} sm={4} md={2}>
                                <Card sx={{ height: 300 }}>
                                    <CardActionArea
                                        sx={{ height: '100%' }}
                                        component={Link}
                                        to={board.slug}
                                    >
                                        <CardContent
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '100%',
                                                width: '100%',
                                            }}
                                        >
                                            <Typography variant="body1">
                                                {board.board_name}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                </Grid>
            </Container>
            <CreateBoardModal
                open={createBoardModalOpen}
                handleClose={handleCreateBoardModalClose}
            />
        </>
    );
};

export default MyBoards;
