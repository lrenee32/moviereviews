import { FunctionComponent, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Nav } from 'components';
import { submitMessage } from 'services/api/contact/contact-service';
import containerStyles from 'assets/styles/content-section.module.scss';
import contactStyles from 'assets/styles/contact.module.scss';

const Contact: FunctionComponent = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);

  const submit = () => {
    const body = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };

    Object.values(body).map((i, index) => {
      if (i === '') {
        errors.push(Object.keys(body)[index]);
      }
    });
    setErrors([...errors]);

    if (errors.length > 0) {
      return;
    }

    return submitMessage(body);
  };

  return (
    <Box className={containerStyles['wrapper']}>
      <Container maxWidth="lg" className={containerStyles['container']}>
        <Nav style="large" />
        <Typography variant="h2" className={contactStyles['header']}>Contact Us</Typography>
        <Box component="form" className={contactStyles['form-container']}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            error={errors.includes('name')}
            helperText={errors.includes('name') && 'Name is a required field'}
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={errors.includes('email')}
            helperText={errors.includes('email') && 'Email is a required field'}
          />
          <TextField
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={8}
            required
            multiline
            error={errors.includes('message')}
            helperText={errors.includes('message') && 'Message is a required field'}
          />
          <Button variant="contained" onClick={submit}>Submit</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
