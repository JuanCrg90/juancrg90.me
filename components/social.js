import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faLinkedin, faGithub, faInstagram, faCodepen } from '@fortawesome/free-brands-svg-icons'

const SocialLink =(props) =>(
  <li>
    <a href={props.href}><FontAwesomeIcon icon={props.icon} /></a>
    <style jsx>
      {`
        li {
          padding: 0.5em;
          font-size: 1.5em;
        }

        a {
          color: #000;
          text-decoration: none;
        }
      `}
      </style>
  </li>
);

const Social = () => (
  <article id="social">
    <ul>
      <SocialLink href="https://twitter.com/JuanCrg90" icon={faTwitter} />
      <SocialLink href="https://www.linkedin.com/in/JuanCrg90/" icon={faLinkedin} />
      <SocialLink href="https://github.com/JuanCrg90" icon={faGithub} />
      <SocialLink href="https://www.instagram.com/juancrg90/" icon={faInstagram} />
      <SocialLink href="https://codepen.io/JuanCrg90/" icon={faCodepen} />
      <SocialLink href="mailto:JuanCrg90@gmail.com" icon={faEnvelope} />
    </ul>
    <style jsx>
      {`
        ul {
          display: flex;
          justify-content: center;
          list-style: none;
          margin-top: 0;
          text-align: center;
        }
      `}
    </style>
  </article>
);

export default Social;
