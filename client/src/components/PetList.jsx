class PetList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Available Dogs for Adoption - ({this.props.pets.length})</h3>
        {this.props.pets.map((pet, k) => <PetListEntry key={k} pet={pet} />)}
      </div>
    );
  }
}

window.PetList = PetList;
