import React from 'react';
import moment from 'moment';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Comics from './Comics'

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      hsImageUrl: null
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={{marginTop: 20, marginLeft: 5, fontSize: 30}}>Iltalehti</Text>
          <Comics imageUrl={this.getILUrl()} height={310} width={1000}/>
          <Text style={{marginTop: 20, marginLeft: 5, fontSize: 30}}>Helsingin Sanomat</Text>
          {this.renderHsImage()}
        </ScrollView>
      </View>
    );
  }

  getILUrl () {
    const date = moment().format('YYYYMMDD');
    return `http://static.iltalehti.fi/sarjakuvat/Fingerpori_${date}.gif`;
  }

  renderHsImage () {
    if (this.state.hsImageUrl) {
      return <Comics imageUrl={this.state.hsImageUrl} height={310} width={1000}/>;
    } else {
      return <ActivityIndicator size={60}/>;
    }
  }

  componentDidMount () {
    fetch('http://www.hs.fi/fingerpori').then((response) => {
      response.text().then((text) => {
        let match = /href=\"(\/fingerpori\/car-[0-9]+\.html)\"/.exec(text);
        fetch(`http://www.hs.fi${match[1]}`).then((response) => {
          response.text().then((text) => {
            match = /(\/\/hs.mediadelivery.io\/img\/1920\/[a-f0-9]+.(png|jpg))/.exec(text);
            this.setState({hsImageUrl: `http://${match[1]}`});
          });
        });
      });
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
});
