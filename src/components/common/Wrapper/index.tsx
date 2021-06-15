import { FC, ReactElement } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import banner from '../../../assets/images/banner.jpg';

const slideImages = [banner];

const Warpper: FC = (): ReactElement => {
    return (
        <div className="slide-container">
            <Slide>
                {slideImages.map((item, idx) => (
                    <div className="each-slide" key={idx}>
                        <div
                            style={{
                                backgroundImage: `url(${item})`,
                                width: '100vw',
                                height: '266px',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }}
                            
                        >
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    );
};

export default Warpper;
