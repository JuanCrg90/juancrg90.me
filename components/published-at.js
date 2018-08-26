import format from 'date-fns/format';
import isValid from 'date-fns/is_valid';

function PublishedAt({ dateTime, date }) {
  if (!isValid(date)) return null;
  return (
    <time className="publishedAt" dateTime={dateTime}>
      {format(date, 'MMMM DD, YYYY')}
      <style jsx>{`
        .publishedAt {
          display: inline-block;
        }
        .publishedAt {
          padding: 1em 0;
        }
      `}</style>
    </time>
  );
}

export default PublishedAt;
