const axios = require('axios');

const weeklySpecials = [
	{
		id: 3,
		name: "Steak & Cheese w/Loaded Fries",
		description: "Weekly Specials",
		price: 12.00
	},
	{
		id: 4,
		name: "Deluxe Burger w/Bacon",
		description: "Weekly Specials",
		price: 10.00
	},
	{
		id: 5,
		name: "6 Piece Wings",
		description: "Weekly Specials",
		price: 8.00
	},
	{
		id: 6,
		name: "12 Piece Wings",
		description: "Weekly Specials",
		price: 15.00
	}
];

weeklySpecials.forEach(special => {
	axios.post('http://localhost:3000/api/menu', special, { timeout: 5000 })
		.then(response => {
			console.log(`Response for ${special.name}:`, response.data);
		})
		.catch(error => {
			if (error.response) {
				console.error(`Error for ${special.name}:`, error.response.data);
			} else if (error.request) {
				console.error(`No response received for ${special.name}:`, error.request);
			} else {
				console.error(`Error setting up request for ${special.name}:`, error.message);
			}
		});
});