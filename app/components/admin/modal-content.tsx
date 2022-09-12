// @ts-nocheck

import { Dispatch, FunctionComponent, SetStateAction, useRef } from 'react';
import Image from 'next/future/image';
import { Entry, Entries, Review } from 'utils/types';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { AutocompleteSearch } from 'components/shared/autocomplete-search';
import { Tags } from 'components/shared/tags';
import { searchSuggestions } from 'services/api/admin/admin';
import { Editor } from 'components/shared/wysiwyg/Editor';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import DeleteIcon from '@mui/icons-material/Delete';

type ActionTypes = 'create' | 'edit' | 'delete';

interface Props {
  action: ActionTypes,
  entries: Entries<Review>["All"],
  entryId: Entry<Review>["PK"],
  title: Entry<Review>["Title"],
  entryType: Entry<Review>["EntryType"],
  featuredImage: Review["FeaturedImage"],
  featured: Entry<Review>["Featured"],
  sitePick: Entry<Review>["SitePick"],
  userRating: Entry<Review>["UserRating"],
  content: Entry<Review>["Content"],
  tags: Entry<Review>["Tags"],
  actions: {
    setTitle: Dispatch<SetStateAction<Entry<Review>["Title"]>>,
    setEntryType: Dispatch<SetStateAction<Entry<Review>["EntryType"]>>,
    setFeaturedImage: Dispatch<SetStateAction<Review["FeaturedImage"]>>,
    setFeatured: Dispatch<SetStateAction<Entry<Review>["Featured"]>>,
    setSitePick: Dispatch<SetStateAction<Entry<Review>["SitePick"]>>,
    setDetails: Dispatch<SetStateAction<Partial<Entry<Review>["Details"]>>>,
    setUserRating: Dispatch<SetStateAction<Entry<Review>["UserRating"]>>,
    setContent: Dispatch<SetStateAction<Entry<Review>["Content"]>>,
    setTags: Dispatch<SetStateAction<Entry<Review>["Tags"]>>,
  },
};

export const ModalContent: FunctionComponent<Props> = (props: Props) => {
  const { action, title, entryType, featuredImage, featured, sitePick, userRating, content, tags } = props;
  const { setTitle, setEntryType, setFeaturedImage, setFeatured, setSitePick, setDetails, setUserRating, setContent, setTags } = props.actions;
  const uploadImage = useRef(null);

  const renderSelect = (label: string, value: string | number | null, action) => {
    return (
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          onChange={(e) => action(e.target.value)}
        >
          <MenuItem key={`${label}-none`} value={''}>
            <em>None</em>
          </MenuItem>
          {[...Array(4)].map((_i, index) => (
            <MenuItem key={`${label}-${index}`} value={index}>{index + 1}</MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }

  const loadLocalImage = (e) => {
    const files = e.target.files;
    if (files.length === 0) {
      return;
    }
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result;
      setFeaturedImage({
        url,
        file,
      });
    };
    reader.readAsDataURL(file);
  }

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
              value={entryType}
              label="Entry Type"
              onChange={(e) => {
                if (e.target.value === 'article') {
                  setSitePick('');
                }
                setEntryType(e.target.value)
              }}
            >
              <MenuItem value="review">Review</MenuItem>
              <MenuItem value="article">Article</MenuItem>
            </Select>
          </FormControl>
          <Box display="flex" alignItems="center" sx={{ mb: '30px' }}>
            {featuredImage.url && featuredImage.url !== ''
            ? (
              <ButtonBase onClick={() => setFeaturedImage('')} sx={{ position: 'relative', mr: '30px', '&:hover .MuiSvgIcon-root': { opacity: '1' }, '& > img': { position: 'static !important', height: '100px !important', width: 'auto !important', transition: '.2s' }, '&:hover img': { opacity: '.5' } }}>
                <DeleteIcon fontSize="large" color="error" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: '0', zIndex: '1000', transition: '.2s' }} />
                <Image
                  src={featuredImage.url}
                  alt="featured-image-create-edit"
                  fill
                />
              </ButtonBase>
            ) : (
              <Button variant="contained" startIcon={<PhotoCamera />} sx={{ mr: '30px' }} onClick={() => uploadImage.current.click()}>
                Upload Featured Image
                <input ref={uploadImage} type="file" hidden onChange={loadLocalImage} />
              </Button>
            )}
            <Box display="flex" flexDirection="column" minWidth="25%" sx={{ '& > div:first-of-type': { mb: '10px' }}}>
              {renderSelect('Featured', featured, setFeatured)}
              {entryType === 'review' && renderSelect('Site Pick', sitePick, setSitePick)}
            </Box>
          </Box>
          {(action === 'create' && entryType === 'review') &&
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
          {entryType === 'review' &&
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
          <Editor value={content} setValue={setContent} />
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