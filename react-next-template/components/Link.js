import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import MuiLink from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const NextComposed = React.forwardRef(function NextComposed(props, ref) {
    const { as, href, prefetch, ...other } = props;

    return (
        <NextLink href={href} prefetch={prefetch} as={as}>
            <a ref={ref} style={{ textDecoration: "none" }} {...other} />
        </NextLink>
    );
});

NextComposed.propTypes = {
    as: PropTypes.string,
    href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    prefetch: PropTypes.bool,
};

const styles = makeStyles({
    linkStyle: {
        fontSize: "0.875rem",
        color: "#8e8686",
        "&:hover": {
            // fontSize: "14px",
            color: "#ff7b10",
            fontWeight: "bolder",
        }
    },
    activeColor: {
        color: "#ff7b10",
        fontWeight: "bolder",
    }
});

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const Link = React.forwardRef((props, ref) => {
    const {
        activeClassName = 'active',
        className: classNameProps,
        innerRef,
        naked,
        ...other
    } = props;
    const router = useRouter();
    const classes = styles();

    const className = clsx(classNameProps, {
        [classes.activeColor]: router.pathname === props.href,
        [classes.linkStyle]: true,
    });

    if (naked) {
        return <NextComposed ref={innerRef} {...other} />;
    }

    return <MuiLink component={NextComposed} className={className} ref={innerRef} {...other} />;
});

Link.propTypes = {
    activeClassName: PropTypes.string,
    as: PropTypes.string,
    className: PropTypes.string,
    href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    naked: PropTypes.bool,
    onClick: PropTypes.func,
    prefetch: PropTypes.bool,
};

Link.displayName = 'Link';

export default Link;
// export default React.forwardRef((props, ref) => <Link {...props} innerRef={ref} />);