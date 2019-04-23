import React, { FunctionComponent, lazy, Suspense } from 'react';
const Loader: FunctionComponent = (): JSX.Element => {
  return <button className="button is-loading" />;
};

export default Loader;
