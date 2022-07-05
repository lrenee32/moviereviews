import { FunctionComponent } from 'react';
import { Reviews } from 'utils/types';
import Grid from '@mui/material/Grid';
import { HeroCard } from '../../components/index/hero-card';
import { Theme, useMediaQuery } from '@mui/material';

interface Props {
  reviews: Reviews,
};

export const Hero: FunctionComponent<Props> = (props: Props) => {
  const { featured } = props.reviews;
  const isXL = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));
  const isXS = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <Grid container height={'90vh'}>
      <Grid item xs={12} sm={6} lg={8}>
        <HeroCard
          review={featured[0]}
          headingVariant="h2"
          showDescription
        />
      </Grid>
      {!isXS &&
        <Grid item xs={0} sm={6} lg={4}>
          <Grid item xs={12} height={'60%'}>
            <HeroCard
              review={featured[1]} 
              headingVariant="h3"
              showDescription={isXL}
            />
          </Grid>
          <Grid container height={'40%'}>
            <Grid item xs={6}>
              <HeroCard
                review={featured[2]}
                headingVariant="h4"
              />
            </Grid>
            <Grid item xs={6}>
              <HeroCard
                review={featured[3]}
                headingVariant="h4"
              />
            </Grid>
          </Grid>
        </Grid>
      }
    </Grid>
  );
};