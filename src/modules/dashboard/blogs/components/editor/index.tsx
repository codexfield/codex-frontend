import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import styles from './style.module.css';
import { useMemo, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { FormikErrors } from 'formik';
import { FormsValue } from '../../new';

const DynamicQuill = dynamic(() => import('react-quill'), { ssr: false });

/**
 * https://medium.com/@andrewkizito54/creating-a-rich-text-editor-using-react-and-react-quill-3ea990435ade
 */

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
  'clean',
];

interface Props {
  onChange: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<FormikErrors<FormsValue>> | Promise<void>;
}

export const Editor: React.FC<Props> = ({ onChange }) => {
  const [value, setValue] = useState('');

  // console.log('value', value);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ['bold', 'italic', 'underline', 'blockquote'],
          [{ color: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          // ['link', 'image'],
          ['clean'],
        ],
        // handlers: {
        //   image: imageHandler,
        // },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [],
  );

  return (
    <Box className={styles.wrapper}>
      <DynamicQuill
        className={styles.editor}
        theme="snow"
        formats={formats}
        modules={modules}
        value={value}
        onChange={(value) => {
          setValue(value);

          // console.log('onChange', onChange);
          onChange('content', value);
        }}
      />
    </Box>
  );
};
