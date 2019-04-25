import React, { FunctionComponent, lazy, Suspense } from 'react';
const Loader: FunctionComponent = (): JSX.Element => {
  return (
    <div className="container has-text-centered">
      <button className="button is-loading is-large" />;
    </div>
  );
};

export default Loader;
