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
        <h4>{this.props.pet.name.toUpperCase()}</h4>
        <img src={this.props.pet.photoUrls[1]}></img>
        <div><b>Sex:</b> {(this.props.pet.sex === 'F') ? 'Female' : 'Male'}</div>
        <div><b>Age:</b> {this.props.pet.ageClass}</div>
        <button type="button" onClick={this.handleFavoriteClick}>Add to favorites</button>
        <div>
          <table>
            <tr>
              <th>City</th>
              <th>State</th>
              <th>Phone Number</th>
              <th>Email</th>
            </tr>
            <tr>
              <td>{this.props.pet.contactCity}</td>
              <td>{this.props.pet.contactStart}</td>
              <td>{this.props.pet.contactPhoneNumber}</td>
              <td>{this.props.pet.contactEmail}</td>
            </tr>
          </table>
        </div>
        <p>{this.props.pet.description}</p>
      </div>
    );
  }
}
