import React from 'react';
import PropTypes from 'prop-types'
import { Button, View } from 'react-native';

export default class NavigationButton extends React.Component {
  static propTypes = {
    left: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
  };

  render() {
    const { left, title, onPress } = this.props
    const marginRight = left ? 20 : 0
    const marginLeft = left ? 0 : 20
    return (
      <View style={{flex: 1, marginRight, marginLeft}}>
        <Button title={title} onPress={onPress} color="#a10e1f"/>
      </View>
    );
  }
}