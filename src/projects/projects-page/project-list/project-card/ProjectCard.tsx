import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../../../Project';

interface Props {
  project: Project,
  onEdit: (project: Project) => void
}

export default function ProjectCard(props: Props) {
  const shortDescription = props.project.description.substring(0, 60) + '...';
  const handleEditClick = (project: Project) => props.onEdit(project);

  return (
    <div className='cols-sm'>
      <div className='card'>
        <img src={props.project.imageUrl} alt={props.project.name} />
        <section className='section dark'>
          <Link to={'/projects/' + props.project.id}>
            <h5 className='strong'>
              <strong>{props.project.name}</strong>
            </h5>
            <p>{shortDescription}</p>
            <p>Budget : {props.project.budget.toLocaleString()}</p>
          </Link>
          <button className='bordered' onClick={() => handleEditClick(props.project)}>
            <span className='icon-edit'></span>
            Edit
          </button>
        </section>
      </div>
    </div>
  )
}
