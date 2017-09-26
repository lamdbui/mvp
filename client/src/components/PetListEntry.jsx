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
      <div className="pet-list-entry">
        <hr></hr>
        <h3>{this.props.pet.name.toUpperCase()}</h3>
        <div className="pet-list-entry-profile">
          <img src={this.props.pet.photoUrls[1]}></img>
          {/* <button type="button" onClick={this.handleFavoriteClick}>Add to favorites</button> */}
        </div>
        {/* <button type="button" onClick={this.handleFavoriteClick}>Add to favorites</button> */}
        <div className="pet-list-entry-details">
          <div><b>Sex:</b> {(this.props.pet.sex === 'F') ? 'Female' : 'Male'}</div>
          <div><b>Age:</b> {this.props.pet.ageClass}</div>

          {/* <button type="button" onClick={this.handleFavoriteClick}>Add to favorites</button> */}
          <div>
            <table>
              <tbody>
                <tr>
                  <th>City</th>
                  {/* <th>State</th> */}
                  <th>Phone Number</th>
                  <th>Email</th>
                </tr>
                <tr>
                  <td>{this.props.pet.contactCity}</td>
                  {/* <td>{this.props.pet.contactState}</td> */}
                  <td>{this.props.pet.contactPhoneNumber}</td>
                  <td>{this.props.pet.contactEmail}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* <button type="button" onClick={this.handleFavoriteClick}>Add to favorites</button> */}
        <div>
          <button type="button" onClick={this.handleFavoriteClick}>Add to favorites</button>
          <h4>Description</h4>
          <p>{this.props.pet.description}</p>
        </div>
      </div>
    );
  }
}
