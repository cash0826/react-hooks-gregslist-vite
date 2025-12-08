import Header from "./Header";
import ListingForm from "./ListingForm";
import ListingsContainer from "./ListingsContainer";
import { useState, useEffect } from "react";

function App() {
  const [listings, setListings] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:6001/listings")
      .then((r) => {
        if(!r.ok) { throw new Error("Failed to retrieve listings")}
        return r.json()
      })
      .then(listings => setListings(listings))
      .catch(err => console.log(err))
  }, []);

  function handleSubmitListing(addListing){
    setListings([...listings, addListing])
  }

  return (
    <div className="app">
      <Header />
      <ListingForm onSubmitListing={handleSubmitListing}/>
      <ListingsContainer listings={listings}/>
    </div>
  );
}

export default App;
