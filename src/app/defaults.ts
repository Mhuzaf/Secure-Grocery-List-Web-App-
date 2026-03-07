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
                price: 0,
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
        ].sort()
    },
    {
        category: "Vegetables",
        items: [].sort()
    },
    {
        category: "Drinks",
        items: [].sort()
    },
    {
        category: "Snacks",
        items: [].sort()
    },
    {
        category: "Dairy Products",
        items: [].sort()
    },
    {
        category: "Bakery Products",
        items: [].sort()
    },
    {
        category: "Dry Foods",
        items: [].sort()
    }
]