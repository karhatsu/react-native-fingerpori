import React from 'react';
import moment from 'moment';
import { StyleSheet, Text, View } from 'react-native';
import Comics from './Comics'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{marginTop: 20, marginLeft: 5, fontSize: 30}}>Iltalehti</Text>
        <Comics imageUrl={this.getILUrl()} height={310} width={1000}/>
      </View>
    );
  }

  getILUrl () {
    const date = moment().format('YYYYMMDD');
    return `http://static.iltalehti.fi/sarjakuvat/Fingerpori_${date}.gif`;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
