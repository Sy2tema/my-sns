import PropTypes from "prop-types";

const PostImages = ({ images }) => {
    return (
        <div>PostImages</div>
    );
};

PostImages.propTypes = {
    images: PropTypes.arrayOf(PostImages.object),
};

export default PostImages;