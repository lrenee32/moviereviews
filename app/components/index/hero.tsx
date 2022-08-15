import { FunctionComponent } from 'react';
import { Entries, Review } from 'utils/types';
import Grid from '@mui/material/Grid';
import { HeroCard } from '../../components/index/hero-card';
import { Theme, useMediaQuery } from '@mui/material';

interface Props {
  entries: Entries<Review>,
};

export const Hero: FunctionComponent<Props> = (props: Props) => {
  const { Featured } = props.entries;
  const isXL = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));
  const isSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Grid
      container
      height={'80vh'}
      minHeight="700px"
    >
      <Grid item xs={12} md={6} xl={8}>
        <HeroCard
          entry={Featured[0]}
          headingVariant="h2"
          showDescription
        />
      </Grid>
      {!isSM &&
        <Grid item xs={0} md={6} xl={4}>
          <Grid item xs={12} height={'60%'}>
            <HeroCard
              entry={Featured[1]} 
              headingVariant="h3"
              showDescription={isXL}
            />
          </Grid>
          <Grid container height={'40%'}>
            <Grid item xs={6}>
              <HeroCard
                entry={Featured[2]}
                headingVariant="h4"
              />
            </Grid>
            <Grid item xs={6}>
              <HeroCard
                entry={Featured[3]}
                headingVariant="h4"
              />
            </Grid>
          </Grid>
        </Grid>
      }
    </Grid>
  );
};