import { FunctionComponent, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      minHeight="30vh"
      width="40vw"
      margin="120px auto"
      component="form"
      noValidate
      autoComplete="off"
    >
      <Typography variant="h3" mb="30px">Log in</Typography>
      <TextField type="text" placeholder="Enter email here" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ marginBottom: '20px' }} />
      <TextField type="password" placeholder="Enter password here" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ marginBottom: '30px' }} />
      <Button variant="contained">Log in</Button>
    </Box>
  );
};

export default Login;
