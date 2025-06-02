export interface Bar {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  location: string;
  category: "pub" | "bar" | "club" | "bistro";
  features: string[];
  genre: string;
  todaysBand: string;
  isOpen: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  distance?: string;
  band?: {
    name: string;
    description: string;
    image: string;
  };
}

export const MOCK_BARS: Bar[] = [
  {
    id: "1",
    name: "LIV Club Bangkok",
    description: "ผับเปิดใหม่ล่าสุดของย่านเอกมัย พร้อมกับระบบแสงสีเสียงสุดทันสมัย จัดเต็มจอ LED ขนาดยักษ์-เลเซอร์แน่นร้าน พร้อมกับโชว์และไลน์อัพดีเจสุดพิเศษมากมาย ที่พร้อมเสิร์ฟเพลง EDM ตลอดทั้งคืน !!",
    image: "/images/cover/2.png",
    rating: 4.5,
    location: "เอกมัย, กรุงเทพฯ",
    category: "club",
    distance: "0.3 กม.",
    features: ["Modern Sound System", "LED & Laser Show", "EDM DJs"],
    genre: "EDM",
    todaysBand: "YOUNG T",
    isOpen: true,
    coordinates: { lat: 13.733, lng: 100.588 }
  },
  {
    id: "2",
    name: "MUIN Club",
    description: "MUIN คลับดังจากเกาหลี เปิดสาขาใหม่ที่ทองหล่อ–เอกมัย พร้อมแสงสีเสียงสุดอลังการให้ฟีลเหมือนอยู่ในเฟสติวัล ตั้งอยู่บนชั้น 5 ของ Donki Mall ร้านกว้าง เพดานสูง มีหลายโซนหลายแนวเพลงให้เลือกตามสไตล์คุณ",
    image: "/images/cover/3.png",
    rating: 4.6,
    location: "ชั้น 5 Donki Mall, ทองหล่อ–เอกมัย, กรุงเทพฯ",
    category: "club",
    features: ["Festival Vibe", "Multiple Zones", "High Ceiling"],
    genre: "EDM",
    distance: "1 กม.",
    todaysBand: "DJ SODA",
    isOpen: true,
    coordinates: { lat: 13.735, lng: 100.586 }
  },
  {
    id: "3",
    name: "Bamboo Bar",
    description: "บาร์แจ๊สที่เก่าแก่ที่สุดในประเทศไทย และเป็นหนึ่งในบาร์ของไทยที่ติดอันดับ Asia’s 50 Best Bars ด้วยดนตรีแจ๊สคุณภาพและเอกลักษณ์เฉพาะตัว ผสานบรรยากาศคลาสสิกเข้ากับเครื่องดื่มหลากหลาย ทำให้ที่นี่เป็นจุดหมายยอดนิยมของคนรักแจ๊สมาอย่างยาวนาน",
    image: "/images/cover/4.png",
    rating: 4.8,
    location: "โรงแรมแมนดาริน โอเรียนเต็ล กรุงเทพฯ",
    category: "bar",
    features: ["Classic Jazz", "Historic", "Asia's 50 Best Bars"],
    genre: "แจ๊ส",
    todaysBand: "-",
    isOpen: true,
    distance: "5 กม.",
    coordinates: { lat: 13.723, lng: 100.514 }
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
  note?: string; // User's current status or note
  favoriteBarIds: string[];
  currentBarId?: string; // ID of the bar where user is currently at
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
    email: "admin@โคจร.ไทย",
    password: "adminadmin",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    bio: "System Administrator",
    note: "กำลังมองหาเพื่อนดื่ม",
    favoriteBarIds: [],
    currentBarId: "1",
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
    note: "รอเพื่อนอยู่",
    favoriteBarIds: [],
    currentBarId: "1",
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
    note: "กำลังฟังดนตรีสด",
    favoriteBarIds: ["1", "4"],
    currentBarId: "1",
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
    note: "กำลังชิมค็อกเทลใหม่",
    favoriteBarIds: ["2", "6"],
    currentBarId: "2",
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
    note: "กำลังเล่นพูล",
    favoriteBarIds: ["3"],
    currentBarId: "3",
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
    note: "กำลังนั่งชิลล์",
    favoriteBarIds: ["2", "5"],
    currentBarId: "2",
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
    note: "กำลังฟังดนตรีสด",
    favoriteBarIds: ["4"],
    currentBarId: "4",
    joinDate: "2023-08-25T00:00:00Z",
    preferences: {
      favoriteCategories: ["bar"],
      notifications: true
    }
  },
  {
    id: "user6",
    username: "Lisa",
    email: "lisa@example.com",
    password: "lisa321",
    avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    bio: "Student who loves chill spots",
    note: "กำลังรอเพื่อน",
    favoriteBarIds: ["5", "6"],
    currentBarId: "5",
    joinDate: "2023-07-18T00:00:00Z",
    preferences: {
      favoriteCategories: ["pub", "bistro"],
      notifications: true
    }
  },
  // --- MOCKUP USERS: 20 male, 40 female, random bar assignment ---
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `mock-male-${i+1}`,
    username: `ชาย${i+1}`,
    email: `male${i+1}@mock.com`,
    avatar: `https://randomuser.me/api/portraits/men/${i+10}.jpg`,
    bio: "หนุ่มสายชิลล์",
    note: "กำลังหาเพื่อนใหม่",
    favoriteBarIds: [],
    currentBarId: (Math.floor(Math.random()*MOCK_BARS.length)+1).toString(),
    joinDate: `2024-01-${(i%28+1).toString().padStart(2,'0')}T12:00:00Z`,
    preferences: {
      favoriteCategories: ["pub", "bar", "club", "bistro"].sort(() => 0.5 - Math.random()).slice(0,2),
      notifications: Math.random() > 0.5
    }
  })),
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `mock-female-${i+1}`,
    username: `หญิง${i+1}`,
    email: `female${i+1}@mock.com`,
    avatar: `https://randomuser.me/api/portraits/women/${i+10}.jpg`,
    bio: "สาวสายปาร์ตี้",
    note: "กำลังรอแก๊งค์",
    favoriteBarIds: [],
    currentBarId: (Math.floor(Math.random()*MOCK_BARS.length)+1).toString(),
    joinDate: `2024-02-${(i%28+1).toString().padStart(2,'0')}T12:00:00Z`,
    preferences: {
      favoriteCategories: ["pub", "bar", "club", "bistro"].sort(() => 0.5 - Math.random()).slice(0,2),
      notifications: Math.random() > 0.5
    }
  })),
  // --- MOCKUP USERS: 80 more, 40 male, 40 female, random bar assignment ---
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `mock-male-extra-${i+1}`,
    username: `ชาย${i+21}`,
    email: `male-extra${i+1}@mock.com`,
    avatar: `https://randomuser.me/api/portraits/men/${i+31}.jpg`,
    bio: "หนุ่มสายชิลล์",
    note: "กำลังหาเพื่อนใหม่",
    favoriteBarIds: [],
    currentBarId: (Math.floor(Math.random()*MOCK_BARS.length)+1).toString(),
    joinDate: `2024-03-${(i%28+1).toString().padStart(2,'0')}T12:00:00Z`,
    preferences: {
      favoriteCategories: ["pub", "bar", "club", "bistro"].sort(() => 0.5 - Math.random()).slice(0,2),
      notifications: Math.random() > 0.5
    }
  })),
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `mock-female-extra-${i+1}`,
    username: `หญิง${i+41}`,
    email: `female-extra${i+1}@mock.com`,
    avatar: `https://randomuser.me/api/portraits/women/${i+51}.jpg`,
    bio: "สาวสายปาร์ตี้",
    note: "กำลังรอแก๊งค์",
    favoriteBarIds: [],
    currentBarId: (Math.floor(Math.random()*MOCK_BARS.length)+1).toString(),
    joinDate: `2024-04-${(i%28+1).toString().padStart(2,'0')}T12:00:00Z`,
    preferences: {
      favoriteCategories: ["pub", "bar", "club", "bistro"].sort(() => 0.5 - Math.random()).slice(0,2),
      notifications: Math.random() > 0.5
    }
  }))
];