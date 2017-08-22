import React from 'react';
import PropTypes from 'prop-types'
import { Image, ScrollView, View } from 'react-native';

export default class Comics extends React.Component {
  static propTypes = {
    imageUrl: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  };

  render () {
    const {imageUrl, height, width} = this.props;
    return (
      <View style={{height}}>
        <ScrollView horizontal={true}>
          <Image source={{uri: imageUrl}} style={{width, height}}/>
        </ScrollView>
      </View>
    )
  }
}