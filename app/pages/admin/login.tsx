import { FunctionComponent, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { authenticate } from 'services/api/authentication/auth-service';
import { useRouter } from 'next/router';

const Login: FunctionComponent = () => {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const login = () => {
    setSubmitting(true);
    return authenticate({ email, password })
      .then((res) => {
        setSubmitting(false);
        return router.push(`/admin/${res.sub}`);
      })
      .catch((err) => {
        setSubmitting(false);
        alert(err);
      });
  };

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
      <TextField type="text" placeholder="Enter email here" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ marginBottom: '20px' }} disabled={submitting} />
      <TextField type="password" placeholder="Enter password here" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ marginBottom: '30px' }} disabled={submitting} />
      {submitting ? (
        <LoadingButton loading variant="contained" sx={{ minHeight: '36.5px' }} />
      ) : (
        <Button variant="contained" onClick={login}>Log in</Button>
      )}
    </Box>
  );
};

export default Login;
