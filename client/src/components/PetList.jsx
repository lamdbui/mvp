var PetList = (props) => (
  <div>
    <h3>Available {
      (!props.favorites && props.currentBreed !== 'ALL BREEDS') ? `${props.currentBreed.toUpperCase()}S` : 'DOGS'
    } for Adoption - ({props.pets.length})</h3>
    {props.pets.map((pet, k) => <PetListEntry key={k} pet={pet} />)}
  </div>
);
