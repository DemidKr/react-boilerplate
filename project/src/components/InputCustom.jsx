import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function InputCustom({
  value,
  onChange,
  label = 'Текст',
  isCase,
  name,
}) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
    >
      <TextField
        value={value}
        onChange={isCase ? onChange : handleChange}
        id='outlined-basic'
        label={label}
        variant='outlined'
        name={name}
      />
    </Box>
  );
}
