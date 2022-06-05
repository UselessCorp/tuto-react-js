import React, { SyntheticEvent, useState } from 'react';
import { Project } from '../../../Project';
import './ProjectForm.css';

interface Props {
  project: Project,
  onCancel: () => void,
  onSave: (project: Project) => void
}

export default function ProjectForm(props: Props) {
  const [updatedProject, setUpdatedProject] = useState(props.project);
  const handleCancelClick = () => props.onCancel();
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    props.onSave(updatedProject);
  };
  const handleChange = (event: any) => {
    const {name, type, value, checked} = event.target;
    const changeValue = {
      [name]: type === 'checkbox' ? checked : value
    }; 
    changeValue[name] = type === 'number' ? +changeValue[name] : changeValue[name];
    setUpdatedProject((p) => new Project({...p, ...changeValue}));
  };
  return (
    <form className='input-group vertical' onSubmit={handleSubmit}>
      <label htmlFor='name'>Project Name</label>
      <input
        type='text'
        name='name'
        placeholder='enter name'
        value={updatedProject.name}
        onChange={handleChange}
      />

      <label htmlFor='description'>Project Description</label>
      <textarea
        name='description'
        placeholder='enter description'
        value={updatedProject.description}
        onChange={handleChange}
      ></textarea>
      
      <label htmlFor='budget'>Project Budget</label>
      <input
        type='number'
        name='budget'
        placeholder='enter budget'
        value={updatedProject.budget}
        onChange={handleChange}
      />

      <label htmlFor='isActive'>Active?</label>
      <input
        type='checkbox'
        name='isActive'
        checked={updatedProject.isActive}
        onChange={handleChange}
      />

      <div className='input-group'>
        <button className='primary bordered medium'>Save</button>
        <span></span>
        <button type='button' className='bordered medium' onClick={handleCancelClick}>cancel</button>
      </div>
    </form>
  )
}
