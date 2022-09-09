// @ts-nocheck

import { FunctionComponent, useState, useRef } from 'react';
import { GetServerSideProps } from 'next/types';
import NextLink from 'next/link';
import Head from 'next/head';
import Image from 'next/future/image';
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
    entryId: Entry<Review>["PK"],
    title: Entry<Review>["Title"],
    entryType: Entry<Review>["EntryType"],
    featured: Entry<Review>["Featured"],
    sitePick: Entry<Review>["SitePick"],
    featuredImage: { url: string, file: null },
    content: Entry<Review>["Content"],
    details: Partial<Entry<Review>["Details"]>,
    userRating: Entry<Review>["UserRating"],
    tags: Entry<Review>["Tags"],
    created: Entry<Review>["Created"],
    previousImages: string[],
  } = {
    action: 'create',
    entryId: '',
    title: '',
    entryType: 'article',
    featured: '',
    sitePick: '',
    featuredImage: { url: '', file: null },
    content: [{type: 'paragraph', children: [{text: ''}]}],
    details: null,
    userRating: 0,
    tags: [],
    created: 0,
    previousImages: [],
  };
  
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [action, setAction] = useState<ActionTypes>(initialValues.action);
  const [entryId, setEntryId] = useState<Entry<Review>["PK"]>(initialValues.entryId);
  const [title, setTitle] = useState<Entry<Review>["Title"]>(initialValues.title);
  const [entryType, setEntryType] = useState<Entry<Review>["EntryType"]>(initialValues.entryType);
  const [featured, setFeatured] = useState<Entry<Review>["Featured"]>(initialValues.featured);
  const [sitePick, setSitePick] = useState<Entry<Review>["SitePick"]>(initialValues.sitePick);
  const [featuredImage, setFeaturedImage] = useState<{url: string, file: File | null}>(initialValues.featuredImage);
  const [content, setContent] = useState<Entry<Review>["Content"]>(initialValues.content);
  const [details, setDetails] = useState<Partial<Entry<Review>["Details"]>>(initialValues.details);
  const [userRating, setUserRating] = useState<Entry<Review>["UserRating"]>(initialValues.userRating)
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
    setEntryType(initialValues.entryType);
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
      setEntryId(entry.PK);
      setTitle(entry.Title);
      setEntryType(entry.EntryType);
      setFeatured(entry.Featured !== undefined ? entry.Featured : '');
      setSitePick(entry.SitePick !== undefined ? entry.SitePick : '');
      setFeaturedImage({ url: entry.Details!.FeaturedImage, file: null });
      setContent(entry.Content);
      setDetails(entry.Details);
      setUserRating(entry.UserRating);
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
      EntryType: entryType,
      Featured: featured !== '' ? featured : undefined,
      SitePick: sitePick !== '' ? sitePick : undefined,
      Content: content,
      Details: {...details, FeaturedImage: featuredImage},
      Tags: tags,
      UserRating: userRating,
    };

    const updateOtherIndexes = async (type: string) => {
      const replaceAt = entries.findIndex(i => i[type] === body[type]);
      if (replaceAt > -1) {
        delete entries[replaceAt][type];
        await editEntry(userId, entries[replaceAt].PK, entries[replaceAt]);
      }
    };

    switch(action) {
      case 'create':
        return createEntry(userId, body).then((res: Entry<Review>) => {
          if (body.Featured !== undefined) {
            updateOtherIndexes('Featured');
          }
          if (body.SitePick !== undefined) {
            updateOtherIndexes('SitePick');
          }
          entries.unshift(res);
          setSubmitting(false);
          cancelEvent();
        });
      case 'edit':
        const json: Partial<Entry<Partial<Review>>> = {...body, PK: entryId, Created: created};
        return editEntry(userId, entryId, json, previousImages).then(async (res: Entry<Review>) => {
          const arrIndex = entries.findIndex(i => i.PK === res.PK);
          if (body.Featured !== undefined && (entries[arrIndex].Featured !== body.Featured)) {
            updateOtherIndexes('Featured');
          }
          if (body.SitePick !== undefined && (entries[arrIndex].SitePick !== body.SitePick)) {
            updateOtherIndexes('SitePick');
          }
          entries[arrIndex] = res;
          setSubmitting(false);
          cancelEvent();
        });
      case 'delete':
        const filtered = body.Content.filter(i => i.type === 'image');
        const images = filtered.map(i => i.url);
        images.push(body.Details?.FeaturedImage.url);
        return deleteEntry(userId, entryId, images).then((res: Entry<Review>) => {
          const arrIndex = entries.findIndex(i => i.PK === res.PK);
          entries.splice(arrIndex, 1);
          setSubmitting(false);
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
          <NextLink href={`/entry/${rowData.PK}`} passHref>
            <Link>{rowData.Title}</Link>
          </NextLink>
        ),
      },
      {
        title: 'Featured',
        field: 'Featured',
        render: (rowData: Entry<Review>) => (
          rowData.Featured !== undefined
          ? <Check color="success" />
          : <Close />
        ),
      },
      {
        title: 'Site Pick',
        field: 'SitePick',
        render: (rowData: Entry<Review>) => (
          rowData.SitePick !== undefined
          ? <Check color="success" />
          : <Close />
        ),
      },
      {
        title: 'Type',
        field: 'EntryType',
        render: (rowData: Entry<Review>) => toTitleCase(rowData.EntryType)
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
      <Head>
        <title>Admin - Splatter & Scream</title>
      </Head>
      <AppBar id="back-to-top-anchor" position="sticky" className={navStyles['small-nav']}>
        <Box display="flex" justifyContent="space-between" width="100%" sx={{ '& > img': { position: 'static !important', height: '50px !important', width: 'auto !important', m: '10px 32px 10px 16px', '&:hover': { cursor: 'pointer' }} }}>
          <NextLink href="/" passHref>
            <a>
              <Image
                src="/images/site-logo-main.png"
                alt="site-logo-header"
                fill
              />
            </a>
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
            entryType={entryType}
            featuredImage={featuredImage}
            featured={featured}
            sitePick={sitePick}
            userRating={userRating}
            content={content}
            tags={tags}
            actions={{
              setTitle,
              setEntryType,
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
        submitting={submitting}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userInfo = getUserInfo(context);
  const userId: Entry<Review>["UserId"] = context.params?.userId;

  const isAuthenticated = await authenticated(context);

  if (!isAuthenticated || (userInfo.sub !== userId)) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }
  
  const entries: Entries<Review> = await getEntries(context, userId, '');

  return { props: { userId, entries, userInfo } };
};

export default AdminProfile;