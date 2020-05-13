import React, { Component } from 'react';
import Game from './game/Game';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      genre: [],
      sort: '',
      error: null
    }
  }
    setSearch(genre) {
      this.setState({
        genre
      });
    }
  
    setSort(sort) {
      this.setState({
        sort
      });
    }
  
    handleSubmit(e) {
      e.preventDefault();
      const baseUrl = 'http://localhost:8000/apps';
      const params = [];
      if (this.state.sort) {
        params.push(`sort=${this.state.sort}`);
      }
      if (this.state.genre) {
        params.push(`genre=${this.state.genre}`);
      }
      
      const query = params.join('&');
      const url = `${baseUrl}?${query}`;
  
      fetch(url)
      .then(res => {
        console.log(res)
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        console.log(data)
        this.setState({
          games: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: 'Sorry, could not get games at this time.'
        });
      })

  }

  render() {
    const games = this.state.games.map((game, i) => {
      return <Game {...game} key={i}/>
    })
    return (
      <div className='App'>
        <h1>Playstore Games</h1>
        <div className="search">
          <form onSubmit={e => this.handleSubmit(e)}>

            <label htmlFor="sort">Sort: </label>
            <select id="sort" name="sort" onChange={e => this.setSort(e.target.value)}>
              <option value="">None</option>
              <option value="App">App</option>
              <option value="Rank">Rank</option>
            </select>
            <label htmlFor="genre">Genre: </label>
            <select id="genre" name="genre" onChange={e => this.setSort(e.target.value)}>
              <option value="">None</option>
              <option value="Action">Action</option>
              <option value="Puzzle">Puzzle</option>
              <option value="Strategy">Strategy</option>
              <option value="Casual">Casual</option>
              <option value="Arcade">Arcade</option>
              <option value="Card">Card</option>
            </select>
            <button type="submit">Search</button>
          </form>
          <div className="App_error">{ this.state.error }</div>
        </div>
        {games}
      </div>
    )
  }
}

