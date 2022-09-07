import { FunctionComponent } from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import NoSsr from '@mui/material/NoSsr';
import { Entry, Review } from 'utils/types';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import styles from 'assets/styles/content-card.module.scss';

interface Props {
  entry: Entry<Review>,
  sectionName: string,
};

export const ContentCard: FunctionComponent<Props> = (props: Props) => {
  const { entry, sectionName } = props;

  return (
    <Card id={`${entry.PK}-content-card`} key={`${entry.Title}-${entry.PK}-${sectionName}`} className={styles['card']}>
      <CardActionArea href={`/entry/${entry.PK}`} className={styles['card-action-area']}>
        <CardMedia
          component="img"
          image={entry.Details!.FeaturedImage as unknown as string}
          alt={`${entry.Title}-${entry.PK}-${sectionName}`}
          className={styles['card-image']}
        />
        <CardContent className={styles['card-content']}>
          <NoSsr>
            <Typography className={styles['card-subtext']}>{entry.EntryType} | { formatDistanceToNowStrict(entry.Created) } ago</Typography>
          </NoSsr>
          <Typography variant="h5">
            {entry.Title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
