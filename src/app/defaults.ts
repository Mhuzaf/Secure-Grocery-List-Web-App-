export const company = "GreensMart"

export const title = `${company} Groceries`;

// TODO: make this a table
// and store it like a map...??
// TODO: make this less miserable using proper OOP
export const defaultLocations = [
    {
        city: "Dubai",
        districts: ["Jumeirah", "Deira", "Al Karama", "Bur Dubai", "Business Bay"].sort()
    },
    {
        city: "Sharjah",
        districts: ["Al Ruqa Al Hamra", "Rahmaniya Suburb", "Al Sajaah"].sort()
    },
    {
        city: "Ajman",
        districts: ["Al Muwaihat 3", "Al Talia 1", "Al Talia 2"].sort()
    }
]

export const defaultProducts = [
    {
        category: "Fruits",
        items: [
            {
                name: "Apple",
                price: 5,
                perKg: true
            },
            {
                name: "Banana",
                price: 7,
                perKg: true
            },
            {
                name: "Mandarin",
                price: 7,
                perKg: true
            },
            {
                name: "Grapes",
                price: 10,
                perKg: true
            },
            {
                name: "Watermelon",
                price: 6,
                perKg: true
            },
            {
                name: "Tomato",
                price: 5,
                perKg: true
            },
        ].sort((a, b) => a.name.localeCompare(b.name))
    },
    {
        category: "Vegetables",
        items: [
            {
                name: "Potato",
                price: 8,
                perKg: true
            },
            {
                name: "Carrot",
                price: 4,
                perKg: true
            },
            {
                name: "Onion",
                price: 4,
                perKg: true
            },
            {
                name: "Cabbage",
                price: 2,
                perKg: true
            },
        ].sort((a, b) => a.name.localeCompare(b.name))
    },
    {
        category: "Dry Snacks",
        items: [
        ].sort((a, b) => a.name.localeCompare(b.name))
    },
    {
        category: "Dairy Products",
        items: [].sort((a, b) => a.name.localeCompare(b.name))
    },
    {
        category: "Bakery Products",
        items: [].sort((a, b) => a.name.localeCompare(b.name))
    },
    {
        category: "Nuts",
        items: [].sort((a, b) => a.name.localeCompare(b.name))
    }
].sort();