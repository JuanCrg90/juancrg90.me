import PropTypes from 'prop-types';
import Link from 'next/link';
import MainLayout from '../layouts/main';
import PublishedAt from '../components/published-at';

const essays2019 = [
  {
    source: 'MagmaLabs',
    sourceUrl: 'http://magmalabs.io',
    title: 'Customizing Solidus order number generation',
    slug:
      'http://blog.magmalabs.io/2019/08/05/customizing-solidus-order-number-generation.html',
    date: '2019-08-05'
  },
  {
    source: 'self',
    sourceUrl: '/',
    title: 'vpr a CLI to visit quickly GitHub project sections',
    slug: 'vpr-a-cli-to-visit-quickly-github-project-sections',
    date: '2019-07-12T00:00'
  },
  {
    source: 'MagmaLabs',
    sourceUrl: 'http://magmalabs.io',
    title: ' Automate all the things!',
    slug:
      'http://blog.magmalabs.io/2019/03/26/automate-all-the-things.html',
    date: '2019-03-26'
  },
  {
    source: 'self',
    sourceUrl: '/',
    title: 'Encapsulating a C library using Ruby ffi',
    slug: 'learning-ruby-ffi',
    date: '2019-01-20T00:00'
  }
];

const essays2018 = [
  {
    source: 'self',
    sourceUrl: '/',
    title: 'Bye bye 2018',
    slug: 'bye-bye-2018',
    date: '2018-12-31T23:59'
  },
  {
    source: 'self',
    sourceUrl: '/',
    title: 'Compilando para el navegador con WebAssembly',
    slug: 'compilando-para-el-navegador-con-webassembly',
    date: '2018-04-28T22:04'
  },
  {
    source: 'MagmaLabs',
    sourceUrl: 'http://magmalabs.io',
    title: 'Adding Docker to your Rails workflow',
    slug:
      'http://blog.magmalabs.io/2018/04/24/adding-docker-rails-workflow.html',
    date: '2018-04-24'
  },
  {
    source: 'MagmaLabs',
    sourceUrl: 'http://magmalabs.io',
    title: 'Generating documentation with Rspec Rails Swagger',
    slug:
      'http://blog.magmalabs.io/2018/03/27/generating-documentation-rspec-rails-swagger.html',
    date: '2018-03-27'
  }
];

const essays2016 = [
  {
    source: 'self',
    sourceUrl: '/',
    title: 'Unificando estilos de programación con EditorConfig',
    slug: 'unificando-estilos-de-programacion-con-editorconfig-2',
    date: '2016-10-30T08:10'
  }
];

const essays2015 = [
  {
    source: 'self',
    sourceUrl: '/',
    title: 'Y se fue el 2015',
    slug: 'y-si-fue-el-2015',
    date: '2015-12-31T23:12'
  },
  {
    source: 'self',
    sourceUrl: '/',
    title: '6 Meses usando Vim',
    slug: '6-meses-programando-en-vim',
    date: '2015-12-26T23:12'
  },
  {
    source: 'self',
    sourceUrl: '/',
    title: 'Mi primer experiencia MagmaConf',
    slug: 'mi-primer-experiencia-magmaconf',
    date: '2015-06-22T14:06'
  },
  {
    source: 'self',
    sourceUrl: '/',
    title: 'Emprendimiento 101: ¿Quién es tu cliente?',
    slug: 'emprendimiento-101-quien-es-tu-cliente',
    date: '2015-01-11T07:01'
  }
];
const essays2014 = [
  {
    source: 'self',
    sourceUrl: '/',
    title: 'Un año que termina',
    slug: 'un-ano-que-termina',
    date: '2014-12-31T21:12'
  },
  {
    source: 'self',
    sourceUrl: '/',
    title: 'Meteor un framework de JavaScript para el 2015',
    slug: 'meteor-un-framework-de-javascript-para-el-2015',
    date: '2014-12-29T06:12'
  },
  {
    source: 'self',
    sourceUrl: '/',
    title: 'Hola Mundo',
    slug: 'hola-mundo',
    date: '2014-11-15T19:11'
  }
];

function Essay({ essay }) {
  const renderLink = () => {
    if (essay.slug.includes('http')) {
      return (
        <a href={essay.slug} target="_blank" rel="noopener noreferrer">
          {essay.title}
        </a>
      );
    }
    return (
      <Link href={`${essay.slug}`}>
        <a>{essay.title}</a>
      </Link>
    );
  };

  return (
    <article>
      <PublishedAt datetime={essay.date} date={new Date(essay.date)} />
      {renderLink(essay)}
      <small>
        <a className="source" href={essay.sourceUrl}>
          [{essay.source}]
        </a>
      </small>
      <style jsx global>
        {`
          a {
            color: #000;
            text-decoration: none;
          }

          a:hover {
            text-decoration: underline;
          }
          @media (min-width: 720px) {
            .publishedAt {
              margin-right: 1em;
            }
          }
        `}
      </style>
      <style jsx>
        {`
          .source {
            margin-left: 0.5em;
          }
        `}
      </style>
    </article>
  );
}

const Essays = () => (
  <MainLayout>
    <section>
      <h1>2019</h1>
      {essays2019.map(essay => (
        <Essay key={essay.slug} essay={essay} />
      ))}

      <h1>2018</h1>
      {essays2018.map(essay => (
        <Essay key={essay.slug} essay={essay} />
      ))}

      <h1>2016</h1>
      {essays2016.map(essay => (
        <Essay key={essay.slug} essay={essay} />
      ))}

      <h1>2015</h1>
      {essays2015.map(essay => (
        <Essay key={essay.slug} essay={essay} />
      ))}

      <h1>2014</h1>
      {essays2014.map(essay => (
        <Essay key={essay.slug} essay={essay} />
      ))}
    </section>
    <style jsx>
      {`
        section {
          margin: 0.5em;
        }
        @media (min-width: 720px) {
          section {
            margin: 1em;
            margin: 0 10vh;
          }
        }
      `}
    </style>
  </MainLayout>
);

Essay.propTypes = {
  essay: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    sourceUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  }).isRequired
};

export default Essays;
