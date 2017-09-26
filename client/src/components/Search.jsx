class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ location: event.target.value });
  }

  handleSubmit() {
    this.props.setLocationCallback(this.state.location);
  }

  render() {
    return (
      <div>
        <p>Current Location: {this.props.currentLocation.toUpperCase()}</p>
        <input value={this.state.location} onChange={this.handleInputChange}></input>
        <button onClick={this.handleSubmit}>Search Location</button>
      </div>
    );
  }
}
