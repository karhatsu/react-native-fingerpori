import React from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native';

export default class ImageTitle extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  render () {
    const {title} = this.props;
    return <Text style={styles.title}>{title}</Text>;
  }
}


const styles = StyleSheet.create({
  title: {
    color: '#a10e1f',
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 5,
    fontSize: 30
  }
});
