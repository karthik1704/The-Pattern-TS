import { FC, ReactElement } from 'react';
import Warpper from '../../components/common/Wrapper';
import Coffee from '../../components/common/Coffee';

const Home: FC = (): ReactElement => {
    return (
        <div>
            <Warpper />
            <Coffee />
        </div>
    );
};

export default Home;
