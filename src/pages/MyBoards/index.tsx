import { FC, ReactElement } from 'react';

// MUI
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { useGetBoardsQuery } from '../../features/myBoards/myBoardsApi';

const MyBoards: FC = (): ReactElement => {
    const { data, isLoading, isFetching } = useGetBoardsQuery();

    return (
        <>
            <Typography variant="h4">Myboards</Typography>
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
        </>
    );
};

export default MyBoards;
