'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const activities = [
    'พายเรือ', 'ดำน้ำ', 'ขี่เจ็ตสกี', 'ทัวร์เดินเที่ยวชม',
    'ธรรมชาติ', 'แช่ออนเซ็น', 'พาหมาไปเดินเล่น', 'สกี',
    'พายเรือคานู', 'สโนว์บอร์ด', 'โร้ดทริป',
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
        <div className=" bg-background py-8 px-4">
            <div className="max-w-md mx-auto">
                <h1 className="text-2xl font-bold text-center mb-8 text-foreground">
                    เลือกกิจกรรมที่คุณสนใจ
                </h1>

                <div className="flex flex-wrap gap-2 justify-center mt-[130px]">
                    {activities.map((activity) => (
                        <button
                            key={activity}
                            onClick={() => toggleInterest(activity)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                                ${selectedInterests.includes(activity)
                                    ? 'bg-theme-purple text-theme-light-pink shadow-lg shadow-theme-purple/30'
                                    : 'bg-secondary text-foreground border border-border hover:border-theme-pink hover:shadow-md hover:shadow-theme-pink/20'
                                }`}
                        >
                            {activity}
                        </button>
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