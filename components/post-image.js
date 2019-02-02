import PropTypes from 'prop-types';

const PostImage = ({ postImage, title }) => (
  <img src={postImage} alt={title} />
);

PostImage.propTypes = {
  postImage: PropTypes.string,
  title: PropTypes.string
};

PostImage.defaultProps = {
  postImage: 'https://res.cloudinary.com/juancrg90/image/upload/v1548389081/juan_c_tjj7ix.png',
  title: 'Juan Carlos Ruiz'
};

export default PostImage;
