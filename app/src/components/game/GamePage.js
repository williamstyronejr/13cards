import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { ajaxRequest } from '../../utils/utils';
import GameQueue from './GameQueue';
import GameBoard from './GameBoard';

class GamePage extends Component {
  state = {
    roomId: this.props.match.params.roomId,
    matchStart: false,
    matchError: null
  };

  /**
   * On component mount, grab room data.
   */
  componentDidMount() {
    const { roomId } = this.state;

    if (roomId) {
      ajaxRequest(`/game/${roomId}/data`, 'get')
        .then(res => {
          this.setState({
            matchStart: res.data.ready
          });
        })
        .catch(err => {
          this.setState({
            matchError: err.response.data
          });
        });
    }
  }

  render() {
    const { roomId, matchStart, matchError } = this.state;

    if (!roomId || matchError) return <Redirect to="/" />;

    if (!matchStart) return <GameQueue playerCount={1} roomId={roomId} />;

    return <GameBoard roomId={roomId} />;
  }
}

export default GamePage;
