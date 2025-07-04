const axios = require('axios');

module.exports.getAddressCoordinate = async (address) => {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API;
        
        if (!address || address.trim() === '') {
            throw new Error('Address is required');
        }
        
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
        
        const response = await axios.get(url);
        
        if (response.data.status !== 'OK') {
            throw new Error(`Geocoding failed: ${response.data.status}`);
        }
        
        if (!response.data.results || response.data.results.length === 0) {
            throw new Error('No results found for the given address');
        }
        
        const location = response.data.results[0].geometry.location;
        
        return {
            lat: location.lat,
            lng: location.lng
        };
        
    } catch (error) {
        console.error('Error getting coordinates:', error.message);
        throw error;
    }
};

// Example usage:
// const { getAddressCoordinate } = require('./your-module');
// 
// (async () => {
//     try {
//         const coords = await getAddressCoordinate('1600 Amphitheatre Parkway, Mountain View, CA');
//         console.log('Coordinates:', coords);
//         // Output: { lat: 37.4224764, lng: -122.0842499 }
//     } catch (error) {
//         console.error('Failed to get coordinates:', error.message);
//     }
// })();


module.exports.getDistanceTime = async (origin, destination) => {
    try {
        if (!origin || !destination) {
            throw new Error('Origin and destination are required');
        }

        const apiKey = process.env.GOOGLE_MAPS_API;
        

        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}&units=metric`;

        const response = await axios.get(url);

        if (response.data.status !== 'OK') {
            throw new Error(`Distance Matrix API failed: ${response.data.status}`);
        }

        if (!response.data.rows || response.data.rows.length === 0) {
            throw new Error('No results found for the given origin and destination');
        }

        const element = response.data.rows[0].elements[0];

        if (element.status !== 'OK') {
            throw new Error(`Route calculation failed: ${element.status}`);
        }

        return {
            distance: {
                text: element.distance.text,
                value: element.distance.value // in meters
            },
            duration: {
                text: element.duration.text,
                value: element.duration.value // in seconds
            },
            origin: response.data.origin_addresses[0],
            destination: response.data.destination_addresses[0]
        };

    } catch (error) {
        console.error('Error getting distance and time:', error.message);
        throw error;
    }
};


module.exports.getAutoCompleteSuggestions = async (input) => {
    try {
        if (!input) {
            throw new Error('query is required!');
        }

        const apiKey = process.env.GOOGLE_MAPS_API;
        
        const trimmedInput = input.trim();
        if (trimmedInput === '') {
            throw new Error('Input cannot be empty');
        }

        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(trimmedInput)}&key=${apiKey}`;

        const response = await axios.get(url);

        if (response.data.status !== 'OK' && response.data.status !== 'ZERO_RESULTS') {
            throw new Error(`Places Autocomplete API failed: ${response.data.status}`);
        }
        if (response.data.status === 'ZERO_RESULTS' || !response.data.predictions) {
            return {
                suggestions: [],
                status: 'ZERO_RESULTS'
            };
        }

        const suggestions = response.data.predictions;
        // // Format the suggestions
        // const suggestions = response.data.predictions.map(prediction => ({
        //     place_id: prediction.place_id,
        //     description: prediction.description,
        //     main_text: prediction.structured_formatting?.main_text || '',
        //     secondary_text: prediction.structured_formatting?.secondary_text || '',
        //     types: prediction.types || []
        // }));

        return {
            suggestions,
            status: 'OK'
        };

    } catch (error) {
        console.error('Error getting autocomplete suggestions:', error.message);
        throw error;
    }
};