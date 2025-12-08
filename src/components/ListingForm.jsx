import { useState } from 'react';

const ListingForm = ({ onSubmitListing }) => {
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [location, setLocation] = useState("");
    
    function handleSubmit(e) {
        e.preventDefault();
        const newListing = {
            description: description,
            imageUrl: imageUrl,
            location: location,
            favorite: false,
        }
        fetch("http://localhost:6001/listings", {
            method: "POST",
            headers: {"Content-Type": "application/json",
            },
            body: JSON.stringify(newListing),
        })
        .then(r => {
            if (r.ok) {
                return r.json()
            } else {
                console.log("item failed to create")
            }
        })
        .then(addListing => onSubmitListing(addListing))
        .catch(err => console.log(err))
    }

    return (
        <div className="form-container">
            <p>Create a New Listing</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="new-desc">Description:</label>
                <input id="new-desc" type="text" name="description" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                <label htmlFor="new-img">Image URL:</label>
                <input id="new-img" type="text" name="image" placeholder="image" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
                <label htmlFor="new-loc">Location:</label>
                <input id="new-loc" type="text" name="location" placeholder="location" value={location} onChange={(e) => setLocation(e.target.value)}/>
                <input type="submit" value=" Create Listing "/>
            </form>
        </div>
    );
}

export default ListingForm;
