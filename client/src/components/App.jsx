class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: [],
      currentPets: []
    };

    this.handleShowFavoritesClick = this.handleShowFavoritesClick.bind(this);
    this.handleShowAllClick = this.handleShowAllClick.bind(this);
  }

  handleShowFavoritesClick() {
    console.log('HANDLE FAVORITES CLICK');
  }

  handleShowAllClick() {
    console.log('HANDLE SHOW ALL CLICK');
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/pets',
      success: (data) => {
        // console.log('*** GRABBED DATA:', data);
        this.setState({pets: data});
        this.setState({currentPets: data});
        // console.log('*** NEW DATA: ', this.state.pets.length);
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
        <PetList pets={this.state.pets}></PetList>
      </div>
    );
  }
}

window.App = App;
