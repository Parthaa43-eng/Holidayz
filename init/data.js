const hotelListings = [
    {
        title: "Royal Palace Retreat",
        description: "A grand heritage hotel offering a luxurious stay in the heart of Jaipur.",
        image: {
            filename: "listingimage",
            url: "https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        price: 12000,
        location: "Jaipur, Rajasthan",
        country: "India",
        geometry: {
            type: "Point",
            coordinates: [75.7873, 26.9124] // Jaipur
        }
    },
    {
        title: "Beachfront Bliss Resort",
        description: "A scenic beach resort with ocean-facing rooms and premium amenities.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        price: 18000,
        location: "Goa, India",
        country: "India",
        geometry: {
            type: "Point",
            coordinates: [73.8567, 15.2993] // Goa
        }
    },
    {
        title: "Himalayan Serenity Lodge",
        description: "Nestled in the mountains, this lodge offers breathtaking views of the Himalayas.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        price: 9000,
        location: "Manali, Himachal Pradesh",
        country: "India",
        geometry: {
            type: "Point",
            coordinates: [77.1892, 32.2396] // Manali
        }
    },
    {
        title: "Backwaters Luxury Retreat",
        description: "A tranquil stay in the lush greenery of Kerala’s backwaters.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        price: 15000,
        location: "Alleppey, Kerala",
        country: "India",
        geometry: {
            type: "Point",
            coordinates: [76.3375, 9.4981] // Alleppey
        }
    },
    {
        title: "The Grand Mumbai Hotel",
        description: "An iconic luxury hotel in the financial capital of India.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        price: 25000,
        location: "Mumbai, Maharashtra",
        country: "India",
        geometry: {
            type: "Point",
            coordinates: [72.8777, 19.0760] // Mumbai
        }
    },
    {
        title: "The Varanasi Riverside Inn",
        description: "Experience spiritual bliss at this riverside inn along the holy Ganges.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1606046604972-77cc76aee944?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        price: 8000,
        location: "Varanasi, Uttar Pradesh",
        country: "India",
        geometry: {
            type: "Point",
            coordinates: [82.9739, 25.3176] // Varanasi
        }
    }
];

module.exports = { data: hotelListings };
