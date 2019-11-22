import Link from 'next/link';
import PropTypes from 'prop-types';

const MenuElement = ({ href, linkName }) => (
  <li>
    <Link href={href}>
      <a>{linkName}</a>
    </Link>
    <style jsx>
      {`
        li {
          padding: 1em;
        }

        a {
          color: #000;
          text-decoration: none;
        }
      `}
    </style>
  </li>
);

const Menu = () => (
  <nav>
    <ul>
      <MenuElement href="/" linkName="Home" />
      <MenuElement href="/essays" linkName="Essays" />
      <MenuElement href="/projects" linkName="Projects" />
    </ul>
    <style jsx>
      {`
        ul {
          display: flex;
          justify-content: center;
          list-style: none;
          text-align: center;
        }
      `}
    </style>
  </nav>
);

MenuElement.propTypes = {
  href: PropTypes.string.isRequired,
  linkName: PropTypes.string.isRequired
};

export default Menu;
