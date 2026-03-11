export const company = "GreensMart"

export const title = `${company} Groceries`;

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
            },
            {
                name: "Banana",
                price: 7,
            },
            {
                name: "Mandarin",
                price: 7,
            },
            {
                name: "Grapes",
                price: 10,
            },
            {
                name: "Watermelon",
                price: 6,
            },
        ]
    },
    {
        category: "Vegetables",
        items: [
            {
                name: "Tomato",
                price: 5,
            },
            {
                name: "Potato",
                price: 8,
            },
            {
                name: "Carrot",
                price: 4,
            },
            {
                name: "Onion",
                price: 4,
            },
            {
                name: "Cabbage",
                price: 2,
            },
        ]
    },
    {
        category: "Drinks",
        items: []
    },
    {
        category: "Snacks",
        items: []
    },
    {
        category: "Dairy Products",
        items: []
    },
    {
        category: "Bakery Products",
        items: []
    },
    {
        category: "Dry Foods",
        items: []
    }
].sort();