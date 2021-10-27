import { FC, ReactElement, useState } from 'react';

// MUI
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// Icon
import AddIcon from '@mui/icons-material/Add';

import { useGetBoardsQuery } from '../../features/myBoards/myBoardsApi';
import CreateBoardModal from '../../components/CreateBoardModal/CreateBoardModal';

const MyBoards: FC = (): ReactElement => {
    const [createBoardModalOpen, setCreateBoardModalOpen] = useState(false);
    const handleCreateBoardModalOpen = () => setCreateBoardModalOpen(true);
    const handleCreateBoardModalClose = () => setCreateBoardModalOpen(false);
    const { data, isLoading, isFetching } = useGetBoardsQuery();

    return (
        <>
            <Typography variant="h4">Myboards</Typography>
            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleCreateBoardModalOpen}
            >
                New Board
            </Button>
            <Divider />
            {data &&
                data?.results?.map((board) => (
                    <Card key={board.slug} sx={{ maxWidth: 250 }}>
                        <CardContent
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {board.name}
                        </CardContent>
                    </Card>
                ))}
            <CreateBoardModal
                open={createBoardModalOpen}
                handleClose={handleCreateBoardModalClose}
            />
        </>
    );
};

export default MyBoards;
