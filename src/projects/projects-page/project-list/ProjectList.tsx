import React from 'react';
import { Project } from '../../Project';
import ProjectForm from './project-form/ProjectForm';
import ProjectCard from './project-card/ProjectCard';

interface Props {
  projects: Project[],
  onSave: (project: Project) => void
}

export default function ProjectList(props: Props) {
  const [projectInEdition, setProjectInEdition] = React.useState({});
  const handleEdit = (project: Project) => setProjectInEdition(project);
  const handleCancel = () => setProjectInEdition({});
  const handleSave = (project: Project) => {
    props.onSave(project)
  };

  const projectsTemplate = props.projects.map(project => (
    <div key={project.id}>{
      projectInEdition === project ?
        <ProjectForm project={project} onCancel={handleCancel} onSave={handleSave} /> :
        <ProjectCard project={project} onEdit={handleEdit} />
    }</div>
  ));
  return <div className='row'>{projectsTemplate}</div>;
}
