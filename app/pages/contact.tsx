import { FunctionComponent, useState } from 'react';
import Head from 'next/head';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { Nav } from 'components';
import { Footer } from 'components/shared/nav/footer';
import { submitMessage } from 'services/api/contact/contact-service';
import containerStyles from 'assets/styles/content-section.module.scss';
import contactStyles from 'assets/styles/contact.module.scss';

const Contact: FunctionComponent = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const submit = () => {
    let errArr: string[] = [];
    setErrors([]);
    setSubmitting(true);

    const body = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };

    Object.values(body).map((i, index) => {
      if (i === '') {
        errArr.push(Object.keys(body)[index]);
      }
    });
    setErrors(errArr);

    if (errArr.length > 0) {
      setSubmitting(false);
      return;
    }

    return submitMessage(body)
      .then(() => {
        setSubmitting(false);
        setSubmitted(true);
      })
      .catch(() => {
        setSubmitting(false);
        alert('An error occurred while submitting your message. Please try again.');
      });
  };

  return (
    <>
      <Head>
        <title>Splatter & Scream - Contact Us</title>
        <meta name="description" content="News, reviews and videos on the latest and greatest horror media. Horror media reviews by horror fans." />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        <meta property="og:url" content="https://splatterandscream.com/contact" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Splatter & Scream - Contact Us" />
        <meta
          property="og:description"
          content="News, reviews and videos on the latest and greatest horror media. Horror media reviews by horror fans."
        />
        <meta property="og:image" content="https://splatterandscream.com/images/site-logo-main.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://splatterandscream.com/contact" />
        <meta name="twitter:title" content="Splatter & Scream - Contact Us" />
        <meta name="twitter:description" content="News, reviews and videos on the latest and greatest horror media. Horror media reviews by horror fans." />
        <meta name="twitter:image" content="https://splatterandscream.com/images/site-logo-main.png" />
        <meta name="twitter:site" content="@splatternscream" />
      </Head>
      <Box className={containerStyles['wrapper']}>
        <Container maxWidth="lg" className={containerStyles['container']}>
          <Nav style="large" />
          <Typography variant="h2" className={contactStyles['header']} id="back-to-top-anchor">Contact Us</Typography>
          
          {submitted ? (
            <Typography className={contactStyles['subheader']}>Thank you for reaching out to us!  Your message has been successfully received.</Typography>
          ) : (
            <>
              <Typography className={contactStyles['subheader']}>For all inquiries please use the form below:</Typography>
              <Box component="form" className={contactStyles['form-container']}>
                <TextField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  error={errors.includes('name')}
                  helperText={errors.includes('name') && 'Name is a required field'}
                  disabled={submitting}
                />
                <TextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  error={errors.includes('email')}
                  helperText={errors.includes('email') && 'Email is a required field'}
                  disabled={submitting}
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
                  disabled={submitting}
                />
                {submitting ? (
                  <LoadingButton loading variant="contained" sx={{ minHeight: '36.5px' }} />
                ) : (
                  <Button variant="contained" onClick={submit}>Submit</Button>
                )}
              </Box>
            </>
          )}
          <Footer />
        </Container>
      </Box>
    </>
  );
};

export default Contact;
