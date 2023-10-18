import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LogoutButton from './../LogoutButton';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { styled } from '@mui/material';
import api from '../../shared/service/axios/axiosClient';
import User from './assets/user.png';

const Team = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const Header = ({ onClick }) => {
  const { pathname } = useLocation();
  const tasksLoc = pathname === '/tasks';

  const [user, setUser] = useState();

  useEffect(() => {
    api
      .get('/auth/user', {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZTIyZjU1ZS0zZjFiLTQ0YzctODdkNi1hYjE0OGQ5ODM0MmYiLCJ1c2VybmFtZSI6InRlYW0wIiwiaWF0IjoxNjk3NjIxNTg3LCJleHAiOjE2OTc3MDc5ODd9.fofkVpMGEm0awjsOLTam7gDOx0BJS1nfi4iBvkD-3sg',
        },
      })
      .then((res) => setUser(res.data));
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: 8 }}>
      {tasksLoc && <Button onClick={onClick}>Создать тест</Button>}
      {user && (
        <>
          <Team style={{ marginLeft: 'auto' }}>{user.username}</Team>
          <img
            style={{ width: 20, height: 22, marginRight: 21 }}
            src={User}
            alt='logo'
          />
        </>
      )}
      <LogoutButton />
    </div>
  );
};

export default Header;
