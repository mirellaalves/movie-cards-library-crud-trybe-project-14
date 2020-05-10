import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { MovieForm } from '../components';
import * as movieAPI from '../services/movieAPI';
import Loading from '../components/Loading';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
      shouldRedirect: false,
      movie: undefined,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    movieAPI.getMovie(this.props.match.params.id)
    .then((response) => this.setState({ movie: response, status: '' }));
  }

  handleSubmit(updatedMovie) {
    movieAPI.updateMovie(updatedMovie);
    this.setState({ movie: updatedMovie, shouldRedirect: true });
  }

  render() {
    const { status, shouldRedirect, movie } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/" />;
    }

    if (status === 'loading') {
      return <Loading />;
    }

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={movie} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

EditMovie.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default EditMovie;
