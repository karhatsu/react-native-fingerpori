import React from 'react';
import moment from 'moment';
import { ScrollView, StyleSheet, View } from 'react-native';
import Comics from './Comics'
import ImageTitle from './ImageTitle'
import NavigationButton from './NavigationButton'
import ImageScraper from './ImageScraper'

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      index: 0,
      ilDate: moment()
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
          <ImageScraper
            domain="https://www.hs.fi"
            index={-this.state.index}
            imageUrlRegex={/(\/\/hs.mediadelivery.fi\/img\/1920\/[a-f0-9]+.(png|jpg))/}
            initialUrl="http://www.hs.fi/fingerpori"
            initialPagePathRegex={/href="(\/fingerpori\/car-[0-9]+\.html)"/}
            previousPagePathRegex={/<a class="article-navlink prev " href="(\/fingerpori\/car-[0-9]+.html)">/}
          />
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

  isToday() {
    return this.state.index === 0;
  }

  showPrevious = () => {
    this.setState({ ilDate: this.state.ilDate.subtract(1, 'day'), index: this.state.index - 1 });
  };

  showNext = () => {
    this.setState({ ilDate: this.state.ilDate.add(1, 'day'), index: this.state.index + 1 });
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
    justifyContent: 'space-between'
  }
});
