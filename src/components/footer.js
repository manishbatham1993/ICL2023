import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 6}px 0`,
  }
});

function Footer(props) {
  const { classes } = props;

  return (
    <footer classname="{classes.footer}">
      <paper classname="{classes.root}" elevation="{1}"  style={{
      position: 'fixed',
      bottom: 0,
      textAlign:'center'

}}>
        <typography variant="h5" component="h3">
          Incedo Cricket League
        </typography>
        <typography component="p">
          @2022 All right reserved
        </typography>
      </paper>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);