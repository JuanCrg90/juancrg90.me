import PropTypes from 'prop-types';
import PostImage from './post-image';
import PostTitle from './post-title';
import PublishedAt from './published-at';
// import ReadingTime from './reading-time';

const PostMeta = ({
  dateTime,
  date,
  postImage,
  title
}) => (
  <section className="post-meta">
    <PublishedAt dateTime={dateTime} date={date} />
    {postImage && <PostImage postImage={postImage} />}
    <PostTitle title={title} />
    <style jsx>
      {`
        .post-meta {
          margin: 0;
          text-align: center;
        }
      `}
    </style>
  </section>
);

PostMeta.propTypes = {
  dateTime: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  postImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default PostMeta;
