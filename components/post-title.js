import PropTypes from 'prop-types';

const PostTitle = ({ title }) => (
  <h1>
    {title}
    <style jsx>
      {`
        h1 {
          text-align: center;
        }
      `}
    </style>
  </h1>
);

PostTitle.propTypes = {
  title: PropTypes.string
};

PostTitle.defaultProps = {
  title: 'Juan Carlos Ruiz - Software Engineer'
};

export default PostTitle;
