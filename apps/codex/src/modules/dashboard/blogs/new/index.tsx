import { VisibilityType } from '@bnb-chain/greenfield-js-sdk';
import { Box, FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { DashboardLayout } from '../../layout';
import { FormikErrors, useFormik } from 'formik';
import { PurpleButton } from '@/modules/airdrop/components/Buttons';
import { useRef, useState } from 'react';
import { Editor } from '../components/editor';

interface FormsValue {
  title: string;
  content: string;
  visibility: keyof typeof VisibilityType;
}

export const NewPostPage = () => {
  const postFormik = useFormik<FormsValue>({
    initialValues: {
      title: '',
      content: '',
      visibility: 'VISIBILITY_TYPE_PUBLIC_READ',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: (values: FormsValue) => {
      const errors: FormikErrors<FormsValue> = {};
      if (!values.title) {
        errors.title = 'title is required';
      }

      return errors;
    },
    onSubmit: (values) => {
      console.log(values);

      // console.log(editorRef?.current.getContent());
    },
  });

  // const quillRef = useRef();

  // const [range, setRange] = useState();
  // const [lastChange, setLastChange] = useState();
  // const [readOnly, setReadOnly] = useState(false);

  return (
    <DashboardLayout>
      <Box as="form" onSubmit={postFormik.handleSubmit}>
        <FormControl py="5px" isRequired isInvalid={!!postFormik.errors.title}>
          <Input
            name="title"
            onChange={postFormik.handleChange}
            placeholder="Give it a title"
            fontSize="44px"
            color="#5F5F5F"
            sx={{
              border: 'none',
              paddingLeft: '10px',
              lineHeight: '1.5em',
              height: '1.5em',
            }}
          />
          {postFormik.errors.title && (
            <FormErrorMessage>{postFormik.errors.title}</FormErrorMessage>
          )}
        </FormControl>

        <Editor />

        {/* <Editor
          apiKey="b46zhkmgjck23i26pm2kbyb4sw530ggpvel9eexwp2pfc4v7"
          onInit={(_evt, editor) => {
            // @ts-ignor
            editorRef.current = editor;
          }}
          initialValue="What is on your mind?"
          init={{
            height: 500,
            menubar: true,
            plugins: [
              'advlist',
              'autolink',
              'lists',
              'link',
              'image',
              'charmap',
              'preview',
              'anchor',
              'searchreplace',
              'visualblocks',
              'code',
              'fullscreen',
              'insertdatetime',
              'media',
              'table',
              'code',
              'help',
              'wordcount',
            ],
            toolbar:
              'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-size:20px, background: red }',
            // content_css: 'tinymce-5-dark',
          }}
        /> */}
        {/* <FormControl py="5px" isRequired isInvalid={!!postFormik.errors.content}> */}
        {/*
          name="content"
          handleChange={(e) => {
            console.log('e', e);
            //         postFormik.setValues({
            // content:
            //         })
          }}
        /> */}
        {/* </FormControl> */}

        <PurpleButton type="submit">Post</PurpleButton>
      </Box>
    </DashboardLayout>
  );
};
