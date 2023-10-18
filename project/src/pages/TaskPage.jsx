import React, {useEffect, useRef, useState} from 'react';
import api from "../shared/service/axios/axiosClient";
import Loading from "../components/Loading";
import {useAuth} from "../shared/hooks/useAuth";
import {Button, CircularProgress, Grid, Typography} from "@mui/material";
import CodeEditor from '@uiw/react-textarea-code-editor';

const TaskPage = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const socket = useRef()
    const [isConnected, setIsConnected] = useState(false);
    const [isOpponent, setIsOpponent] = useState(false)
    const [code, setCode] = useState('')
    const [opponentCode, setOpponentCode] = useState('')
    const {isLoading, isAuth, user} = useAuth()

    useEffect(() => {
        if(!isLoading) {
            //ToDo: get uuid from url param
            //temporary hardcoded
            api.get(`/tasks/9edcde33-9ac8-442c-a021-3e8582070561`, {headers: {'Authorization': `Bearer ${user.token}`}}).then((res) => {
            }).catch(function (error) {})
    }}, [isLoading])

    function connect() {
        socket.current = new WebSocket('ws://134.0.116.26:4442')

        socket.current.onopen = () => {
            setIsConnected(true)
            const message = {event: 'ready'}
            socket.current.send(JSON.stringify(message))
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            switch(message.event) {
                case 'connect':
                    setMessages(prev => [message, ...prev])
                    break
                case 'pair':
                    setIsOpponent(true)
                    break
                case 'ready':
                    break
                case 'pull':
                    setOpponentCode(message.data)
                    break
                default:
                    break
            }
        }
        socket.current.onclose= () => {
            console.log('Socket закрыт')
        }
        socket.current.onerror = () => {
            console.log('Socket произошла ошибка')
        }
    }

    const sendMessage = async () => {
        const message = {
            event: 'push',
            data: value
        }
        socket.current.send(JSON.stringify(message));
        setValue('')
    }

    const sendCode = (evn) => {
        setCode(evn.target.value)
        const message = {
            event: 'push',
            data: evn.target.value
        }
        socket.current.send(JSON.stringify(message));
    }


    const handleAttempt = async () => {
        const message = { event: 'attempt' }
        socket.current.send(JSON.stringify(message));
    }

    const handleWin = async () => {
        const message = { event: 'win' }
        socket.current.send(JSON.stringify(message));
    }

    const handleDecline = async () => {
        const message = { event: 'decline' }
        socket.current.send(JSON.stringify(message));
    }

    const handleDisconnect = async () => {
        socket.current.close()
        const message = { event: 'disconnect' }
        socket.current.send(JSON.stringify(message));
        setIsConnected(false)
        setIsOpponent(false)
    }


    if(isLoading) {
        return (
            <Loading/>
        )
    }

    if (!isOpponent) {
        return (
            <Grid
                container
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '16px',
                    width: '100%',
                    height: '100vh',
                }}
            >

                <Button variant="contained" size="large" onClick={connect} disabled={isConnected}>
                    Присоединиться
                </Button>
                {isConnected && <CircularProgress />}
                {isConnected && <Typography component="div" variant="h6">Ждем подключение второго пользователя</Typography>}
            </Grid>
        )
    }


    return (
        <div>
            <div>
                <div className="form">
                    <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
                    <button onClick={sendMessage}>Отправить</button>
                    <button onClick={handleAttempt}>Attempt</button>
                    <button onClick={handleWin}>Win</button>
                    <button onClick={handleDecline}>Decline</button>
                    <button onClick={handleDisconnect}>Disconnect</button>
                </div>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{minHeight: '500px'}}>
                    <Grid item xs={6}>
                        <CodeEditor
                            value={code}
                            language="js"
                            placeholder="Ваш код"
                            onChange={(evn) => sendCode(evn)}
                            padding={15}
                            style={{
                                fontSize: 12,
                                backgroundColor: "#f5f5f5",
                                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                                minHeight: '500px'
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <CodeEditor
                            value={opponentCode}
                            language="js"
                            placeholder="Код оппонента"
                            disabled={true}
                            padding={15}
                            style={{
                                fontSize: 12,
                                backgroundColor: "#f5f5f5",
                                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                                minHeight: '500px'
                            }}
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default TaskPage;