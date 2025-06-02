// "use client";

// import { useState, useEffect } from "react";
// import { useAuth } from "@/components/auth/auth-provider";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
// import {
// 	Users,
// 	Building2,
// 	MessageSquare,
// 	Plus,
// 	Edit,
// 	Trash2,
// 	Eye,
// 	Activity,
// 	TrendingUp,
// 	Clock
// } from "lucide-react";
// import { MOCK_BARS, MOCK_USERS, MOCK_MESSAGES, Bar, User } from "@/lib/constants";
// import Image from "next/image";

// // Extended Bar interface for dashboard with activeUsers
// interface DashboardBar extends Bar {
// 	activeUsers: number;
// }

// // Message interface
// interface Message {
// 	id: string;
// 	userId: string;
// 	userName: string;
// 	barId: string;
// 	content: string;
// 	timestamp: Date;
// 	likes: number;
// 	replies: any[];
// }

// function isAdmin(user: any) {
// 	return user && (user.id === "admin" || user.id === "cojoin");
// }

// export function DashboardClient() {
// 	const { user } = useAuth();
// 	const router = useRouter();
// 	const [bars, setBars] = useState<Bar[]>(MOCK_BARS);
// 	const [users, setUsers] = useState<User[]>(MOCK_USERS);
// 	const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
// 	const [selectedTab, setSelectedTab] = useState("overview");

// 	useEffect(() => {
// 		if (!isAdmin(user)) {
// 			router.push("/login");
// 		}
// 	}, [user, router]);

// 	if (!isAdmin(user)) {
// 		return (
// 			<div className="flex items-center justify-center min-h-screen">
// 				<div className="text-center">
// 					<h1 className="text-2xl font-bold text-red-500 mb-4">ไม่มีสิทธิ์เข้าถึง</h1>
// 					<p className="text-muted-foreground mb-4">คุณไม่มีสิทธิ์เข้าถึงหน้า Admin Dashboard</p>
// 					<Button onClick={() => router.push("/")}>กลับหน้าหลัก</Button>
// 				</div>
// 			</div>
// 		);
// 	}

// 	// Handlers
// 	const handleDeleteBar = (barId: string) => setBars(bars => bars.filter(bar => bar.id !== barId));
// 	const handleDeleteUser = (userId: string) => setUsers(users => users.filter(user => user.id !== userId));
// 	const handleDeleteMessage = (messageId: string) => setMessages(messages => messages.filter(message => message.id !== messageId));

// 	// Analytics
// 	const totalUsers = users.length;
// 	const totalBars = bars.length;
// 	const totalMessages = messages.length;
// 	const activeUsersToday = bars.reduce((sum, bar) => sum + (bar.activeUsers || 0), 0);

// 	return (
// 		<div className="container mx-auto p-6 space-y-8">
// 			{/* Header */}
// 			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// 				<div>
// 					<h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
// 					<p className="text-muted-foreground">จัดการระบบ Bar Hub</p>
// 				</div>
// 				<div className="flex items-center gap-2">
// 					<Badge variant="secondary" className="bg-green-100 text-green-800">
// 						<Activity className="w-4 h-4 mr-1" />
// 						ออนไลน์
// 					</Badge>
// 					<span className="text-sm text-muted-foreground">Admin: {user?.username}</span>
// 				</div>
// 			</div>

// 			{/* Overview Cards */}
// 			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// 				<Card>
// 					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// 						<CardTitle className="text-sm font-medium">จำนวนผู้ใช้</CardTitle>
// 						<Users className="h-4 w-4 text-muted-foreground" />
// 					</CardHeader>
// 					<CardContent>
// 						<div className="text-2xl font-bold">{totalUsers}</div>
// 						<p className="text-xs text-muted-foreground">
// 							<TrendingUp className="w-3 h-3 inline mr-1" />
// 							+2 คนในสัปดาห์นี้
// 						</p>
// 					</CardContent>
// 				</Card>

// 				<Card>
// 					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// 						<CardTitle className="text-sm font-medium">จำนวนบาร์</CardTitle>
// 						<Building2 className="h-4 w-4 text-muted-foreground" />
// 					</CardHeader>
// 					<CardContent>
// 						<div className="text-2xl font-bold">{totalBars}</div>
// 						<p className="text-xs text-muted-foreground">
// 							<Plus className="w-3 h-3 inline mr-1" />
// 							+1 แห่งในเดือนนี้
// 						</p>
// 					</CardContent>
// 				</Card>

