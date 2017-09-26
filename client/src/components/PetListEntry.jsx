var PetListEntry = (props) => (
  <div>
    <h4>{props.pet.name}</h4>
    <img src={props.pet.photoUrls[0]}></img>
    <p>{props.pet.description}</p>
  </div>
);
