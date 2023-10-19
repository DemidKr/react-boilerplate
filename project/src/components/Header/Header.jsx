import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LogoutButton from './../LogoutButton';
import Button from '@mui/material/Button';
import {Avatar, Typography} from '@mui/material';
import { styled } from '@mui/material';
import api from '../../shared/service/axios/axiosClient';
import User from './assets/user.png';
import {useAuth} from "../../shared/hooks/useAuth";

const Team = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const Header = ({ onClick }) => {
  const { pathname } = useLocation();
  const tasksLoc = pathname === '/tasks';
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);

  const { isAuth, user} = useAuth()

  useEffect(() => {
    fetch(user?.avatar).then(res => {
      setIsValid(res.status === 200);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: 8 }}>
      {tasksLoc && <Button variant="contained" onClick={onClick}>Создать тест</Button>}
      {isAuth && !loading && (
        <>
          <Team style={{ marginLeft: 'auto' }}>{user.username}</Team>
          {isValid
              ? <Avatar src={user?.avatar} sx={{mr: '10px', ml: '10px'}}/>
              : <Avatar sx={{mr: '10px', ml: '10px'}}>{user.username.charAt(0).toUpperCase()}</Avatar>
          }
        </>
      )}
      <LogoutButton />
    </div>
  );
};

export default Header;
