import PropTypes from 'prop-types';
import { useState } from 'react';
import Slick from 'react-slick';
import { CloseBtn, Global, Header, ImgWrapper, Indecator, Overlay, SlickWrapper } from './styles';

interface ImagesZoomProps {
    images: ImageType[];
    onClose: () => void;
}

interface ImageType {
    src: string;
}


const ImagesZoom = ({ images, onClose }: ImagesZoomProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    return (
        <Overlay>
            <Global />
            <Header>
                <h1>상세 이미지</h1>
                <CloseBtn onClick={onClose}>X</CloseBtn>
            </Header>
            <SlickWrapper>
                <div>
                    <Slick
                        initialSlide={0}
                        afterChange={(slide) => setCurrentSlide(slide)}
                        infinite
                        arrows={false}
                        slidesToShow={1}
                        slidesToScroll={1}
                    >
                        {images.map((value) => (
                            <ImgWrapper key={value.src}>
                                <img src={`http://192.168.36.128:3065/${value.src}`} alt={value.src} />
                            </ImgWrapper>
                        ))}
                    </Slick>
                    <Indecator>
                        <div>
                            {currentSlide + 1}
                            {' '}
                            /
                            {' '}
                            {images.length}
                        </div>
                    </Indecator>
                </div>
            </SlickWrapper>
        </Overlay>
    );
};

ImagesZoom.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired,
}

export default ImagesZoom;