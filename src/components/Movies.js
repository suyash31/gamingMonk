import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, ActivityIndicator } from 'react-native';
import ListItem from './ListItem';
import * as actions from '../actions';
import * as API from '../utilities/api';

class Movies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  componentDidMount = () => {
    API.getPopularMovies()
    .then(res => {
        this.props.addMovies(res.results.slice(0,10));
        this.setState({ loading: false });
    })
  }

  renderMovieRow = ({item}) => {
    const length = this.props.moviesList.length;
    const lastMovieId = this.props.moviesList[length -1].id;

    return <ListItem movie = {item} lastMovieId = {lastMovieId}/>;
  }
  render() {
    if (this.state.loading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#ddd" />
        </View>
      );
    }
    return (
      <View>
        <FlatList
          data={this.props.moviesList}
          renderItem={this.renderMovieRow}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {moviesList : state.moviesList, loadCount: state.loadCount}
}

export default connect(mapStateToProps, actions)(Movies);