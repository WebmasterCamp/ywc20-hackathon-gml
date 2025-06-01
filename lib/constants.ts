export const MOCK_BARS = [
  {
    id: "1",
    name: "The Crafty Brew",
    description: "A cozy craft beer bar with over 50 local and international brews on tap. Live music every Friday and Saturday night.",
    image: "https://images.pexels.com/photos/1057840/pexels-photo-1057840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.7,
    location: "123 Brewery Lane, Downtown",
    activeUsers: 42,
    category: "pub",
    features: ["Live Music", "Craft Beer", "Food Served"]
  },
  {
    id: "2",
    name: "Skyline Lounge",
    description: "Elegant rooftop bar with stunning city views. Known for creative cocktails and upscale ambiance.",
    image: "https://images.pexels.com/photos/2697530/pexels-photo-2697530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.5,
    location: "500 Highrise Ave, Financial District",
    activeUsers: 28,
    category: "cocktail",
    features: ["Rooftop", "Cocktails", "Upscale"]
  },
  {
    id: "3",
    name: "Corner Pocket",
    description: "Classic sports bar with pool tables, darts, and big screens showing all the major games.",
    image: "https://images.pexels.com/photos/1267360/pexels-photo-1267360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.2,
    location: "789 Sports Blvd, Westside",
    activeUsers: 65,
    category: "sports",
    features: ["Sports", "Pool Tables", "Bar Food"]
  },
  {
    id: "4",
    name: "Vintage Vine",
    description: "Intimate wine bar featuring a curated selection of domestic and imported wines. Perfect for date nights.",
    image: "https://images.pexels.com/photos/1478107/pexels-photo-1478107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.8,
    location: "234 Grape Street, Arts District",
    activeUsers: 18,
    category: "wine",
    features: ["Wine Selection", "Quiet", "Charcuterie"]
  },
  {
    id: "5",
    name: "Pulse Nightclub",
    description: "High-energy nightclub with top DJs, dance floors, and VIP bottle service. Open until 3am on weekends.",
    image: "https://images.pexels.com/photos/3252792/pexels-photo-3252792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.1,
    location: "555 Party Place, Entertainment District",
    activeUsers: 120,
    category: "nightclub",
    features: ["Dancing", "DJs", "VIP Service"]
  },
  {
    id: "6",
    name: "The Rustic Barrel",
    description: "Farm-to-table gastropub with rotating taps of local craft beers and seasonal menu.",
    image: "https://images.pexels.com/photos/2227960/pexels-photo-2227960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.6,
    location: "321 Farmstead Rd, Northside",
    activeUsers: 32,
    category: "pub",
    features: ["Farm-to-Table", "Craft Beer", "Outdoor Seating"]
  },
];

export const MOCK_MESSAGES = [
  {
    id: "1",
    userId: "user1",
    username: "CocktailQueen",
    avatar: "https://ui-avatars.com/api/?name=CQ&background=random",
    content: "Anyone know if The Crafty Brew has that new IPA from Highland Brewing?",
    timestamp: "2023-04-12T18:23:00",
    barId: "lobby", // for lobby chat
  },
  {
    id: "2",
    userId: "user2",
    username: "BeerNerd87",
    avatar: "https://ui-avatars.com/api/?name=BN&background=random",
    content: "Yeah, they just got it in yesterday! It's fantastic.",
    timestamp: "2023-04-12T18:25:00",
    barId: "lobby", // for lobby chat
  },
  {
    id: "3",
    userId: "user3",
    username: "MixologyMaster",
    avatar: "https://ui-avatars.com/api/?name=MM&background=random",
    content: "I'm heading to Skyline Lounge tonight. Anyone want to join?",
    timestamp: "2023-04-12T18:28:00",
    barId: "lobby", // for lobby chat
  },
  {
    id: "4",
    userId: "user4",
    username: "WhiskeyWanderer",
    avatar: "https://ui-avatars.com/api/?name=WW&background=random",
    content: "Has anyone tried their new bourbon flight? Worth it?",
    timestamp: "2023-04-12T18:30:00",
    barId: "lobby", // for lobby chat
  },
  {
    id: "5",
    userId: "user2",
    username: "BeerNerd87",
    avatar: "https://ui-avatars.com/api/?name=BN&background=random",
    content: "100% worth it. The Blanton's they have is from a great barrel.",
    timestamp: "2023-04-12T18:32:00",
    barId: "lobby", // for lobby chat
  },
  {
    id: "6",
    userId: "user1",
    username: "CocktailQueen",
    avatar: "https://ui-avatars.com/api/?name=CQ&background=random",
    content: "I'm at the bar now! Great atmosphere tonight.",
    timestamp: "2023-04-12T20:15:00",
    barId: "1", // The Crafty Brew
  },
  {
    id: "7",
    userId: "user5",
    username: "HopHead",
    avatar: "https://ui-avatars.com/api/?name=HH&background=random",
    content: "On my way! Save me a seat at the bar.",
    timestamp: "2023-04-12T20:18:00",
    barId: "1", // The Crafty Brew
  },
  {
    id: "8",
    userId: "user6",
    username: "StoutLover",
    avatar: "https://ui-avatars.com/api/?name=SL&background=random",
    content: "Their new pastry stout is amazing! Anyone tried it yet?",
    timestamp: "2023-04-12T20:22:00",
    barId: "1", // The Crafty Brew
  },
];

export const MOCK_USER = {
  id: "user1",
  username: "CocktailQueen",
  email: "cocktail@example.com",
  avatar: "https://ui-avatars.com/api/?name=CQ&background=random",
  bio: "Cocktail enthusiast exploring the best bars in the city",
  favoriteBarIds: ["1", "4"],
  joinDate: "2023-01-15",
};

// Mock user database for authentication
export const MOCK_USERS = [
  {
    id: "user1",
    username: "CocktailQueen",
    email: "cocktail@example.com",
    password: "password123", // In real app, this would be hashed
    avatar: "https://ui-avatars.com/api/?name=CQ&background=random",
    bio: "Cocktail enthusiast exploring the best bars in the city",
    favoriteBarIds: ["1", "4"],
    joinDate: "2023-01-15",
  },
  {
    id: "user2",
    username: "gml",
    email: "gml@example.com",
    password: "test1234", // In real app, this would be hashed
    avatar: "https://ui-avatars.com/api/?name=GM&background=random",
    bio: "Bar hopping enthusiast looking for great vibes and good drinks",
    favoriteBarIds: ["2", "3"],
    joinDate: "2023-06-01",
  },
];

export type Bar = typeof MOCK_BARS[0];
export type Message = typeof MOCK_MESSAGES[0];
export type User = typeof MOCK_USER;