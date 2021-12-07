import React, { ElementType } from 'react';
import {
  NavLink as RouterLink,
  matchPath,
  useLocation
} from 'react-router-dom';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';

type Props = {
  href: string;
  icon: ElementType;
  title: string;
  handleClickAction: () => void;
}

const NavItem = ({
  href,
  icon: Icon,
  title,
  handleClickAction,
  ...rest
}: Props) => {
  const location = useLocation();

  const active = href ? !!matchPath({
    path: href,
    end: false
  }, location.pathname) : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        py: 0
      }}
      {...rest}
    >
      <Button
        component={RouterLink}
        sx={{
          color: 'text.secondary',
          fontWeight: 'medium',
          justifyContent: 'flex-start',
          letterSpacing: 0,
          py: 1.25,
          textTransform: 'none',
          width: '100%',
          ...(active && {
            color: 'primary.main'
          }),
          '& svg': {
            mr: 1
          }
        }}
        to={href}
        onClick={handleClickAction}
      >
        {Icon && (
          <Icon size="20" />
        )}
        <span style={{ fontWeight: "bolder" }}>
          {title}
        </span>
      </Button>
    </ListItem>
  );
};

export default NavItem;