// 				<Card>
// 					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// 						<CardTitle className="text-sm font-medium">ข้อความทั้งหมด</CardTitle>
// 						<MessageSquare className="h-4 w-4 text-muted-foreground" />
// 					</CardHeader>
// 					<CardContent>
// 						<div className="text-2xl font-bold">{totalMessages}</div>
// 						<p className="text-xs text-muted-foreground">
// 							<Clock className="w-3 h-3 inline mr-1" />
// 							+5 ข้อความวันนี้
// 						</p>
// 					</CardContent>
// 				</Card>

// 				<Card>
// 					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// 						<CardTitle className="text-sm font-medium">ผู้ใช้ออนไลน์</CardTitle>
// 						<Activity className="h-4 w-4 text-muted-foreground" />
// 					</CardHeader>
// 					<CardContent>
// 						<div className="text-2xl font-bold">{activeUsersToday}</div>
// 						<p className="text-xs text-muted-foreground">
// 							<TrendingUp className="w-3 h-3 inline mr-1" />
// 							ออนไลน์ในขณะนี้
// 						</p>
// 					</CardContent>
// 				</Card>
// 			</div>

// 			{/* Main Content Tabs */}
// 			<Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
// 				<TabsList className="grid w-full grid-cols-5">
// 					<TabsTrigger value="overview">ภาพรวม</TabsTrigger>
// 					<TabsTrigger value="bars">บาร์</TabsTrigger>
// 					<TabsTrigger value="users">ผู้ใช้</TabsTrigger>
// 					<TabsTrigger value="messages">ข้อความ</TabsTrigger>
// 					<TabsTrigger value="analytics">สถิติ</TabsTrigger>
// 				</TabsList>

// 				{/* Overview Tab */}
// 				<TabsContent value="overview" className="space-y-4">
// 					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// 						{/* Recent Activities */}
// 						<Card>
// 							<CardHeader>
// 								<CardTitle>กิจกรรมล่าสุด</CardTitle>
// 								<CardDescription>รายการกิจกรรมที่เกิดขึ้นในระบบ</CardDescription>
// 							</CardHeader>
// 							<CardContent className="space-y-4">
// 								<div className="flex items-center space-x-4">
// 									<div className="w-2 h-2 bg-green-500 rounded-full"></div>
// 									<div className="flex-1 space-y-1">
// 										<p className="text-sm font-medium leading-none">ผู้ใช้ใหม่เข้าร่วม</p>
// 										<p className="text-sm text-muted-foreground">CocktailQueen เข้าร่วมระบบ</p>
// 									</div>
// 									<div className="text-sm text-muted-foreground">2 ชม.</div>
// 								</div>
// 								<div className="flex items-center space-x-4">
// 									<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
// 									<div className="flex-1 space-y-1">
// 										<p className="text-sm font-medium leading-none">บาร์ใหม่</p>
// 										<p className="text-sm text-muted-foreground">เพิ่มบาร์ ร้าน(อ)โคจร</p>
// 									</div>
// 									<div className="text-sm text-muted-foreground">5 ชม.</div>
// 								</div>
// 								<div className="flex items-center space-x-4">
// 									<div className="w-2 h-2 bg-orange-500 rounded-full"></div>
// 									<div className="flex-1 space-y-1">
// 										<p className="text-sm font-medium leading-none">ข้อความใหม่</p>
// 										<p className="text-sm text-muted-foreground">มีข้อความใหม่ในแชท</p>
// 									</div>
// 									<div className="text-sm text-muted-foreground">1 วัน</div>
// 								</div>
// 							</CardContent>
// 						</Card>

