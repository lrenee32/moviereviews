import { FunctionComponent, useState, useRef } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next/types';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import MaterialTable, { MaterialTableProps } from 'material-table';
import GenericModal from 'components/shared/generic-modal';
import { Entry, Entries, Review } from 'utils/types';
import { serializeToText, toTitleCase } from 'utils/utils';
import { createEntry, editEntry, deleteEntry, getEntries } from 'services/api/admin/admin';
import { ModalContent } from 'components/admin/modal-content';


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
    sitePick: Entry<Review>["SitePick"],
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
    sitePick: false,
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
  const [sitePick, setSitePick] = useState<Entry<Review>["SitePick"]>(initialValues.sitePick);
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
    setSitePick(initialValues.sitePick);
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
      setSitePick(entry.SitePick);
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
      SitePick: sitePick,
      Content: content,
      Details: {...details, UserRating: userRating, FeaturedImage: imageURL},
      Tags: tags,
    };
    switch(action) {
      case 'create':
        return createEntry(userId, body).then((res: Entry<Review>) => {
          entries.unshift(res);
          cancelEvent();
        });
      case 'edit':
        const json: Partial<Entry<Partial<Review>>> = {...body, EntryId: entryId, Created: created};
        return editEntry(userId, entryId, json).then((res: Entry<Review>) => {
          const arrIndex = entries.findIndex(i => i.EntryId === res.EntryId);
          entries[arrIndex] = res;
          cancelEvent();
        });
      case 'delete':
        const filtered = body.Content.filter(i => i.type === 'image');
        const images = filtered.map(i => i.url);
        return deleteEntry(userId, entryId, images).then((res: Entry<Review>) => {
          const arrIndex = entries.findIndex(i => i.EntryId === res.EntryId);
          entries.splice(arrIndex, 1);
          cancelEvent();
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
          <NextLink href={`/entry/${rowData.EntryId}`} passHref>
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
        title: 'Site Pick',
        field: 'SitePick',
        render: (rowData: Entry<Review>) => (
          rowData.SitePick
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
        content={
          <ModalContent
            action={action}
            entries={entries}
            entryId={entryId}
            title={title}
            type={type}
            imageURL={imageURL}
            featured={featured}
            sitePick={sitePick}
            userRating={userRating}
            content={content}
            tags={tags}
            actions={{
              setTitle,
              setType,
              setImageURL,
              setFeatured,
              setSitePick,
              setDetails,
              setUserRating,
              setContent,
              setTags,
            }}
          />
        }
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