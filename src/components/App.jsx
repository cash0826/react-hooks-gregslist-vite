import Header from "./Header";
import ListingForm from "./ListingForm";
import ListingsContainer from "./ListingsContainer";
import { useState, useEffect } from "react";

function App() {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    fetch("http://localhost:6001/listings")
      .then((r) => {
        if(!r.ok) { throw new Error("Failed to retrieve listings")}
        return r.json()
      })
      .then(listings => setListings(listings))
      .catch(err => console.log(err))
  }, []);

  const addListing = newListing => setListings(previousListings => [...previousListings, newListing])

  const updateListing = updatedListing => setListings(previousListings => previousListings.map(listing => listing.id === updatedListing.id ? updatedListing : listing))

  const deleteListing = deletedListingId => setListings(previousListings => previousListings.filter(listing => listing.id !== deletedListingId))

  const displayedListings = listings.filter((listing) =>
    listing.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <Header onSearch={setSearch} searchTerm={search} />
      <ListingForm addListing={addListing} />
      <ListingsContainer listings={displayedListings} updateListing={updateListing} deleteListing={deleteListing} />
    </div>
  );
}

export default App;
