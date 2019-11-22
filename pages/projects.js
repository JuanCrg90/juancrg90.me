import PropTypes from 'prop-types';
import MainLayout from '../layouts/main';

const projects = [
  {
    title: 'vpr',
    description: 'A CLI to visit quickly github project sections',
    href: 'https://github.com/JuanCrg90/vpr'
  }
];

function Project({ project }) {
  return (
    <article>
      <a href={project.href}><h2>{project.title}</h2></a>
      <p>{project.description}</p>
      <style jsx>
        {`
          article {
            border: solid 1px;
            padding 0 1em;
          }
          a {
            color: #000;
            text-decoration: none;
          }

        `}
      </style>
    </article>
  );
}

const Projects = () => (
  <MainLayout>
    <section>
      <h1>Projects</h1>
      {projects.map(project => (
        <Project key={project.title} project={project} />
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

Project.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
  }).isRequired

};

export default Projects;
