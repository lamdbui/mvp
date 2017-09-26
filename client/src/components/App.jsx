class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: []
    };
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/pets',
      success: (data) => {
        // console.log('*** GRABBED DATA:', data);
        this.setState({pets: data});
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
        <PetList pets={this.state.pets}></PetList>
      </div>
    );
  }
}

window.App = App;
