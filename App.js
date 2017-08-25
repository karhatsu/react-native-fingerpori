import React from 'react';
import moment from 'moment';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import Comics from './Comics'
import ImageTitle from './ImageTitle'
import NavigationButton from './NavigationButton'

const initialHsPageUrl = 'http://www.hs.fi/fingerpori';
const initialHsPagePathRegex = /href=\"(\/fingerpori\/car-[0-9]+\.html)\"/;
const hsImageUrlRegex = /(\/\/hs.mediadelivery.io\/img\/1920\/[a-f0-9]+.(png|jpg))/;
const previousHsPagePathRegex = /<a class="article-navlink prev " href="(\/fingerpori\/car-[0-9]+.html)">/;

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      index: 0,
      ilDate: moment(),
      hs: {
        pageUrl: null,
        imageUrl: null,
        previous: null,
        next: null
      }
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
    if (this.state.hs.imageUrl) {
      return <Comics imageUrl={this.state.hs.imageUrl}/>;
    } else {
      return <ActivityIndicator size={60}/>;
    }
  }

  componentDidMount () {
    fetch(initialHsPageUrl).then((response) => {
      response.text().then((text) => {
        const match = initialHsPagePathRegex.exec(text);
        this.setState({hs: {...this.state.hs, pageUrl: `http://www.hs.fi${match[1]}`}});
      });
    });
  }

  componentDidUpdate() {
    if (!this.state.hs.imageUrl && this.state.hs.pageUrl) {
      fetch(this.state.hs.pageUrl).then((response) => {
        response.text().then((text) => {
          const imageMatch = hsImageUrlRegex.exec(text);
          const prevMatch = previousHsPagePathRegex.exec(text);
          this.setState({
            hs: {
              ...this.state.hs,
              imageUrl: `http://${imageMatch[1]}`,
              previous: {
                pageUrl: `http://www.hs.fi${prevMatch[1]}`,
                next: this.state.hs
              }
            }
          })
        });
      });
    }
  }

  isToday() {
    return this.state.index === 0;
  }

  showPrevious = () => {
    const hs = this.state.hs.previous;
    this.setState({ ilDate: this.state.ilDate.subtract(1, 'day'), index: this.state.index - 1, hs });
  };

  showNext = () => {
    const hs = this.state.hs.next;
    this.setState({ ilDate: this.state.ilDate.add(1, 'day'), index: this.state.index + 1, hs });
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
