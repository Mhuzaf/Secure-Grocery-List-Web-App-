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

// The avgWeight is in grams.
export const defaultProducts = [
    {
        category: "Fruits",
        items: [
            {
                name: "Apple",
                price: 5,
                avgWeight: 200
            },
            {
                name: "Banana",
                price: 7,
                avgWeight: 120
            },
            {
                name: "Mandarin",
                price: 7,
                avgWeight: 120
            },
            {
                name: "Grapes",
                price: 10,
                avgWeight: 6
            },
            {
                name: "Watermelon",
                price: 6,
                avgWeight: 2500
            },
            {
                name: "Tomato",
                price: 5,
                avgWeight: 130
            },
        ].sort((a, b) => a.name.localeCompare(b.name))
    },
    {
        category: "Vegetables",
        items: [
            {
                name: "Potato",
                price: 8,
                avgWeight: 380
            },
            {
                name: "Carrot",
                price: 4,
                avgWeight: 110
            },
            {
                name: "Onion",
                price: 4,
                avgWeight: 340
            },
            {
                name: "Cabbage",
                price: 2,
                avgWeight: 750
            },
        ].sort((a, b) => a.name.localeCompare(b.name))
    },
    {
        category: "Dry Snacks",
        items: [
            {
                name: "Betty Crocker Chocolate Chip cookies",
                price: 32,
                fileName: "choco_chip_cookies"
            },
            {
                name: "Britannia NutriChoice Whole Wheat Salted Crackers",
                price: 24,
                fileName: "crackers"
            },
            {
                name: "Ritz Crackers",
                price: 36,
                fileName: "ritz"
            },
            {
                name: "Parle NutriCrunch Honey&Oats Digestive cookies",
                price: 28,
                fileName: "nutricrunch"
            }
        ].sort((a, b) => a.name.localeCompare(b.name))
    },
    {
        category: "Dairy Products",
        items: [
            {
                name: "Al Rawabi Full Cream 2 litres Milk",
                price: 12.50,
                fileName: "full_cream"
            },
            {
                name: "Al Rawabi Low Fat 2 litres Milk",
                price: 12.50,
                fileName: "low_fat"
            },
            {
                name: "Al Rawabi Full Cream 400g Yogurt",
                price: 4.50,
                fileName: "yogurt"
            },
            {
                name: "Puck Mozzarella Cheese Slices",
                price: 12.50,
                fileName: "mozzarella"
            }
        ].sort((a, b) => a.name.localeCompare(b.name))
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