// 						{/* Popular Bars */}
// 						<Card>
// 							<CardHeader>
// 								<CardTitle>บาร์ยอดนิยม</CardTitle>
// 								<CardDescription>บาร์ที่มีผู้ใช้ออนไลน์มากที่สุด</CardDescription>
// 							</CardHeader>
// 							<CardContent className="space-y-4">
// 								{bars
// 									.sort((a, b) => b.activeUsers - a.activeUsers)
// 									.slice(0, 3)
// 									.map((bar) => (
// 										<div key={bar.id} className="flex items-center space-x-4">
// 											<div className="w-12 h-12 relative rounded-lg overflow-hidden">
// 												<Image
// 													src={bar.image || "/default-bar.png"}
// 													alt={bar.name}
// 													fill
// 													className="object-cover"
// 												/>
// 											</div>
// 											<div className="flex-1 space-y-1">
// 												<p className="text-sm font-medium leading-none">{bar.name}</p>
// 												<p className="text-sm text-muted-foreground">{bar.category}</p>
// 											</div>
// 											<Badge variant="secondary">{bar.activeUsers} คน</Badge>
// 										</div>
// 									))}
// 							</CardContent>
// 						</Card>
// 					</div>
// 				</TabsContent>

// 				{/* Bars Tab */}
// 				<TabsContent value="bars" className="space-y-4">
// 					<div className="flex justify-between items-center">
// 						<h3 className="text-lg font-medium">จัดการบาร์</h3>
// 						<Dialog>
// 							<DialogTrigger asChild>
// 								<Button>
// 									<Plus className="w-4 h-4 mr-2" />
// 									เพิ่มบาร์ใหม่
// 								</Button>
// 							</DialogTrigger>
// 							<DialogContent className="max-w-2xl">
// 								<DialogHeader>
// 									<DialogTitle>เพิ่มบาร์ใหม่</DialogTitle>
// 									<DialogDescription>กรอกข้อมูลบาร์ที่ต้องการเพิ่ม</DialogDescription>
// 								</DialogHeader>
// 								<div className="grid gap-4 py-4">
// 									<div className="grid grid-cols-4 items-center gap-4">
// 										<Label htmlFor="name" className="text-right">ชื่อบาร์</Label>
// 										<Input id="name" className="col-span-3" />
// 									</div>
// 									<div className="grid grid-cols-4 items-center gap-4">
// 										<Label htmlFor="description" className="text-right">คำอธิบาย</Label>
// 										<Textarea id="description" className="col-span-3" />
// 									</div>
// 									<div className="grid grid-cols-4 items-center gap-4">
// 										<Label htmlFor="category" className="text-right">ประเภท</Label>
// 										<Select>
// 											<SelectTrigger className="col-span-3">
// 												<SelectValue placeholder="เลือกประเภทบาร์" />
// 											</SelectTrigger>
// 											<SelectContent>
// 												<SelectItem value="pub">Pub</SelectItem>
// 												<SelectItem value="bar">Bar</SelectItem>
// 												<SelectItem value="club">Club</SelectItem>
// 												<SelectItem value="bistro">Bistro</SelectItem>
// 											</SelectContent>
// 										</Select>
// 									</div>
// 								</div>
// 								<div className="flex justify-end gap-2">
// 									<Button variant="outline">ยกเลิก</Button>
// 									<Button>บันทึก</Button>
// 								</div>
// 							</DialogContent>
// 						</Dialog>
// 					</div>

