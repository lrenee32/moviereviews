import { FunctionComponent, Dispatch, SetStateAction } from 'react';
import Image from 'next/future/image';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
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
  fetchMore: Dispatch<SetStateAction<boolean>>,
  fetching: boolean,
};

export const ContentSection: FunctionComponent<Props> = (props: Props) => {
  const { entries, sectionName, fetching, fetchMore } = props;

  const renderButton = () => {
    const styles = {
      mt: '30px',
    };

    return (
      fetching ? (
        <LoadingButton variant="contained" loading sx={{ minHeight: '36.5px', ...styles }} />
      ) : (
        <Button variant="outlined" onClick={() => fetchMore(true)} sx={styles}>Load More</Button>
      )
    );
  };

  return (
    <Box className={styles['wrapper']}>
      <Container maxWidth="lg" className={styles['container']}>
        <Nav style="large" />
        <Card id="back-to-top-anchor" key={`${entries.data[0].Title}-${entries.data[0].PK}-${sectionName}-headline`} className={styles['featured-card']}>
          <CardActionArea href={`/entry/${entries.data[0].PK}`} className={styles['action-area']}>
            <Box className={styles['card-image-container']}>
              <Box className={styles['card-image-container-fill']} />
              <Image
                src={entries.data[0].Details!.FeaturedImage as unknown as string}
                alt={`${entries.data[0].Title}-${entries.data[0].PK}-${sectionName}-headline-image`}
                fill
                className={styles['card-image']}
              />
              <Box className={styles['card-overlay']} />
            </Box>
            <CardContent className={styles['card-content']}>
              <Typography
                className={typographyStyles['styled-title']}
              >
                {toTitleCase(sectionName)}
              </Typography>
              <Typography variant="h2" className={styles['card-title']}>
                {entries.data[0].Title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Box className={styles['inner-container']}>
          {entries.data.slice(1, entries.data.length).map(entry => (
            <ContentCard key={`${entry.PK}-${sectionName}`} entry={entry} sectionName={sectionName} />
          ))}
          {entries && entries.next && renderButton()}
        </Box>
        <Footer />
      </Container>
    </Box>
  );
};
