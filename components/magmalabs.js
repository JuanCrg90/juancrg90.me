const companyLogo = require('../images/logo_magma.svg');

const company = {
  logo: companyLogo,
  url: 'https://www.magmalabs.io/',
  altUrl: 'MagmaLabs site',
  altLogo: 'MagmaLabs logo'
};

const MagmaLabs = () => (
  <div>
    <a
      href={company.url}
      target="_blank"
      rel="noopener noreferrer"
      alt={company.altUrl}
    >
      <img className="logo-magma" src={company.logo} alt={company.altLogo} />
    </a>
    <style jsx>
      {`
        div {
          display: inline;
        }
        img {
          height: 1em;
        }
      `}
    </style>
  </div>
);

export default MagmaLabs;
