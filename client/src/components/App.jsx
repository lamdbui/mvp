class App extends React.Component {
  constructor(props) {
    super(props);

    this.ALL_BREEDS = 'ALL BREEDS';

    this.state = {
      breeds: [],
      breedCounter: {},
      currentSelectedBreed: 'ALL BREEDS',
      pets: [],
      currentPets: [],
      filterByFavorites: false,
      currentLocation: 'san francisco, ca'
    };

    this.handleShowFavoritesClick = this.handleShowFavoritesClick.bind(this);
    this.handleShowAllClick = this.handleShowAllClick.bind(this);
    this.setLocationStateHandler = this.setLocationStateHandler.bind(this);
    this.handleBreedSelect = this.handleBreedSelect.bind(this);
  }

  setLocationStateHandler(location) {
    // TODO: do some validation of location here (helper function)
    console.log('LOCATION:', location);

    let url = (location === undefined || location === '') ? '/pets' : `/pets?location=${location}`;
    $.ajax({
      method: 'GET',
      url: url,
      success: (data) => {

        // count all the breeds
        let breedCounter = {};
        data.forEach(pet => {
          // console.log('*** BREED:', pet.breed);
          let currentPetbreeds = pet.breed;
          currentPetbreeds.forEach(breed => {
            breedCounter[breed] = (breedCounter[breed] === undefined) ? 1 : breedCounter[breed] + 1;
          });
        });

        // console.log('*** BC:', breedCounter);

        this.setState({
          pets: data,
          currentPets: data,
          breedCounter: breedCounter
        });
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

  handleBreedSelect(event) {
    let selectedBreed = event.target.value;
    console.log('*** SELECTED BREED:', selectedBreed);
    // reset to show all pets when ALL_BREEDS is selected
    if (selectedBreed === this.ALL_BREEDS) {
      this.setState({
        currentSelectedBreed: this.ALL_BREEDS,
        currentPets: this.state.pets
      });
    } else {
      // do filtering here
      let filteredPets = this.state.pets.filter(pet => {
        return pet.breed.includes(selectedBreed);
      });
      // console.log('*** FILTERED PETS:', filteredPets);
      this.setState({
        currentSelectedBreed: event.target.value,
        currentPets: filteredPets
      });
    }
  }

  handleShowAllClick() {
    this.setState({ filterByFavorites: false, currentPets: this.state.pets });
  }

  componentDidMount() {
    // TODO: maybe put these in separate util functions
    $.ajax({
      method: 'GET',
      url: '/pets',
      success: (data) => {

        // count all the breeds
        let breedCounter = {};
        data.forEach(pet => {
          // console.log('*** BREED:', pet.breed);
          let currentPetbreeds = pet.breed;
          currentPetbreeds.forEach(breed => {
            breedCounter[breed] = (breedCounter[breed] === undefined) ? 1 : breedCounter[breed] + 1;
          });
        });

        console.log('*** BC:', breedCounter);

        this.setState({
          pets: data,
          currentPets: data,
          breedCounter: breedCounter
        });
      },
      error: (data) => {
        console.log('*** THE SADNESS -', data);
      }
    });

    $.ajax({
      method: 'GET',
      url: '/breeds',
      success: (data) => {
        let breedCounter = {};
        // initialize our breedList
        data.forEach(breed => {
          console.log('*** BREED:', breed);
          breedCounter[breed] = 0;
        });

        console.log('*** BREED C:', breedCounter);
        //
        // console.log('*** BC:', breedCounter);
        this.setState({ breeds: data });
      },
      error: (data) => {
        console.log('*** THE SADNESS -', data);
        // this.setState({ filterByFavorites: true });
      }
    });
  }

  render() {
    return (
      <div>
        <h2>DogAdopt.us</h2>
        <button type="button" onClick={this.handleShowFavoritesClick}>Show Favorites</button>
        <button type="button" onClick={this.handleShowAllClick}>Show All</button>
        <p>
          <label>Select Breed: </label>
          <select id="breed_list" onChange={this.handleBreedSelect}>
            <option value={this.ALL_BREEDS}>{this.ALL_BREEDS}</option>
            {this.state.breeds.map((breed, key) => <option key={key} value={breed}>{breed} - {this.state.breedCounter[breed]}</option>)}
          </select>
        </p>
        <Search currentLocation={this.state.currentLocation} setLocationCallback={this.setLocationStateHandler}></Search>
        <PetList pets={this.state.currentPets} currentBreed={this.state.currentSelectedBreed} favorites={this.state.filterByFavorites}></PetList>
      </div>
    );
  }
}
