import Link from 'next/link';

const MenuElement = props => (
  <li>
    <Link href={props.path}><a>{props.linkName}</a></Link>
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
      <MenuElement path="/about" linkName="About" />
      <MenuElement path="/essays" linkName="Essays" />
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

export default Menu;
