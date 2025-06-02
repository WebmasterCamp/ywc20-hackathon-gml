export interface Bar {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  location: string;
  activeUsers: number;
  category: "pub" | "bar" | "club" | "bistro";
  features: string[];
  genre: string;
  todaysBand: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const MOCK_BARS: Bar[] = [
  {
    id: "1",
    name: "Buzem music bar",
    description: "บาร์ดนตรีสดใกล้ ม.กรุงเทพ รังสิต บรรยากาศสนุก ดนตรีมันส์ ราคาเข้าถึงง่าย",
    image: "https://images.pexels.com/photos/1647161/pexels-photo-1647161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.3,
    location: "95/1 ซอยไอยราแกรนด์ คลองหนึ่ง คลองหลวง ปทุมธานี",
    activeUsers: 37,
    category: "pub",
    features: ["Live Music", "Budget Friendly", "Student Crowd"],
    genre: "อินดี้ป็อป",
    todaysBand: "วง The Young Blues",
    coordinates: { lat: 14.046505, lng: 100.595893 }
  },
  {
    id: "2",
    name: "8E88 Bar & Bistro",
    description: "บาร์บรรยากาศดี ย่านตลาดรังสิต มีวงดนตรีสดหลากหลายแนวทุกคืน",
    image: "https://images.pexels.com/photos/1334608/pexels-photo-1334608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.5,
    location: "797/2 ถ.พหลโยธิน ประชาธิปัตย์ ธัญบุรี ปทุมธานี",
    activeUsers: 45,
    category: "bistro",
    features: ["Live Music", "Food Served", "Indoor/Outdoor"],
    genre: "แจ๊ส",
    todaysBand: "วง Midnight Jazz",
    coordinates: { lat: 14.033284, lng: 100.615342 }
  },
  {
    id: "3",
    name: "Flip Rangsit",
    description: "ผับขนาดใหญ่มีโต๊ะพูล ดนตรีสด บรรยากาศสนุก เดินทางสะดวกจาก ม.รังสิต",
    image: "https://images.pexels.com/photos/2747447/pexels-photo-2747447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.2,
    location: "5/55 เอกเจริญ ลาภพัฒนา หลักหก เมืองปทุมธานี",
    activeUsers: 58,
    category: "club",
    features: ["Pool Tables", "Live Music", "Party Vibe"],
    genre: "EDM",
    todaysBand: "DJ Neon Night",
    coordinates: { lat: 14.028756, lng: 100.578234 }
  },
  {
    id: "4",
    name: "Kin Do Funk",
    description: "บาร์ดนตรีสดแนว Funk และ Pop บรรยากาศชิล ชวนเพื่อนมานั่งชิวได้สบาย",
    image: "https://images.pexels.com/photos/1829980/pexels-photo-1829980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.4,
    location: "ประชาธิปัตย์ ธัญบุรี ปทุมธานี",
    activeUsers: 29,
    category: "bar",
    features: ["Funk Music", "Relaxed Vibe", "Young Crowd"],
    genre: "ฟังค์",
    todaysBand: "วง Groove Master",
    coordinates: { lat: 14.041523, lng: 100.608765 }
  },
  {
    id: "5",
    name: "Rest Rangsit",
    description: "ร้านนั่งชิลตรงข้าม ม.ธรรมศาสตร์ รังสิต บรรยากาศร่มรื่น มีดนตรีสดทุกวัน",
    image: "https://images.pexels.com/photos/1171279/pexels-photo-1171279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.5,
    location: "62/14 หมู่ 7 คลองหนึ่ง คลองหลวง ปทุมธานี",
    activeUsers: 34,
    category: "pub",
    features: ["Chill Vibe", "Live Music", "Close to TU"],
    genre: "ดนตรีสด",
    todaysBand: "วง Acoustic Dreams",
    coordinates: { lat: 14.069811, lng: 100.597123 }
  },
  {
    id: "6",
    name: "Rest'er Day",
    description: "กึ่ง Bar & Bistro ริมคลอง ตกแต่งสไตล์วินเทจ มีเมนูอาหาร และค็อกเทล",
    image: "https://images.pexels.com/photos/1405755/pexels-photo-1405755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.3,
    location: "62 ธรรมศาสตร์ 14 คลองหนึ่ง คลองหลวง ปทุมธานี",
    activeUsers: 22,
    category: "bistro",
    features: ["Cocktails", "Folk Music", "Romantic Spot"],
    genre: "โฟล์คซอง",
    todaysBand: "วง Vintage Soul",
    coordinates: { lat: 14.074562, lng: 100.599876 }
  }
];

export const MOCK_MESSAGES = [
  {
    id: "1",
    userId: "user1",
    userName: "Alex",
    barId: "1",
    content: "Great live music tonight! The band is amazing 🎵",
    timestamp: new Date("2024-01-15T20:30:00Z"),
    likes: 12,
    replies: []
  },
  {
    id: "2",
    userId: "user2",
    userName: "Sarah",
    barId: "2",
    content: "Anyone at 8E88 right now? Looking for people to hang out with!",
    timestamp: new Date("2024-01-15T21:15:00Z"),
    likes: 5,
    replies: [
      {
        id: "r1",
        userId: "user3",
        userName: "Mike",
        content: "I'm here with friends! Come find us at the corner table",
        timestamp: new Date("2024-01-15T21:20:00Z")
      }
    ]
  },
  {
    id: "3",
    userId: "user4",
    userName: "Emma",
    barId: "3",
    content: "Pool tournament starting in 30 minutes at Flip! 🎱",
    timestamp: new Date("2024-01-15T19:45:00Z"),
    likes: 8,
    replies: []
  },
  {
    id: "4",
    userId: "user5",
    userName: "David",
    barId: "4",
    content: "The funk band tonight is incredible! Don't miss it 🎸",
    timestamp: new Date("2024-01-15T22:00:00Z"),
    likes: 15,
    replies: []
  },
  {
    id: "5",
    userId: "user6",
    userName: "Lisa",
    barId: "5",
    content: "Perfect spot to chill after exams. Thanks TU students! 📚🍺",
    timestamp: new Date("2024-01-15T18:30:00Z"),
    likes: 9,
    replies: []
  }
];

export interface User {
  id: string;
  username: string;
  email: string;
  password?: string; // Optional for when storing in state (will be removed)
  avatar?: string;
  bio?: string;
  favoriteBarIds: string[];
  joinDate: string;
  preferences?: {
    favoriteCategories?: string[];
    notifications?: boolean;
  };
}

export const MOCK_USER: User = {
  id: "current-user",
  username: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
  bio: "Bar enthusiast and social drinker",
  favoriteBarIds: ["1", "3"],
  joinDate: "2024-01-01T00:00:00Z",
  preferences: {
    favoriteCategories: ["pub", "bar"],
    notifications: true
  }
};

export const MOCK_USERS: User[] = [
  {
    id: "admin",
    username: "admin",
    email: "admin@barhub.com",
    password: "adminadmin",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    bio: "System Administrator",
    favoriteBarIds: [],
    joinDate: "2023-01-01T00:00:00Z",
    preferences: {
      favoriteCategories: ["pub", "bar", "club", "bistro"],
      notifications: true
    }
  },
  {
    id: "cojoin",
    username: "cojoin",
    email: "cojoin@โคจร.ไทย",
    password: "adminadmin",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    bio: "System Administrator",
    favoriteBarIds: [],
    joinDate: "2023-01-01T00:00:00Z",
    preferences: {
      favoriteCategories: ["pub", "bar", "club", "bistro"],
      notifications: true
    }
  },
  {
    id: "user1",
    username: "gml",
    email: "alex@example.com",
    password: "test1234",
    avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    bio: "Love live music and craft cocktails",
    favoriteBarIds: ["1", "4"],
    joinDate: "2023-11-15T00:00:00Z",
    preferences: {
      favoriteCategories: ["pub", "club"],
      notifications: true
    }
  },
  {
    id: "user2",
    username: "CocktailQueen",
    email: "sarah@example.com",
    password: "password123",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    bio: "Cocktail enthusiast and food lover",
    favoriteBarIds: ["2", "6"],
    joinDate: "2023-12-03T00:00:00Z",
    preferences: {
      favoriteCategories: ["bistro", "bar"],
      notifications: true
    }
  },
  {
    id: "user3",
    username: "Mike",
    email: "mike@example.com",
    password: "mike123",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    bio: "Pool player and party lover",
    favoriteBarIds: ["3"],
    joinDate: "2023-10-20T00:00:00Z",
    preferences: {
      favoriteCategories: ["club", "pub"],
      notifications: false
    }
  },
  {
    id: "user4",
    username: "Emma",
    email: "emma@example.com",
    password: "emma456",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    bio: "Casual drinker who enjoys good atmosphere",
    favoriteBarIds: ["2", "5"],
    joinDate: "2023-09-12T00:00:00Z",
    preferences: {
      favoriteCategories: ["bar", "bistro"],
      notifications: true
    }
  },
  {
    id: "user5",
    username: "David",
    email: "david@example.com",
    password: "david789",
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    bio: "Funk music lover and beer connoisseur",
    favoriteBarIds: ["4"],
    joinDate: "2023-08-25T00:00:00Z",
    preferences: {
      favoriteCategories: ["bar"],
      notifications: true
    }
  },  {
    id: "user6",
    username: "Lisa",
    email: "lisa@example.com",
    password: "lisa321",
    avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    bio: "Student who loves chill spots",
    favoriteBarIds: ["5", "6"],
    joinDate: "2023-07-18T00:00:00Z",
    preferences: {
      favoriteCategories: ["pub", "bistro"],
      notifications: true
    }
  }
];