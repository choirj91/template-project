import React from "react";
import { FC } from "react";

const Logo: FC = (props) => (
  <img
    alt="Logo"
    src="/static/icons/admin_logo.png"
    style={{height: 30}}
    {...props}
  />
);

export default Logo;
