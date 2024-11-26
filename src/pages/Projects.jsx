import React, { useState, useEffect } from 'react';
import Flow from '../components/Flow'; // Убедитесь, что путь правильный
import { useKeycloak } from '@react-keycloak/web';

function ProjectsPage() {
    const [projectsData, setProjectsData] = useState([]);
    const { keycloak } = useKeycloak();
    const userId = keycloak.tokenParsed?.sub; // sub - это стандартное поле для идентификатора пользователя

    useEffect(() => {
        // Функция для получения данных проектов
        const fetchProjects = async () => {
        try {
            const response = await fetch(`http://${import.meta.env.VITE_CORE}:5000/api/flows?userId=${userId}`); // Замените на ваш реальный API эндпоинт
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data)
            setProjectsData(data.data);
        } catch (error) {
            console.error('Ошибка при получении данных проектов:', error);
        }
        };

        fetchProjects();
    }, []); // Пустой массив зависимостей означает, что эффект выполнится только при монтировании

    return (
        <div>
        <h2 style={{margin: 0}}>Страница "Projects"</h2>
            <div className="projects-list">
            {projectsData.length === 0 ? (
                <strong>This user has no flows. UserID: {userId}</strong>
                ) : (
                projectsData.map((project) => (
                    <Flow key={project._id} data={project} />
                ))
            )}
            </div>
        </div>
    );
}

export default ProjectsPage;