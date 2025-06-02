'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const interestCategories = [
    {
        title: '🧘‍♀️ หัวข้อชวนคุย',
        interests: ['โยคะ', 'สกินแคร์', 'รักตัวเอง']
    },
    {
        title: '📱 โซเชียลมีเดีย',
        interests: ['TikTok', 'YouTube', 'Instagram', 'Blogger', 'Spotify']
    },
    {
        title: '🎵 ดนตรี',
        interests: ['เค-ป๊อป', 'เพลงป๊อป', 'R&B', 'เพลงอินดี้', 'เพลงแร็พ', 'ฟังเพลงขณะทำงาน']
    },
    {
        title: '🎬 ภาพยนตร์ & ซีรีส์',
        interests: ['Netflix', 'ซีรีส์เกาหลี', 'ซีรีส์อาชญากรรม', 'อนิเมะ is life', 'หนังแฟนตาซี', 'หนังรอมคอม', 'สารคดี']
    },
    {
        title: '🌿 กิจกรรมกลางแจ้ง',
        interests: ['เดินเขา', 'ปีนเขา', 'แคมปิ้ง', 'ดำน้ำ', 'พายเรือ', 'แพดเดิลบอร์ด', 'โร้ดทริป']
    },
    {
        title: '🥘 สายกิน',
        interests: ['ชาบู-สุกี้', 'หมูกระทะ', 'สตรีทฟู้ด', 'ชานมไข่มุก', 'ไอติม', 'กาแฟ']
    },
    {
        title: '🧠 ประเด็นร่วมสมัย',
        interests: ['สิทธิ LGBTQIA+', 'ความเท่าเทียม', 'รักษ์โลก', 'ภาวะโลกรวน', 'สุขภาพจิต', 'รักตัวเอง']
    },
    {
        title: '⚽ สายเฮลตี้ & สปอร์ตพี่นักกล้าม',
        interests: ['วิ่ง jogging', 'วิ่งมาราธอน', 'ฟิตเนส', 'คลาสฟิตเนส', 'พิลาทิส', 'ต่อยมวย', 'เล่นสเก็ตบอร์ด', 'ยกน้ำหนัก']
    },
    {
        title: '🧑‍🎤 ชีวิตดี๊ดีของคนสายชิลล์',
        interests: ['อ่านหนังสือ', 'เขียนหนังสือ', 'ถ่ายรูป', 'วาดรูป', 'แฟชั่นวินเทจ', 'ช้อปของมือสอง', 'ทำขนม', 'ทำอาหาร']
    }
];

export default function InterestsPage() {
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    const toggleInterest = (interest: string) => {
        setSelectedInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    return (
        <div className="bg-background py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-center mb-8 text-foreground">
                    เลือกกิจกรรมที่คุณสนใจ
                </h1>

                <div className="space-y-8">
                    {interestCategories.map((category) => (
                        <div key={category.title} className="space-y-4">
                            <h2 className="text-xl font-semibold text-foreground">
                                {category.title}
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {category.interests.map((interest) => (
                                    <button
                                        key={interest}
                                        onClick={() => toggleInterest(interest)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                                            ${selectedInterests.includes(interest)
                                                ? 'bg-theme-purple text-theme-light-pink shadow-lg shadow-theme-purple/30'
                                                : 'bg-secondary text-foreground border border-border hover:border-theme-pink hover:shadow-md hover:shadow-theme-pink/20'
                                            }`}
                                    >
                                        {interest}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <Button
                        onClick={() => console.log('Selected interests:', selectedInterests)}
                        variant="outline"
                        className="flex items-center justify-center gap-2 mx-auto rounded-full"
                    >
                        ต่อไป
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
} 