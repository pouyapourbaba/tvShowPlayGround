import * as React from "react";

export interface NotFoundProps {}

const NotFound: React.SFC<NotFoundProps> = () => {
  return <h1>The requested path does not exist</h1>;
};

export default NotFound;
