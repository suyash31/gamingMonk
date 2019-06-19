import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements'

import * as actions from '../actions';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import * as API from '../utilities/api';

const baseUrl = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';

const styles = StyleSheet.create({
  headerContentStyle: {
    justifyContent: 'space-around',
    paddingRight: 50,
  },
  headerTextStyle: {
    fontSize: 16,
  },
  thumbnailStyle: {
    height: 50,
    width: 50,
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null,
  },
  likeContainer: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
  }
})

class ListItem extends Component {

  constructor() {
    super()
    this.state = {
      like: false,
      dislike: false,
      loading: false,
      noData: false,
    }
  }

  likeHandler = () => {
    const { like } = this.state;
    console.log('like pressed');
    if (like) {
      this.setState({ like: false });
    } else {
      this.setState({ like: true, dislike: false });
    }
    
  }

  dislikeHandler = () => {
    const { dislike } = this.state;
    console.log('dislike pressed');
    if (dislike) {
      this.setState({ dislike: false });
    } else {
      this.setState({ like: false, dislike: true });
    }
  }

  loadMore = () => {
    let start = 0;
    let end = 0;
    this.setState({ loading: true });
    let loadCount = this.props.loadCount + 1;
    let page = Math.ceil(loadCount / 2);
    console.log('load count ', loadCount);
    console.log('page no ', page);

    if (loadCount % 2 !== 0) {
      start = 0;
      end = 10;
    } else {
      start = 10;
      end = 20;
    }
    this.props.loadMore(loadCount);
    API.getPopularMovies(page)
    .then((res) => {
      // if (res.results.length !== 0) {
        this.props.addMovies(res.results.slice(start, end));
        this.setState({ loading: false });
      // } else {
      //   this.setState({ noData: true, loading: false });
      // }
      
    });
  }

  renderDescription = () => {
    const {movie, expanded} = this.props;
    if (expanded) {
      return (
        <CardSection>
          <Text style={{ flex: 1 }}>{movie.overview}</Text>
        </CardSection>
      );
    }
  }
  render() {
    const {id, title, poster_path, backdrop_path, release_date} = this.props.movie;
    const {like, dislike} = this.state;
    const {
      thumbnailStyle,
      headerContentStyle,
      thumbnailContainerStyle,
      headerTextStyle,
      imageStyle
    } = styles;
    return(
      <Card>
        <CardSection>
          <View style={thumbnailContainerStyle}>  
            <Image
              source={{ uri: `${baseUrl}${backdrop_path}`}}
              style={thumbnailStyle}
            />
          </View>
          <View style={headerContentStyle}>
            <Text style={headerTextStyle}>{title}</Text>
            <Text>{release_date}</Text>
          </View>
        </CardSection>

        <CardSection>
          <TouchableWithoutFeedback
            onPress={() => this.props.selectMovie(id)}
          >
            <Image
              style={imageStyle}
              source={{ uri: `${baseUrl}${poster_path}`}}
            />
          </TouchableWithoutFeedback>
        </CardSection>

        {this.renderDescription()}

        <CardSection>
          <View style={styles.likeContainer}>
            <Icon
              raised
              name='thumbs-up'
              type='font-awesome'
              color={like ? '#f50' : '#ddd'}
              onPress={this.likeHandler}
            />
            <Icon
              raised
              name='thumbs-down'
              type='font-awesome'
              color={dislike ? '#f50' : '#ddd'}
              onPress={this.dislikeHandler}
            />
          </View>
        </CardSection>

        {
          this.props.lastMovieId === id &&
          <View>
            {
              this.state.loading ?
              <View style={{alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#ddd" />
              </View> :
              <CardSection>
                {
                  this.state.noData ?
                  <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center'}}>
                    <Text>That's all for Popular Movies </Text>
                  </View> :
                  <Button  onPress={this.loadMore}>
                    Load More ...
                  </Button>
                }
              </CardSection>
            }
          </View>
        }

      </Card>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedMovieId === ownProps.movie.id;
  return { expanded, loadCount: state.loadCount };
}

export default connect(mapStateToProps, actions)(ListItem);