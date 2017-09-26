class PetListEntry extends React.Component {
  constructor(props) {
    super(props);

    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  handleFavoriteClick() {
    console.log('CLICKED FAVORITE: ', this.props.pet.petId);
    // TODO: should we hit the database each time?
    $.ajax({
      method: 'POST',
      url: '/favorites',
      data: JSON.stringify(this.props.pet),
      success: (data) => {
        console.log('*** GRABBED DATA:', data);
        // this.setState({pets: data});
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
        <h4>{this.props.pet.name}</h4>
        <img src={this.props.pet.photoUrls[0]}></img>
        <button type="button" onClick={this.handleFavoriteClick}>Add to favorites</button>
        <p>{this.props.pet.description}</p>
      </div>
    );
  }
}

// var PetListEntry = (props) => (
//   <div>
//     <h4>{props.pet.name}</h4>
//     <img src={props.pet.photoUrls[0]}></img>
//     <button type="button">Add to favorites</button>
//     <p>{props.pet.description}</p>
//   </div>
// );