// 					<Card>
// 						<CardContent className="p-0">
// 							<Table>
// 								<TableHeader>
// 									<TableRow>
// 										<TableHead>รูปภาพ</TableHead>
// 										<TableHead>ชื่อ</TableHead>
// 										<TableHead>ประเภท</TableHead>
// 										<TableHead>ผู้ใช้ออนไลน์</TableHead>
// 										<TableHead>คะแนน</TableHead>
// 										<TableHead>การดำเนินการ</TableHead>
// 									</TableRow>
// 								</TableHeader>
// 								<TableBody>
// 									{bars.map((bar) => (
// 										<TableRow key={bar.id}>
// 											<TableCell>
// 												<div className="w-12 h-12 relative rounded-lg overflow-hidden">
// 													<Image
// 														src={bar.image || "/default-bar.png"}
// 														alt={bar.name}
// 														fill
// 														className="object-cover"
// 													/>
// 												</div>
// 											</TableCell>
// 											<TableCell className="font-medium">{bar.name}</TableCell>
// 											<TableCell>
// 												<Badge variant="outline">{bar.category}</Badge>
// 											</TableCell>
// 											<TableCell>{bar.activeUsers} คน</TableCell>
// 											<TableCell>⭐ {bar.rating}</TableCell>
// 											<TableCell>
// 												<div className="flex items-center gap-2">
// 													<Button variant="ghost" size="sm">
// 														<Eye className="w-4 h-4" />
// 													</Button>
// 													<Button variant="ghost" size="sm">
// 														<Edit className="w-4 h-4" />
// 													</Button>
// 													<AlertDialog>
// 														<AlertDialogTrigger asChild>
// 															<Button variant="ghost" size="sm" className="text-red-500">
// 																<Trash2 className="w-4 h-4" />
// 															</Button>
// 														</AlertDialogTrigger>
// 														<AlertDialogContent>
// 															<AlertDialogHeader>
// 																<AlertDialogTitle>ยืนยันการลบ</AlertDialogTitle>
// 																<AlertDialogDescription>
// 																	คุณแน่ใจหรือไม่ที่จะลบบาร์ "{bar.name}" ข้อมูลที่ลบแล้วจะไม่สามารถกู้คืนได้
// 																</AlertDialogDescription>
// 															</AlertDialogHeader>
// 															<AlertDialogFooter>
// 																<AlertDialogCancel>ยกเลิก</AlertDialogCancel>
// 																<AlertDialogAction
// 																	onClick={() => handleDeleteBar(bar.id)}
// 																	className="bg-red-500 hover:bg-red-600"
// 																>
// 																	ลบ
// 																</AlertDialogAction>
// 															</AlertDialogFooter>
// 														</AlertDialogContent>
// 													</AlertDialog>
// 												</div>
// 											</TableCell>
// 										</TableRow>
// 									))}
// 								</TableBody>
// 							</Table>
// 						</CardContent>
// 					</Card>
// 				</TabsContent>

// 				{/* Users Tab */}
// 				<TabsContent value="users" className="space-y-4">
// 					<div className="flex justify-between items-center">
// 						<h3 className="text-lg font-medium">จัดการผู้ใช้</h3>
// 						<div className="flex gap-2">
// 							<Input placeholder="ค้นหาผู้ใช้..." className="w-64" />
// 						</div>
// 					</div>

// 					<Card>
// 						<CardContent className="p-0">
// 							<Table>
// 								<TableHeader>
// 									<TableRow>
// 										<TableHead>รูปโปรไฟล์</TableHead>
// 										<TableHead>ชื่อผู้ใช้</TableHead>
// 										<TableHead>อีเมล</TableHead>
// 										<TableHead>วันที่เข้าร่วม</TableHead>
// 										<TableHead>บาร์ที่ชื่นชอบ</TableHead>
// 										<TableHead>การดำเนินการ</TableHead>
// 									</TableRow>
// 								</TableHeader>
// 								<TableBody>
// 									{users.map((user) => (
// 										<TableRow key={user.id}>
// 											<TableCell>
// 												<div className="w-12 h-12 relative rounded-full overflow-hidden">
// 													<Image
// 														src={user.avatar || "/default-avatar.png"}
// 														alt={user.username}
// 														fill
// 														className="object-cover"
// 													/>
// 												</div>
// 											</TableCell>
// 											<TableCell className="font-medium">{user.username}</TableCell>
// 											<TableCell>{user.email}</TableCell>
// 											<TableCell>
// 												{new Date(user.joinDate).toLocaleDateString('th-TH')}
// 											</TableCell>
// 											<TableCell>
// 												<Badge variant="secondary">{user.favoriteBarIds.length} แห่ง</Badge>
// 											</TableCell>
// 											<TableCell>
// 												<div className="flex items-center gap-2">
// 													<Button variant="ghost" size="sm">
// 														<Eye className="w-4 h-4" />
// 													</Button>
// 													<Button variant="ghost" size="sm">
// 														<Edit className="w-4 h-4" />
// 													</Button>
// 													{user.id !== "admin" && user.id !== "cojoin" && (
// 														<AlertDialog>
// 															<AlertDialogTrigger asChild>
// 																<Button variant="ghost" size="sm" className="text-red-500">
// 																	<Trash2 className="w-4 h-4" />
// 																</Button>
// 															</AlertDialogTrigger>
// 															<AlertDialogContent>
// 																<AlertDialogHeader>
// 																	<AlertDialogTitle>ยืนยันการลบ</AlertDialogTitle>
// 																	<AlertDialogDescription>
// 																		คุณแน่ใจหรือไม่ที่จะลบผู้ใช้ "{user.username}" ข้อมูลที่ลบแล้วจะไม่สามารถกู้คืนได้
// 																	</AlertDialogDescription>
// 																</AlertDialogHeader>
// 																<AlertDialogFooter>
// 																	<AlertDialogCancel>ยกเลิก</AlertDialogCancel>
// 																	<AlertDialogAction
// 																		onClick={() => handleDeleteUser(user.id)}
// 																		className="bg-red-500 hover:bg-red-600"
// 																	>
// 																		ลบ
// 																	</AlertDialogAction>
// 																</AlertDialogFooter>
// 															</AlertDialogContent>
// 														</AlertDialog>
// 													)}
// 												</div>
// 											</TableCell>
// 										</TableRow>
// 									))}
// 								</TableBody>
// 							</Table>
// 						</CardContent>
// 					</Card>
// 				</TabsContent>

