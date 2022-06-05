import React, { useEffect, useState } from 'react';
import { ErrorMessage } from '../../shared/error-message/ErrorMessage';
import { More } from '../../shared/more/More';
import { Spinner } from '../../shared/spinner/Spinner';
import { Project } from '../Project';
import { projectAPI } from '../projectAPI';
import ProjectList from './project-list/ProjectList';


export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
        const data = await projectAPI.get(currentPage);
        setError('');
        if (currentPage === 1) {
          setProjects(data);
        } else {
          setProjects((projects) => [...projects, ...data]);
        }
      } catch(e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, [currentPage]);

  const handleSave = async (project: Project) => {
    setLoading(true);
    try {
      const savedProject = await projectAPI.put(project);
      setError('');
      const newProjects = [...projects];
      newProjects.splice(newProjects.findIndex(p => p.id === savedProject.id), 1, savedProject);
      setProjects(newProjects);
    } catch(e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleMoreClick = () => setCurrentPage(currentPage + 1);

  return (
    <>
      {error && <ErrorMessage errorMessage={error}/>}
      <h1>Projects</h1>
      <ProjectList projects={projects} onSave={handleSave} />
      <More onClickMore={handleMoreClick}/>
      {loading && <Spinner/>}
    </>
  );
}
