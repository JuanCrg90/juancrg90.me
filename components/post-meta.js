import PostImage from './post-image';
import PostTitle from './post-title';
import PublishedAt from './published-at';
import ReadingTime from './reading-time';

const PostMeta = props => (
  <section className="post-meta">
    <PublishedAt dateTime={props.dateTime} date={props.date} />
    <span> ~ </span>
    <ReadingTime post={props.readingTime} />
    {props.postImage && <PostImage postImage={props.postImage} />}
    <PostTitle title={props.title} />
    <style jsx> {`
      .post-meta {
        margin: 0;
        text-align: center;
      }
    `} </style>
  </section>
);

export default PostMeta;
