import React, { memo, useMemo } from 'react';
import { Formik, FormikConfig, FormikValues } from 'formik';
import {
  withFormikDevtools,
  getFormikDevtools,
} from 'formik-devtools-extension';

const DevToolsFormik = <
  Values extends FormikValues = FormikValues,
  ExtraProps = {}
>({
  name,
  children,
  ...rest
}: FormikConfig<Values> & ExtraProps & { name?: string }) => {
  const withDevtools = useMemo(() => {
    return name ? getFormikDevtools(name) : withFormikDevtools;
  }, [name]);
  return (
    <Formik<Values> {...rest}>
      {formikProps => {
        if (process.env.NODE_ENV === 'development') {
          withDevtools(formikProps);
        }
        return typeof children === 'function'
          ? children(formikProps)
          : children;
      }}
    </Formik>
  );
};

export default memo(DevToolsFormik);
