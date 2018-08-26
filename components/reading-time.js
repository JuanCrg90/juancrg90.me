import readingTime from 'reading-time';

function ReadingTime({ post }) {
  return (
    <span>
      {readingTime(post).text}
    </span>
  );
}

export default ReadingTime;
