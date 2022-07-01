import Link from 'next/link';
import { FunctionComponent } from 'react';
import { FeaturedReview, Review } from 'utils/types';
import styles from '../../assets/styles/components/shared/card.module.scss';

interface Props {
  review: FeaturedReview & Review,
};

export const Card: FunctionComponent<Props> = (props: Props) => {
  const { review } = props;

  const getPosterImage = (posterPath: string) => {
    return `https://image.tmdb.org/t/p/w500/${posterPath}`;
  };

  return (
    <div className={styles['card-container']}>
      <Link href='/'>
        <div className={styles.card} style={{ backgroundImage: `url(${getPosterImage(review?.Details.poster_path)})` }}></div>
      </Link>
      <div className={styles.content}>
        <div className={styles.title}>{ review.Title }</div>
        <div className={styles.ratings}>
          <div className={styles.rating}>{ `IMDB: ${review.Details.vote_average}` }</div>
          <div className={styles.rating}>{ `Personal: ${review.Rating}` }</div>
        </div>
      </div>
    </div>
  );
};
