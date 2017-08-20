import React from 'react';
import { StyleSheet, Image, ScrollView, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{marginTop: 20, marginLeft: 5, fontSize: 30}}>Iltalehti</Text>
        <View style={{height: 310}}>
          <ScrollView horizontal={true}>{this.renderILImage()}</ScrollView>
        </View>
      </View>
    );
  }

  renderILImage () {
    const date = '20170820';
    const isSource = `http://static.iltalehti.fi/sarjakuvat/Fingerpori_${date}.gif`;
    return <Image source={{uri: isSource}} style={{width: 1000, height: 310}}/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
