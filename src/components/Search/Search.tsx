import {
  Field,
  Form,
  Formik,
} from 'formik';
import { memo } from 'react';

interface ISearchProps {
  icon: () => JSX.Element;
  title: string;
  onSearch: (searchValue: string) => void;
}

const DEFAULT_SETTINGS = {
  search: '',
};

function Search({ icon, title, onSearch }: ISearchProps) {
  return (
    <Formik
      initialValues={DEFAULT_SETTINGS}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onSearch(values.search);
      }}
      validateOnChange
    >
      {({
        values,
        handleChange,
        handleSubmit,
        handleBlur,
      }) => (
        <Form onSubmit={handleSubmit}>
          {icon && icon()}
          <Field
            placeholder={title}
            type="text"
            name="search"
            value={values.search}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form>
      )}
    </Formik>
  );
}

export default memo(Search);
