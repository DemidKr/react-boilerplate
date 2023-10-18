import {useState} from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputCustom from './InputCustom';
import api from '../shared/service/axios/axiosClient';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Form() {
  const [taskCase, setTaskCase] = useState([{args: '', result: ''}]);

  const handleAddCase = () => {
    setTaskCase(prev => ([...prev, {args: '', result: ''}]))
  }

  const handleChangeTaskCaseArgs = (key, args) => {
    const copiedCases = [...taskCase];
    copiedCases[key].args = args;

    setTaskCase(copiedCases);
  }

  const handleChangeTaskCaseValue = (key, value) => {
    const copiedCases = [...taskCase];
    copiedCases[key].result = value;

    setTaskCase(copiedCases);
  }

  // console.log(taskCase);

  return <>
  {taskCase.map((taskCase, index) => (
    <>
      <input key={index} value={taskCase.args} onChange={handleChangeTaskCaseArgs(index, taskCase.args)} />
      <input key={index} value={taskCase.result} onChange={handleChangeTaskCaseValue(index, taskCase.result)} />
    </>
  ))}
  <button onClick={handleAddCase}>Add</button>
  </>
}

export default function ModalCustom({open, close}) {
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [value, setValue] = useState({});

const [count, setCount] = useState(1)

  const handleClose = () => close(false);
 
  const handleSubmit = (e) => {
    e.preventDefault()
    api.post('/tasks', {
    description: description,
    title: title}, {headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZTIyZjU1ZS0zZjFiLTQ0YzctODdkNi1hYjE0OGQ5ODM0MmYiLCJ1c2VybmFtZSI6InRlYW0wIiwiaWF0IjoxNjk3NjIxNTg3LCJleHAiOjE2OTc3MDc5ODd9.fofkVpMGEm0awjsOLTam7gDOx0BJS1nfi4iBvkD-3sg'
    }}).then(res => console.log(res))
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form style={{overflowY: 'auto', maxHeight: '500px'}} onSubmit={handleSubmit}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Создайте тест
            </Typography>
            <InputCustom value={title} onChange={setTitle}/>
            <InputCustom value={description} onChange={setDescription}/>
            {/* {Array.from(Array(count).keys()).map(el => (
<div style={{display: 'flex', marginBottom: 32}}>
              <InputCustom value={value.input} onChange={}/>
              <InputCustom value={value} onChange={setValue}/>
</div>
            ))} */}
<Form />
            <button type='button' onClick={() => setCount(prev => prev + 1)}>+</button>
            <Button  type='submit' variant="contained">Создать тест</Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

