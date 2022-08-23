import { FunctionComponent } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Nav } from 'components';
import { Footer } from 'components/shared/nav/footer';
import { ReadOnly } from 'components/shared/wysiwyg/ReadOnly';
import containerStyles from 'assets/styles/content-section.module.scss';
import privacyStyles from 'assets/styles/privacy.module.scss';
import body from 'utils/privacy-policy.json';
import { Descendant } from 'slate';

const Privacy: FunctionComponent = () => {
  return (
    <Box className={containerStyles['wrapper']}>
      <Container maxWidth="lg" className={containerStyles['container']}>
        <Nav style="large" />
        <Typography variant="h2" className={privacyStyles['header']} id="back-to-top-anchor">Privacy Policy</Typography>
        <ReadOnly value={body as Descendant[]} />
        <Footer />
      </Container>
    </Box>
  );
};

export default Privacy;
