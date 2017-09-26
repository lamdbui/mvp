class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: [],
      currentPets: [],
      filterByFavorites: false
    };

    this.handleShowFavoritesClick = this.handleShowFavoritesClick.bind(this);
    this.handleShowAllClick = this.handleShowAllClick.bind(this);
  }

  handleShowFavoritesClick() {
    $.ajax({
      method: 'GET',
      url: '/favorites',
      success: (data) => {
        this.setState({ filterByFavorites: true, currentPets: data });
      },
      error: (data) => {
        console.log('*** THE SADNESS -', data);
        this.setState({ filterByFavorites: true });
      }
    });
  }

  handleShowAllClick() {
    this.setState({ filterByFavorites: true, currentPets: this.state.pets });
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/pets',
      success: (data) => {
        this.setState({ pets: data });
        this.setState({ currentPets: data });
      },
      error: (data) => {
        console.log('*** THE SADNESS -', data);
      }
    });
  }

  render() {
    return (
      <div>
        <h2>DogAdopt.us</h2>
        <button type="button" onClick={this.handleShowFavoritesClick}>Show Favorites</button>
        <button type="button" onClick={this.handleShowAllClick}>Show All</button>
        <PetList pets={this.state.currentPets}></PetList>
      </div>
    );
  }
}

window.App = App;
