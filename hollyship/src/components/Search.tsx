import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';

const axios = require('axios');

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    Authorization:
      'Basic Nzc0MGE3N2U4MDgwNDBhNmI5NDk0ZDk4NjFlZGIxYjA=:YjBjYmY5MWY0YzY1NDY2YTg1YmY5NjhlODU4MmJhZDM=',
  },
  body: {
    grant_type: 'client_credentials',
  },
};

axios.post(authOptions.url, {
  headers: authOptions.headers,
  body: authOptions.body.grant_type,
}).then;

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }
  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;
    return (
      <SearchBar
        placeholder="음악을 검색해주세요"
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  }
}
