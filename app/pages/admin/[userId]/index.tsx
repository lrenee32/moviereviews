import { FunctionComponent, useState, useRef } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next/types';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import MaterialTable, { MaterialTableProps } from 'material-table';
import GenericModal from 'components/shared/generic-modal';
import { AutocompleteSearch } from 'components/shared/autocomplete-search';
import { Tags } from 'components/shared/tags';
import { RichTextEditor } from 'components/shared/rich-text-editor/rich-text-editor';
import { Entry, Entries, Review } from 'utils/types';
import { serializeToText, toTitleCase } from 'utils/utils';
import { createEntry, editEntry, deleteEntry, getEntries, searchSuggestions, revalidate } from 'services/api/admin/admin';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


type ActionTypes = 'create' | 'edit' | 'delete';

interface Props {
  userId: Entry<Review>["UserId"],
  entries: Entries<Review>["All"],
};

const AdminProfile: FunctionComponent<Props> = (props: Props) => {
  const modalRef = useRef<HTMLDivElement>();
  const { userId, entries } = props;

  const initialValues: {
    action: ActionTypes,
    entryId: Entry<Review>["EntryId"],
    title: Entry<Review>["Title"],
    type: Entry<Review>["Type"],
    featured: Entry<Review>["Featured"],
    imageURL: Review["FeaturedImage"],
    content: Entry<Review>["Content"],
    details: Partial<Entry<Review>["Details"]>,
    userRating: Review["UserRating"],
    tags: Entry<Review>["Tags"],
    created: Entry<Review>["Created"],
  } = {
    action: 'create',
    entryId: '',
    title: '',
    type: 'article',
    featured: false,
    imageURL: '',
    content: [{type: 'paragraph', children: [{text: ''}]}],
    details: null,
    userRating: 0,
    tags: [],
    created: 0,
  };
  
  const [action, setAction] = useState<ActionTypes>(initialValues.action);
  const [entryId, setEntryId] = useState<Entry<Review>["EntryId"]>(initialValues.entryId);
  const [title, setTitle] = useState<Entry<Review>["Title"]>(initialValues.title);
  const [type, setType] = useState<Entry<Review>["Type"]>(initialValues.type);
  const [featured, setFeatured] = useState<Entry<Review>["Featured"]>(initialValues.featured);
  const [imageURL, setImageURL] = useState<Review["FeaturedImage"]>(initialValues.imageURL);
  const [content, setContent] = useState<Entry<Review>["Content"]>(initialValues.content);
  const [details, setDetails] = useState<Partial<Entry<Review>["Details"]>>(initialValues.details);
  const [userRating, setUserRating] = useState<Review["UserRating"]>(initialValues.userRating)
  const [tags, setTags] = useState<Entry<Review>["Tags"]>(initialValues.tags);
  const [created, setCreated] = useState<Entry<Review>["Created"]>(initialValues.created);

  const reset = () => {
    setAction(initialValues.action);
    setTitle(initialValues.title);
    setType(initialValues.type);
    setFeatured(initialValues.featured);
    setImageURL(initialValues.imageURL);
    setContent(initialValues.content);
    setDetails(initialValues.details);
    setUserRating(initialValues.userRating);
    setTags(initialValues.tags);
  };

  const actionEvent = (entry: Entry<Review> | null, action: ActionTypes) => {
    setAction(action);
    if ((action === 'edit' || action === 'delete') && entry) {
      setEntryId(entry.EntryId);
      setTitle(entry.Title);
      setType(entry.Type);
      setFeatured(entry.Featured);
      setImageURL(entry.Details!.FeaturedImage);
      setContent(entry.Content);
      setDetails(entry.Details);
      setUserRating(entry.Details!.UserRating);
      setTags(entry.Tags);
      setCreated(entry.Created);
    }
    return modalRef?.current?.toggleModal(true);
  };

  const cancelEvent = () => {
    reset();
    return modalRef?.current?.toggleModal(false);
  };

  const confirmEvent = () => {
    const body: Partial<Entry<Partial<Review>>> = {
      Title: title,
      Type: type,
      Featured: featured,
      Content: content,
      Details: {...details, UserRating: userRating, FeaturedImage: imageURL},
      Tags: tags,
    };
    switch(action) {
      case 'create':
        return createEntry(userId, body).then(() => {
          return revalidate(userId).then(() => cancelEvent());
        });
      case 'edit':
        const json: Partial<Entry<Partial<Review>>> = {...body, EntryId: entryId, Created: created};
        return editEntry(userId, entryId, json).then(() => {
          return revalidate(userId).then(() => cancelEvent());
        });
      case 'delete':
        return deleteEntry(userId, entryId).then(() => {
          return revalidate(userId).then(() => cancelEvent());
        });
    }
  };

  const tableData: MaterialTableProps<Entry<Review>> = {
    data: entries,
    columns: [
      {
        title: 'Title',
        field: 'Title',
        render: (rowData: Entry<Review>) => (
          <NextLink href={`/review/${rowData.EntryId}`} passHref>
            <Link>{rowData.Title}</Link>
          </NextLink>
        ),
      },
      {
        title: 'Featured',
        field: 'Featured',
        render: (rowData: Entry<Review>) => (
          rowData.Featured
          ? <Check color="success" />
          : <Close />
        ),
      },
      {
        title: 'Type',
        field: 'Type',
        render: (rowData: Entry<Review>) => toTitleCase(rowData.Type)
      },
      {
        title: 'Content',
        field: 'ContentText',
        render: (rowData: Entry<Review>) => serializeToText(rowData.Content),
        cellStyle: { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '1px' }
      },
    ],
    actions: [
      { icon: 'edit', onClick: (_event, row: Entry<Review>) => actionEvent(row, 'edit')},
      { icon: 'delete', iconProps: { color: 'error' }, onClick: (_event, row: Entry<Review>) => actionEvent(row, 'delete')},
    ],
    options: {
      actionsColumnIndex: -1,
      searchFieldAlignment: 'right',
      showTitle: false,
      draggable: false,
      headerStyle: { backgroundColor: 'inherit' }
    },
    style: {
      borderRadius: '10px',
    },
  };

  const generateModalContent = (action: ActionTypes) => {
    switch(action) {
      case 'create':
      case 'edit':
        return (
          <>
            <TextField
              fullWidth
              label="Title"
              id="title"
              sx={{ marginBottom: '30px', marginTop: '5px' }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FormControl fullWidth sx={{ mb: '30px' }}>
              <InputLabel>Entry Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Age"
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="review">Review</MenuItem>
                <MenuItem value="article">Article</MenuItem>
              </Select>
            </FormControl>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Image URL"
                id="image-url"
                sx={{ mb: '30px', mr: '30px' }}
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
              />
              <FormGroup sx={{ mb: '30px' }}>
                <FormControlLabel
                  control={
                    <Checkbox checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
                  }
                  label="Featured"
                />
              </FormGroup>
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
        )
      case 'delete':
        return (
          <DialogContentText>
            {`Are you sure you want to delete the entry "${title}"?`}
          </DialogContentText>
        );
      default:
        break;
    }
  };
  
  return (
    <>
      <Container sx={{ marginY: '100px' }}>
        <Typography variant="h3" marginBottom={'30px'}>Manage Entries</Typography>
        <Button onClick={() => actionEvent(null, 'create')} variant="outlined">Create Entry</Button>
        {(entries && entries.length > 0) && (
          <MaterialTable
            columns={tableData.columns}
            data={tableData.data}
            actions={tableData.actions}
            options={tableData.options}
            style={tableData.style}
          />
        )}
      </Container>
      <GenericModal
        ref={modalRef}
        header={`${toTitleCase(action)} Entry`}
        content={generateModalContent(action)}
        cancel={{ text: 'Cancel', action: cancelEvent}}
        confirmation={{ text: 'Confirm', action: confirmEvent }}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const userId: Entry<Review>["UserId"] = context.params?.userId;
  const entries: Entries<Review> = await getEntries(userId, '');

  return { props: { userId, entries } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = ['a5c723d5-89ba-4554-a09d-ee3870be41a3'].map((userId) => ({
    params: { userId },
  }));

  return { paths, fallback: 'blocking' };
};

export default AdminProfile;