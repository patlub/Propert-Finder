import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
} from 'react-native';

function urlForQueryAndPage(key, value, pageNumber) {
    const data = {
        country: 'uk',
        pretty: '1',
        encoding: 'json',
        listing_type: 'buy',
        action: 'search_listings',
        page: pageNumber,
    };
    data[key] = value;

    const queryString = Object.keys(data)
      .map(key => key + '=' + encodeURIComponent(data[key]))
      .join('&');

    return 'https://api.nestoria.co.uk/api?' + queryString;
}

class SearchPage extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      isLoading: false,
      message: ''
    }
  }

  static navigationOptions = {
    title: 'Property Finder',
  };

  onSearchTextChanged = (event) => {
    this.setState({ searchText: event.nativeEvent.text })
  }

  executeQuery = (query) => {
      console.log(query);

    this.setState({ isLoading: true });
    fetch(query)
      .then(response => response.json())
      .then(json => this.handleResponse(json.response))
      .catch(error =>
        this.setState({
        isLoading: false,
        message: 'Something bad happened ' + error
    }));
  };

  handleResponse = (response) => {
    this.setState({ isLoading: false , message: '' });
    if (response.application_response_code.substr(0, 1) === '1') {
      this.props.navigation.navigate('Results', { listings: response.listings});
    } else {
      this.setState({ message: 'Location not recognized; please try again.'});
    }
  };

  onSearchPressed = () => {
    const query = urlForQueryAndPage('place_name', this.state.searchText, 1);
    this.executeQuery(query);
  };

  render() {
    const spinner = this.state.isLoading ?
      <ActivityIndicator size='large'/> : null;
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Search for houses to buy!
        </Text>
        <Text style={styles.description}>
          Search by place-name or postcode.
        </Text>
        <View style={styles.flowRight}>
        <TextInput
          underlineColorAndriod={'transparent'}
          style={styles.searchInput}
          onChange={this.onSearchTextChanged}
          placeholder='Search via name or postcode'
        />
          <Button
            value={this.state.searchText}
            style={styles.searchButton}
            onPress={this.onSearchPressed}
            color='#48BBEC'
            title='Go'
          />
        </View>
        <Image source={require('./Resources/house.png')} style={styles.image} />
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center',
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  searchInput: {
  height: 36,
  padding: 4,
  marginRight: 5,
  flexGrow: 1,
  fontSize: 18,
  borderWidth: 1,
  borderColor: '#48BBEC',
  borderRadius: 8,
  color: '#48BBEC',
  },
  searchButton: {
    backgroundColor: 'grey'
  },
  image: {
    width: 217,
    height: 138,
  },
});

export default SearchPage;