import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { Entry, Entries, Review } from 'utils/types';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { AutocompleteSearch } from 'components/shared/autocomplete-search';
import { Tags } from 'components/shared/tags';
import { RichTextEditor } from 'components/shared/rich-text-editor/rich-text-editor';
import { searchSuggestions } from 'services/api/admin/admin';

type ActionTypes = 'create' | 'edit' | 'delete';

interface Props {
  action: ActionTypes,
  entries: Entries<Review>["All"],
  entryId: Entry<Review>["EntryId"],
  title: Entry<Review>["Title"],
  type: Entry<Review>["Type"],
  imageURL: Review["FeaturedImage"],
  featured: Entry<Review>["Featured"],
  sitePick: Entry<Review>["SitePick"],
  userRating: Review["UserRating"],
  content: Entry<Review>["Content"],
  tags: Entry<Review>["Tags"],
  actions: {
    setTitle: Dispatch<SetStateAction<Entry<Review>["Title"]>>,
    setType: Dispatch<SetStateAction<Entry<Review>["Type"]>>,
    setImageURL: Dispatch<SetStateAction<Review["FeaturedImage"]>>,
    setFeatured: Dispatch<SetStateAction<Entry<Review>["Featured"]>>,
    setSitePick: Dispatch<SetStateAction<Entry<Review>["SitePick"]>>,
    setDetails: Dispatch<SetStateAction<Partial<Entry<Review>["Details"]>>>,
    setUserRating: Dispatch<SetStateAction<Review["UserRating"]>>,
    setContent: Dispatch<SetStateAction<Entry<Review>["Content"]>>,
    setTags: Dispatch<SetStateAction<Entry<Review>["Tags"]>>,
  },
};

export const ModalContent: FunctionComponent<Props> = (props: Props) => {
  const { action, entries, entryId, title, type, imageURL, featured, sitePick, userRating, content, tags } = props;
  const { setTitle, setType, setImageURL, setFeatured, setSitePick, setDetails, setUserRating, setContent, setTags } = props.actions;

  type CheckBoxTypes = 'featured' | 'pick';
  const checkBoxDisabled = (selected: CheckBoxTypes) => {
    const features = entries.filter(i => i.Featured);
    const picks = entries.filter(i => i.SitePick);
    const isFeatured = features.find(i => i.EntryId === entryId);
    const isSitePick = picks.find(i => i.EntryId === entryId);
    if (selected === 'featured') {
      return features.length > 3 && !isFeatured;
    }
    return picks.length > 3 && !isSitePick;
  };

  return (
    <>
      {(action === 'create' || action === 'edit') && (
        <>
          <TextField
            fullWidth
            label="Title"
            id="title"
            sx={{ marginBottom: '30px', marginTop: '5px' }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormControl fullWidth sx={{ mb: '30px' }} disabled={action === 'edit'}>
            <InputLabel>Entry Type</InputLabel>
            <Select
              value={type}
              label="Entry Type"
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="review">Review</MenuItem>
              <MenuItem value="article">Article</MenuItem>
            </Select>
          </FormControl>
          <Box display="flex" alignItems="center" sx={{ mb: '30px' }}>
            <TextField
              fullWidth
              label="Image URL"
              id="image-url"
              sx={{ mr: '30px' }}
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
            <Box>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={featured} onChange={(e) => setFeatured(e.target.checked)} disabled={checkBoxDisabled('featured')} sx={{ p: '2.5px 9px' }} />
                  }
                  label="Featured"
                />
              </FormGroup>
              {type === 'review' &&
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox checked={sitePick} onChange={(e) => setSitePick(e.target.checked)} disabled={checkBoxDisabled('pick')} sx={{ p: '2.5px 9px' }} />
                    }
                    label="Site Pick"
                  />
                </FormGroup>
              }
            </Box>
          </Box>
          {(action === 'create' && type === 'review') &&
          <AutocompleteSearch
            optionsSearch={searchSuggestions}
            selectionEvent={(e) => setDetails({
              TMDBRating: e.vote_average,
              FilmTitle: e.title,
              FilmYear: e.release_date,
              FilmOverview: e.overview,
              FilmPoster: e.poster_path,
            })}
          />
          }
          {type === 'review' &&
            <Box
              sx={{
                position: 'relative',
                border: '1px solid rgba(255,255,255,0.23)',
                borderRadius: '4px',
                marginBottom: '30px',
                padding: '16.5px 14px',
                '&:hover': {
                  borderColor: '#FFFFFF',
                },
                '&:active, &:active > div:first-of-type': {
                  borderColor: '#E91E73',
                  color: '#E91E73',
                },
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  transform: 'scale(0.75)',
                  top: '-12px',
                  left: '0',
                  padding: '0 7.5px',
                  backgroundColor: '#121212',
                  backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))',
                }}
              >
                Rating
              </Box>
              <Rating
                name="rating-create"
                getLabelText={() => 'Rating'}
                value={userRating}
                max={10}
                precision={0.5}
                onChange={(_e, value) => setUserRating(value!)}
              />
            </Box>
          }
          <RichTextEditor value={content} setValue={setContent} />
          <Tags selectionEvent={(e) => setTags(e)} tags={tags} max={5} />
        </>
      )}
      {action === 'delete' && (
        <DialogContentText>
          {`Are you sure you want to delete the entry "${title}"?`}
        </DialogContentText>
      )}
    </>
  );
};