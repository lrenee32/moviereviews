import { FunctionComponent } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Nav } from 'components';
import { Footer } from 'components/shared/nav/footer';
import { ContentCard } from './content-card';
import { Entries, Review } from 'utils/types';
import { toTitleCase } from 'utils/utils';
import styles from 'assets/styles/content-section.module.scss';
import typographyStyles from 'assets/styles/typography.module.scss';

interface Props {
  entries: Entries<Review>["All"],
  sectionName: string,
};

export const ContentSection: FunctionComponent<Props> = (props: Props) => {
  const { entries, sectionName } = props;

  return (
    <Box className={styles['wrapper']}>
      <Container maxWidth="lg" className={styles['container']}>
        <Nav style="large" />
        <Card id="back-to-top-anchor" key={`${entries[0].Title}-${entries[0].EntryId}-${sectionName}-headline`} className={styles['featured-card']}>
          <CardActionArea href={`/entry/${entries[0].EntryId}`} className={styles['action-area']}>
            <CardMedia
              component="img"
              image={entries[0].Details!.FeaturedImage}
              alt={`${entries[0].Title}-${entries[0].EntryId}-${sectionName}-headline-image`}
              className={styles['card-image']}
            />
            <Box className={styles['card-overlay']} />
            <CardContent className={styles['card-content']}>
              <Typography
                className={typographyStyles['styled-title']}
              >
                {toTitleCase(sectionName)}
              </Typography>
              <Typography variant="h2" className={styles['card-title']}>
                {entries[0].Title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Box className={styles['inner-container']}>
          {entries.slice(1, entries.length).map(entry => (
            <ContentCard key={`${entry.EntryId}-${sectionName}`} entry={entry} sectionName={sectionName} />
          ))}
        </Box>
        <Footer />
      </Container>
    </Box>
  );
};
