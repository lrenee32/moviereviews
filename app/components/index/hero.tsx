import { FunctionComponent } from 'react';
import { Entries, Review } from 'utils/types';
import Grid from '@mui/material/Grid';
import { HeroCard } from '../../components/index/hero-card';
import { Theme, useMediaQuery } from '@mui/material';

interface Props {
  entries: Entries<Review>["Featured"]["data"],
};

export const Hero: FunctionComponent<Props> = (props: Props) => {
  const { entries } = props;
  const clone: Entries<Review>["Featured"]["data"] = [];
  entries.map(i => {
    clone[Number(i.Featured)] = i;
  });
  const isXL = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));
  const isSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Grid
      id="back-to-top-anchor"
      container
      height={'80vh'}
      minHeight="700px"
    >
      <Grid item xs={12} md={6} xl={8}>
        {clone[0] && 
          <HeroCard
            entry={clone[0]}
            headingVariant="h2"
            showDescription
          />
        }
      </Grid>
      {!isSM &&
        <Grid item xs={0} md={6} xl={4}>
          <Grid item xs={12} height={'60%'}>
            {clone[1] &&
              <HeroCard
                entry={clone[1]} 
                headingVariant="h3"
                showDescription={isXL}
              />
            }
          </Grid>
          <Grid container height={'40%'}>
            <Grid item xs={6}>
              {clone[2] &&
                <HeroCard
                  entry={clone[2]}
                  headingVariant="h5"
                />
              }
            </Grid>
            <Grid item xs={6}>
              {clone[3] &&
                <HeroCard
                  entry={clone[3]}
                  headingVariant="h5"
                />
              }
            </Grid>
          </Grid>
        </Grid>
      }
    </Grid>
  );
};