import MainLayout from '../layouts/main';

const MagmaLabs = () => (
  <div>
    <a href="https://www.magmalabs.io/" target="_blank" rel="noopener noreferrer" alt="MagmaLabs site">
      <img className="logo-magma" src={require('../images/logo_magma.svg')} alt="MagmaLabs logo" />
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

const Index = () => (
  <MainLayout>
    <header>
      <h1>Juan Carlos Ruiz</h1>
      <h2>Software Engineer at <MagmaLabs /> | Geek | Maker |Oompa Loompa 24/7 | Just a Dreamer</h2>
    </header>
    <style jsx>
      {`
        h1, h2 {
          font-weight: 200;
        }
        header {
          display: flex;
          text-align: center;
          flex-direction: column;
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
          right: 0;
        }
      `}
    </style>
  </MainLayout>
);

export default Index;
