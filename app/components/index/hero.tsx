import { FunctionComponent } from 'react';
import { Reviews } from 'utils/types';
import Grid from '@mui/material/Grid';
import { HeroCard } from '../../components/index/hero-card';

interface Props {
  reviews: Reviews,
};

export const Hero: FunctionComponent<Props> = (props: Props) => {
  const { featured } = props.reviews;

  return (
    <Grid container height={'80vh'}>
      <Grid item xs={8}>
        <HeroCard review={featured[0]} headingVariant="h2" showDescription />
      </Grid>
      <Grid item xs={4}>
        <Grid item xs={12} height={'60%'}>
          <HeroCard review={featured[1]} headingVariant="h2" showDescription />
        </Grid>
        <Grid container height={'40%'}>
          <Grid item xs={6}>
            <HeroCard review={featured[2]} headingVariant="h4" />
          </Grid>
          <Grid item xs={6}>
            <HeroCard review={featured[3]} headingVariant="h4" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};