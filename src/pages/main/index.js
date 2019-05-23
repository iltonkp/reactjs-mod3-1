import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as FavoriteActions from '../../strore/action/favorites';

class Main extends Component {
  state = {
    repositoryInput: '',
  };

  static propTypes = {
    addFavoriteRequest: PropTypes.func.isRequired,
    favorites: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.oneOfType([null, PropTypes.string]),
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          description: PropTypes.string,
          url: PropTypes.string,
        }),
      ),
    }).isRequired,
  };

  handleAddRepository = (event) => {
    const { repositoryInput } = this.state;
    const { addFavoriteRequest } = this.props;
    event.preventDefault();
    addFavoriteRequest(repositoryInput);

    this.setState({ repositoryInput: '' });
  };

  render() {
    const { repositoryInput } = this.state;
    const { favorites } = this.props;

    return (
      <Fragment>
        <form onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />

          <button type="submit">Adicionar</button>

          {favorites.loading && <span>Carregando...</span>}
          {!!favorites.error && <span style={{ color: '#f00' }}>{favorites.error}</span>}
        </form>

        <ul>
          {favorites.data.map(favorite => (
            <li key={favorite.id}>
              <p>
                <strong>{favorite.name}</strong> {favorite.description}
              </p>
              <a href={favorite.url}>Acessar</a>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites,
});

const mapDispatchToProps = dispatch => bindActionCreators(FavoriteActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
