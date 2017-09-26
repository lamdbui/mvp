class PetListEntry extends React.Component {
  constructor(props) {
    super(props);

    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  handleFavoriteClick() {
    // TODO: should we hit the database each time?
    $.ajax({
      method: 'POST',
      url: '/favorites',
      data: JSON.stringify(this.props.pet),
      success: (data) => {
        console.log('*** GRABBED DATA:', data);
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
        <img src={this.props.pet.photoUrls[1]}></img>
        <button type="button" onClick={this.handleFavoriteClick}>Add to favorites</button>
        <p>{this.props.pet.description}</p>
      </div>
    );
  }
}
