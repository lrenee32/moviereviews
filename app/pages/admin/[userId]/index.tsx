import { FunctionComponent, useState, useRef } from 'react';
import { GetServerSideProps } from 'next/types';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import MaterialTable, { MaterialTableProps } from 'material-table';
import GenericModal from 'components/shared/generic-modal';
import navStyles from 'assets/styles/nav.module.scss';
import { Entry, Entries, Review } from 'utils/types';
import { serializeToText, toTitleCase } from 'utils/utils';
import { createEntry, editEntry, deleteEntry, getEntries } from 'services/api/admin/admin';
import { ModalContent } from 'components/admin/modal-content';
import { authenticated, getUserInfo, logout } from 'services/api/authentication/auth-service';
import { useRouter } from 'next/router';


type ActionTypes = 'create' | 'edit' | 'delete';

interface Props {
  userId: Entry<Review>["UserId"],
  entries: Entries<Review>["All"],
  userInfo: any,
};

const AdminProfile: FunctionComponent<Props> = (props: Props) => {
  const modalRef = useRef<HTMLDivElement>();
  const { userId, entries, userInfo } = props;
  const router = useRouter();

  const initialValues: {
    action: ActionTypes,
    entryId: Entry<Review>["EntryId"],
    title: Entry<Review>["Title"],
    type: Entry<Review>["Type"],
    featured: Entry<Review>["Featured"],
    sitePick: Entry<Review>["SitePick"],
    featuredImage: { url: string, file: null },
    content: Entry<Review>["Content"],
    details: Partial<Entry<Review>["Details"]>,
    userRating: Review["UserRating"],
    tags: Entry<Review>["Tags"],
    created: Entry<Review>["Created"],
    previousImages: string[],
  } = {
    action: 'create',
    entryId: '',
    title: '',
    type: 'article',
    featured: false,
    sitePick: false,
    featuredImage: { url: '', file: null },
    content: [{type: 'paragraph', children: [{text: ''}]}],
    details: null,
    userRating: 0,
    tags: [],
    created: 0,
    previousImages: [],
  };
  
  const [action, setAction] = useState<ActionTypes>(initialValues.action);
  const [entryId, setEntryId] = useState<Entry<Review>["EntryId"]>(initialValues.entryId);
  const [title, setTitle] = useState<Entry<Review>["Title"]>(initialValues.title);
  const [type, setType] = useState<Entry<Review>["Type"]>(initialValues.type);
  const [featured, setFeatured] = useState<Entry<Review>["Featured"]>(initialValues.featured);
  const [sitePick, setSitePick] = useState<Entry<Review>["SitePick"]>(initialValues.sitePick);
  const [featuredImage, setFeaturedImage] = useState<{url: string, file: File | null}>(initialValues.featuredImage);
  const [content, setContent] = useState<Entry<Review>["Content"]>(initialValues.content);
  const [details, setDetails] = useState<Partial<Entry<Review>["Details"]>>(initialValues.details);
  const [userRating, setUserRating] = useState<Review["UserRating"]>(initialValues.userRating)
  const [tags, setTags] = useState<Entry<Review>["Tags"]>(initialValues.tags);
  const [created, setCreated] = useState<Entry<Review>["Created"]>(initialValues.created);
  const [previousImages, setPreviousImages] = useState<string[]>(initialValues.previousImages);

  const adminLogout = () => {
    return logout(userInfo.email)
      .then(() => {
        router.push('/admin/login');
      });
  };

  const reset = () => {
    setAction(initialValues.action);
    setTitle(initialValues.title);
    setType(initialValues.type);
    setFeatured(initialValues.featured);
    setSitePick(initialValues.sitePick);
    setFeaturedImage(initialValues.featuredImage);
    setContent(initialValues.content);
    setDetails(initialValues.details);
    setUserRating(initialValues.userRating);
    setTags(initialValues.tags);
    setPreviousImages(initialValues.previousImages);
  };

  const actionEvent = (entry: Entry<Review> | null, action: ActionTypes) => {
    setAction(action);
    if ((action === 'edit' || action === 'delete') && entry) {
      setEntryId(entry.EntryId);
      setTitle(entry.Title);
      setType(entry.Type);
      setFeatured(entry.Featured);
      setSitePick(entry.SitePick);
      setFeaturedImage({ url: entry.Details!.FeaturedImage, file: null });
      setContent(entry.Content);
      setDetails(entry.Details);
      setUserRating(entry.Details!.UserRating);
      setTags(entry.Tags);
      setCreated(entry.Created);
      
      const filtered = entry.Content.filter(i => i.type === 'image');
      setPreviousImages(filtered.map(i => i.url).concat([entry.Details!.FeaturedImage]));
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
      Details: {...details, UserRating: userRating, FeaturedImage: featuredImage},
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
        return editEntry(userId, entryId, json, previousImages).then((res: Entry<Review>) => {
          const arrIndex = entries.findIndex(i => i.EntryId === res.EntryId);
          entries[arrIndex] = res;
          cancelEvent();
        });
      case 'delete':
        const filtered = body.Content.filter(i => i.type === 'image');
        const images = filtered.map(i => i.url);
        images.push(body.Details?.FeaturedImage.url);
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
      <AppBar position="sticky" className={navStyles['small-nav']}>
        <Box display="flex" justifyContent="space-between" width="100%">
          <NextLink href="/" passHref>
            <Box
              component="img"
              alt="site-logo-header"
              src="../../../images/site-logo-main.png"
              sx={{ height: '50px', m: '10px 32px 10px 16px', '&:hover': { cursor: 'pointer' } }}
            />
          </NextLink>
          <Button color="inherit" onClick={adminLogout}>Logout</Button>
        </Box>
      </AppBar>
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
            featuredImage={featuredImage}
            featured={featured}
            sitePick={sitePick}
            userRating={userRating}
            content={content}
            tags={tags}
            actions={{
              setTitle,
              setType,
              setFeaturedImage,
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const isAuthenticated = await authenticated(context);

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }

  const userInfo = getUserInfo(context);
  console.log(userInfo);
  const userId: Entry<Review>["UserId"] = context.params?.userId;
  const entries: Entries<Review> = await getEntries(userId, '');

  return { props: { userId, entries, userInfo } };
};

export default AdminProfile;