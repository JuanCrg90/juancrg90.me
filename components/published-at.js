import format from 'date-fns/format';
import isValid from 'date-fns/is_valid';
import PropTypes from 'prop-types';

function PublishedAt({ dateTime, date }) {
  if (!isValid(date)) return null;
  return (
    <time className="publishedAt" dateTime={dateTime}>
      {format(date, 'MMMM DD, YYYY')}
      <style jsx>
        {`
          .publishedAt {
            font-size: 0.75em;
            display: block;
            padding: 1em 0;
          }
          @media (min-width: 720px) {
            .publishedAt {
              font-size: 1em;
              display: inline-block;
            }
          }
        `}
      </style>
    </time>
  );
}

PublishedAt.propTypes = {
  dateTime: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired
};

export default PublishedAt;
