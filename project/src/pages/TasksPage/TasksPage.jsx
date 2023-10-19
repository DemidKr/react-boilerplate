import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalCustom from '../../components/Modal/Modal';
import Button from '@mui/material/Button';
import TaskCard from '../../components/TaskCard';
import api from '../../shared/service/axios/axiosClient';
import Typography from '@mui/material/Typography';

import Loading from '../../components/Loading';
import { noData } from './tasksPage.model';
import Header from '../../components/Header/Header';

const TasksPage = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClick = (id) => {
    navigate(id);
  };

  const GetTasks = () => {
    api
      .get('/tasks', {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZTIyZjU1ZS0zZjFiLTQ0YzctODdkNi1hYjE0OGQ5ODM0MmYiLCJ1c2VybmFtZSI6InRlYW0wIiwiaWF0IjoxNjk3NjIxNTg3LCJleHAiOjE2OTc3MDc5ODd9.fofkVpMGEm0awjsOLTam7gDOx0BJS1nfi4iBvkD-3sg',
        },
      })
      .then((res) => setTasks(res))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    GetTasks();
  }, []);

  console.log(tasks.data);

  return (
    <div>
      {loading && <Loading />}
      <Header onClick={handleOpen} />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        {(!tasks.data || tasks.data.length === 0) && (
          <Typography variant='h5' component='div'>
            {noData}
          </Typography>
        )}
        {tasks.data &&
          tasks.data.map((el) => {
            return (
              <TaskCard
                onClick={() => handleClick(el.uuid)}
                key={el._id}
                title={el.title}
                description={el.description}
              />
            );
          })}
      </div>
      <ModalCustom taskFoo={GetTasks} open={open} close={setOpen} />
    </div>
  );
};

export default TasksPage;
