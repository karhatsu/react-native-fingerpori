import React from 'react';
import PropTypes from 'prop-types'
import { Image, ScrollView, View } from 'react-native';

export default class Comics extends React.Component {
  static propTypes = {
    imageUrl: PropTypes.string.isRequired
  };

  render () {
    const width = 800;
    const height = 248;
    const {imageUrl} = this.props;
    return (
      <View style={{height}}>
        <ScrollView horizontal={true}>
          <Image source={{uri: imageUrl}} style={{width, height}}/>
        </ScrollView>
      </View>
    )
  }
}