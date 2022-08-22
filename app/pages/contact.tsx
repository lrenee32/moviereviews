import { FunctionComponent, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Nav } from 'components';
import containerStyles from 'assets/styles/content-section.module.scss';
import contactStyles from 'assets/styles/contact.module.scss';

const Contact: FunctionComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const submitMessage = () => {
    const body = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };

    Object.values(body).map((i, index) => {
      if (i === '') {
        console.log(Object.keys(body)[index]);
        errors[Object.keys(body)[index]] = true;
      }
    });
    setErrors({...errors});

    if (errors.length > 0) {
      return;
    }

  };

  return (
    <Box className={containerStyles['wrapper']}>
      <Container maxWidth="lg" className={containerStyles['container']}>
        <Nav style="large" />
        <Typography variant="h2" className={contactStyles['header']}>Contact Us</Typography>
        <Box component="form" className={contactStyles['form-container']}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <TextField label="Message" value={message} onChange={(e) => setMessage(e.target.value)} rows={8} required multiline />
          <Button variant="contained" onClick={submitMessage}>Submit</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