// 				{/* Messages Tab */}
// 				<TabsContent value="messages" className="space-y-4">
// 					<div className="flex justify-between items-center">
// 						<h3 className="text-lg font-medium">จัดการข้อความ</h3>
// 						<div className="flex gap-2">
// 							<Input placeholder="ค้นหาข้อความ..." className="w-64" />
// 						</div>
// 					</div>

// 					<Card>
// 						<CardContent className="p-0">
// 							<Table>
// 								<TableHeader>
// 									<TableRow>
// 										<TableHead>ผู้ใช้</TableHead>
// 										<TableHead>ข้อความ</TableHead>
// 										<TableHead>บาร์</TableHead>
// 										<TableHead>เวลา</TableHead>
// 										<TableHead>ไลค์</TableHead>
// 										<TableHead>การดำเนินการ</TableHead>
// 									</TableRow>
// 								</TableHeader>
// 								<TableBody>
// 									{messages.map((message) => (
// 										<TableRow key={message.id}>
// 											<TableCell className="font-medium">{message.userName}</TableCell>
// 											<TableCell className="max-w-xs truncate">{message.content}</TableCell>
// 											<TableCell>
// 												{bars.find(bar => bar.id === message.barId)?.name || "ไม่พบบาร์"}
// 											</TableCell>
// 											<TableCell>
// 												{new Date(message.timestamp).toLocaleDateString('th-TH')}
// 											</TableCell>
// 											<TableCell>{message.likes} ❤️</TableCell>
// 											<TableCell>
// 												<div className="flex items-center gap-2">
// 													<Button variant="ghost" size="sm">
// 														<Eye className="w-4 h-4" />
// 													</Button>
// 													<AlertDialog>
// 														<AlertDialogTrigger asChild>
// 															<Button variant="ghost" size="sm" className="text-red-500">
// 																<Trash2 className="w-4 h-4" />
// 															</Button>
// 														</AlertDialogTrigger>
// 														<AlertDialogContent>
// 															<AlertDialogHeader>
// 																<AlertDialogTitle>ยืนยันการลบ</AlertDialogTitle>
// 																<AlertDialogDescription>
// 																	คุณแน่ใจหรือไม่ที่จะลบข้อความนี้ ข้อมูลที่ลบแล้วจะไม่สามารถกู้คืนได้
// 																</AlertDialogDescription>
// 															</AlertDialogHeader>
// 															<AlertDialogFooter>
// 																<AlertDialogCancel>ยกเลิก</AlertDialogCancel>
// 																<AlertDialogAction
// 																	onClick={() => handleDeleteMessage(message.id)}
// 																	className="bg-red-500 hover:bg-red-600"
// 																>
// 																	ลบ
// 																</AlertDialogAction>
// 															</AlertDialogFooter>
// 														</AlertDialogContent>
// 													</AlertDialog>
// 												</div>
// 											</TableCell>
// 										</TableRow>
// 									))}
// 								</TableBody>
// 							</Table>
// 						</CardContent>
// 					</Card>
// 				</TabsContent>

