class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: [],
      currentPets: [],
      filterByFavorites: false,
      currentLocation: 'san francisco, ca'
    };

    this.handleShowFavoritesClick = this.handleShowFavoritesClick.bind(this);
    this.handleShowAllClick = this.handleShowAllClick.bind(this);
    this.setLocationStateHandler = this.setLocationStateHandler.bind(this);
  }

  setLocationStateHandler(location) {

    // TODO: Fetch actual location data here
    // TODO: do some validation of location here (helper function)

    console.log('LOCATION:', location);

    let url = (location === undefined || location === '') ? '/pets' : `/pets?location=${location}`;
    $.ajax({
      method: 'GET',
      url: url,
      success: (data) => {
        this.setState({ pets: data, currentPets: data });
      },
      error: (data) => {
        console.log('*** THE SADNESS -', data);
      }
    });


    this.setState({ currentLocation: location });
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
        this.setState({ pets: data, currentPets: data });
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
        <Search currentLocation={this.state.currentLocation} setLocationCallback={this.setLocationStateHandler}></Search>
        <PetList pets={this.state.currentPets}></PetList>
      </div>
    );
  }
}

window.App = App;
