import React from 'react';
import moment from 'moment';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import Comics from './Comics'
import ImageTitle from './ImageTitle'
import NavigationButton from './NavigationButton'

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      index: 0,
      ilDate: moment(),
      hsImageUrl: null
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          <NavigationButton title="Edellinen" left={true} onPress={this.showPrevious}/>
          <NavigationButton title="Seuraava" left={false} onPress={this.showNext} disabled={this.isToday()}/>
        </View>
        <ScrollView>
          <ImageTitle title="Iltalehti"/>
          {this.renderIlImage()}
          <ImageTitle title="Helsingin Sanomat"/>
          {this.renderHsImage()}
        </ScrollView>
      </View>
    );
  }

  renderIlImage () {
    return <Comics imageUrl={this.getILUrl()}/>;
  }

  getILUrl () {
    const date = this.state.ilDate.format('YYYYMMDD');
    return `http://static.iltalehti.fi/sarjakuvat/Fingerpori_${date}.gif`;
  }

  renderHsImage () {
    if (this.state.hsImageUrl) {
      return <Comics imageUrl={this.state.hsImageUrl}/>;
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

  isToday() {
    return this.state.index === 0;
  }

  showPrevious = () => {
    this.setState({ ilDate: this.state.ilDate.subtract(1, 'day'), index: this.state.index - 1 })
  };

  showNext = () => {
    this.setState({ ilDate: this.state.ilDate.add(1, 'day'), index: this.state.index + 1 })
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  }
});