// 				{/* Analytics Tab */}
// 				<TabsContent value="analytics" className="space-y-4">
// 					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// 						<Card>
// 							<CardHeader>
// 								<CardTitle>การใช้งานตามประเภทบาร์</CardTitle>
// 								<CardDescription>สถิติการใช้งานแยกตามประเภทบาร์</CardDescription>
// 							</CardHeader>
// 							<CardContent className="space-y-4">
// 								{["pub", "bar", "club", "bistro"].map((category) => {
// 									const categoryBars = bars.filter(bar => bar.category === category);
// 									const totalUsers = categoryBars.reduce((sum, bar) => sum + bar.activeUsers, 0);
// 									return (
// 										<div key={category} className="flex items-center justify-between">
// 											<div className="flex items-center gap-2">
// 												<div className="w-3 h-3 bg-primary rounded-full"></div>
// 												<span className="capitalize">{category}</span>
// 											</div>
// 											<div className="text-right">
// 												<div className="font-medium">{totalUsers} คน</div>
// 												<div className="text-sm text-muted-foreground">{categoryBars.length} แห่ง</div>
// 											</div>
// 										</div>
// 									);
// 								})}
// 							</CardContent>
// 						</Card>

// 						<Card>
// 							<CardHeader>
// 								<CardTitle>สถิติผู้ใช้ใหม่</CardTitle>
// 								<CardDescription>จำนวนผู้ใช้ใหม่ในแต่ละเดือน</CardDescription>
// 							</CardHeader>
// 							<CardContent>
// 								<div className="space-y-4">
// 									<div className="text-center">
// 										<div className="text-3xl font-bold text-green-600">+12</div>
// 										<div className="text-sm text-muted-foreground">ผู้ใช้ใหม่เดือนนี้</div>
// 									</div>
// 									<div className="text-center text-sm text-muted-foreground">
// 										เพิ่มขึ้น 20% จากเดือนก่อน
// 									</div>
// 								</div>
// 							</CardContent>
// 						</Card>

// 						<Card>
// 							<CardHeader>
// 								<CardTitle>บาร์ที่ได้คะแนนสูงสุด</CardTitle>
// 								<CardDescription>บาร์ที่ได้รับการให้คะแนนดีที่สุด</CardDescription>
// 							</CardHeader>
// 							<CardContent className="space-y-4">
// 								{bars
// 									.sort((a, b) => b.rating - a.rating)
// 									.slice(0, 5)
// 									.map((bar, index) => (
// 										<div key={bar.id} className="flex items-center justify-between">
// 											<div className="flex items-center gap-3">
// 												<div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
// 													{index + 1}
// 												</div>
// 												<span className="font-medium">{bar.name}</span>
// 											</div>
// 											<div className="flex items-center gap-1">
// 												<span>⭐</span>
// 												<span className="font-medium">{bar.rating}</span>
// 											</div>
// 										</div>
// 									))}
// 							</CardContent>
// 						</Card>

// 						<Card>
// 							<CardHeader>
// 								<CardTitle>ข้อความล่าสุด</CardTitle>
// 								<CardDescription>กิจกรรมการแชทล่าสุดในระบบ</CardDescription>
// 							</CardHeader>
// 							<CardContent className="space-y-4">
// 								{messages
// 									.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
// 									.slice(0, 5)
// 									.map((message) => (
// 										<div key={message.id} className="space-y-2">
// 											<div className="flex items-center justify-between">
// 												<span className="font-medium text-sm">{message.userName}</span>
// 												<span className="text-xs text-muted-foreground">
// 													{new Date(message.timestamp).toLocaleDateString('th-TH')}
// 												</span>
// 											</div>
// 											<p className="text-sm text-muted-foreground line-clamp-2">
// 												{message.content}
// 											</p>
// 											<div className="flex items-center gap-4 text-xs text-muted-foreground">
// 												<span>{message.likes} ❤️</span>
// 												<span>ที่ {bars.find(bar => bar.id === message.barId)?.name || "ไม่พบบาร์"}</span>
// 											</div>
// 										</div>
// 									))}
// 							</CardContent>
// 						</Card>
// 					</div>
// 				</TabsContent>
// 			</Tabs>
// 		</div>
// 	);
// }