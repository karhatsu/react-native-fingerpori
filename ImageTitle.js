import React from 'react';
import PropTypes from 'prop-types'
import { Text } from 'react-native';

export default class ImageTitle extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  render () {
    const {title} = this.props;
    return <Text style={{marginTop: 20, marginLeft: 5, fontSize: 30}}>{title}</Text>;
  }
}