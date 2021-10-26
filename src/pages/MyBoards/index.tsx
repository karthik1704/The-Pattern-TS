import { FC, ReactElement } from 'react';

// MUI
import Typography from '@mui/material/Typography';

import { useGetBoardsQuery } from '../../features/myBoards/myBoardsApi';

const MyBoards: FC = (): ReactElement => {
    const { data, isLoading, isFetching } = useGetBoardsQuery();

    return (
        <>
            <Typography variant="h4">Myboards</Typography>
            {data &&
                data?.results?.map((board) => (
                    <p key={board.id}>{board.name}</p>
                ))}
        </>
    );
};

export default MyBoards;
