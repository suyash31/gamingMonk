import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList } from 'react-native';
import ListItem from './ListItem';
import * as actions from '../actions';
import * as API from '../utilities/api';

class Movies extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    console.log('this ', this.props.pageCount);
    API.getPopularMovies()
    .then(res => {
      if (res.results.length > 10) {
        this.props.addMovies(res.results.slice(0,10));
      } else {
        this.props.addMovies(res.results);
      }
    })
  }

  renderMovieRow = ({item}) => {
    const length = this.props.moviesList.length;
    const lastMovieId = this.props.moviesList[length -1].id;

    return <ListItem movie = {item} lastMovieId = {lastMovieId}/>;
  }
  render() {
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
  return {moviesList : state.moviesList, pageCount: state.pageCount}
}

export default connect(mapStateToProps, actions)(Movies);