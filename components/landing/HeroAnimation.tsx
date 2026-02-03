'use client';

import { useEffect, useState, useRef } from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

interface Task {
    id: number;
    title: string;
    column: 'todo' | 'inprogress' | 'done';
    checked: boolean;
    status: string;
    assignee: string;
}

interface Activity {
    id: number;
    user: string;
    action: string;
}

export default function HeroAnimation() {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: 'Design landing page', column: 'todo', checked: false, status: 'Pending', assignee: 'JD' },
        { id: 2, title: 'Build API', column: 'inprogress', checked: false, status: 'Active', assignee: 'AK' },
        { id: 3, title: 'Setup deploy', column: 'done', checked: true, status: 'Done', assignee: 'ML' },
    ]);

    const [progress, setProgress] = useState(0);
    const [activities] = useState<Activity[]>([
        { id: 1, user: 'JD', action: 'completed Design task' },
        { id: 2, user: 'AK', action: 'started API work' },
    ]);
    const [tasksToday, setTasksToday] = useState(12);

    const activityCounterRef = useRef(3);

    useEffect(() => {
        // Progress animation only
        const progressInterval = setInterval(() => {
            setProgress(prev => prev >= 92 ? 92 : prev + 1);
        }, 30);

        // Simple task rotation
        const taskInterval = setInterval(() => {
            setTasks(prevTasks => {
                const newTasks = [...prevTasks];
                const firstTask = newTasks[0];

                if (firstTask.column === 'todo') {
                    firstTask.column = 'inprogress';
                    firstTask.status = 'Active';
                } else if (firstTask.column === 'inprogress') {
                    firstTask.column = 'done';
                    firstTask.checked = true;
                    firstTask.status = 'Done';
                    setTasksToday(prev => prev + 1);
                } else {
                    firstTask.column = 'todo';
                    firstTask.checked = false;
                    firstTask.status = 'Pending';
                }

                return newTasks;
            });
        }, 3000);

        return () => {
            clearInterval(progressInterval);
            clearInterval(taskInterval);
        };
    }, []);

    const getColumnTasks = (column: 'todo' | 'inprogress' | 'done') => {
        return tasks.filter(task => task.column === column);
    };

    return (
        <div
            className="w-full flex items-start justify-center"
            style={{
                maxWidth: '580px',
                height: '520px',
                overflow: 'hidden',
                position: 'relative'
            }}
        >
            <div
                className="w-full bg-white rounded-xl shadow-lg border border-gray-100"
                style={{
                    padding: '20px',
                    maxWidth: '580px',
                    height: '100%',
                    overflow: 'hidden',
                    transform: 'translate3d(0, 0, 0)',
                    willChange: 'transform'
                }}
            >
                {/* Header */}
                <div className="mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-black">Team Sprint</h3>
                        <div className="flex -space-x-1.5">
                            <div className="w-7 h-7 rounded-full bg-gray-800 border-2 border-white flex items-center justify-center text-white text-[9px] font-medium">JD</div>
                            <div className="w-7 h-7 rounded-full bg-gray-700 border-2 border-white flex items-center justify-center text-white text-[9px] font-medium">AK</div>
                            <div className="w-7 h-7 rounded-full bg-gray-600 border-2 border-white flex items-center justify-center text-white text-[9px] font-medium">ML</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div
                                className="h-full bg-black"
                                style={{
                                    width: `${progress}%`,
                                    transition: 'width 0.3s ease-out',
                                    transform: 'translate3d(0, 0, 0)'
                                }}
                            ></div>
                        </div>
                        <span className="text-xs font-bold text-black min-w-[2.5rem] text-right">{progress}%</span>
                    </div>
                </div>

                {/* Grid - strictly sized */}
                <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '16px', height: 'calc(100% - 100px)', overflow: 'hidden' }}>
                    {/* Kanban - 3 columns */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', overflow: 'hidden' }}>
                        {/* To Do */}
                        <div style={{ overflow: 'hidden' }}>
                            <div className="flex items-center gap-1 mb-2">
                                <h4 className="text-[10px] font-bold text-gray-500 uppercase">To Do</h4>
                                <span className="text-[10px] text-gray-400">{getColumnTasks('todo').length}</span>
                            </div>
                            <div style={{ maxHeight: '340px', overflow: 'hidden' }}>
                                {getColumnTasks('todo').map((task) => (
                                    <div key={task.id} className="bg-white rounded-lg p-2.5 border border-gray-200 mb-2">
                                        <div className="flex items-start gap-1.5 mb-1.5">
                                            <Circle size={11} className="text-gray-400 mt-0.5 flex-shrink-0" />
                                            <p className="text-[10px] font-medium text-gray-900 leading-tight line-clamp-2">{task.title}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[8px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded uppercase font-semibold">{task.status}</span>
                                            <div className="w-4 h-4 rounded-full bg-gray-700 text-white text-[7px] flex items-center justify-center font-bold">{task.assignee}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* In Progress */}
                        <div style={{ overflow: 'hidden' }}>
                            <div className="flex items-center gap-1 mb-2">
                                <h4 className="text-[10px] font-bold text-gray-500 uppercase">Progress</h4>
                                <span className="text-[10px] text-gray-400">{getColumnTasks('inprogress').length}</span>
                            </div>
                            <div style={{ maxHeight: '340px', overflow: 'hidden' }}>
                                {getColumnTasks('inprogress').map((task) => (
                                    <div key={task.id} className="bg-white rounded-lg p-2.5 border border-gray-200 mb-2">
                                        <div className="flex items-start gap-1.5 mb-1.5">
                                            <Circle size={11} className="text-gray-400 mt-0.5 flex-shrink-0" />
                                            <p className="text-[10px] font-medium text-gray-900 leading-tight line-clamp-2">{task.title}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[8px] px-1.5 py-0.5 bg-black text-white rounded uppercase font-semibold">{task.status}</span>
                                            <div className="w-4 h-4 rounded-full bg-gray-700 text-white text-[7px] flex items-center justify-center font-bold">{task.assignee}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Done */}
                        <div style={{ overflow: 'hidden' }}>
                            <div className="flex items-center gap-1 mb-2">
                                <h4 className="text-[10px] font-bold text-gray-500 uppercase">Done</h4>
                                <span className="text-[10px] text-gray-400">{getColumnTasks('done').length}</span>
                            </div>
                            <div style={{ maxHeight: '340px', overflow: 'hidden' }}>
                                {getColumnTasks('done').map((task) => (
                                    <div key={task.id} className="bg-white rounded-lg p-2.5 border border-gray-200 mb-2 opacity-60">
                                        <div className="flex items-start gap-1.5 mb-1.5">
                                            <CheckCircle2 size={11} className="text-black mt-0.5 flex-shrink-0" />
                                            <p className="text-[10px] font-medium text-gray-500 line-through leading-tight line-clamp-2">{task.title}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[8px] px-1.5 py-0.5 bg-gray-200 text-gray-700 rounded uppercase font-semibold">{task.status}</span>
                                            <div className="w-4 h-4 rounded-full bg-gray-700 text-white text-[7px] flex items-center justify-center font-bold">{task.assignee}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - strictly sized */}
                    <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {/* Stats  */}
                        <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200">
                            <div className="flex items-center gap-1.5">
                                <div className="w-6 h-6 bg-black rounded flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 size={12} className="text-white" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-base font-bold text-black">{tasksToday}</div>
                                    <div className="text-[8px] text-gray-500 uppercase">Today</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200">
                            <div className="flex items-center gap-1.5">
                                <div className="w-6 h-6 bg-black rounded flex items-center justify-center flex-shrink-0">
                                    <Clock size={12} className="text-white" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-base font-bold text-black">3</div>
                                    <div className="text-[8px] text-gray-500 uppercase">Active</div>
                                </div>
                            </div>
                        </div>

                        {/* Activity - height capped */}
                        <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200 flex-1" style={{ maxHeight: '150px', overflow: 'hidden' }}>
                            <h5 className="text-[8px] font-bold text-gray-500 uppercase mb-2">Activity</h5>
                            <div className="space-y-1.5">
                                {activities.slice(0, 2).map((activity) => (
                                    <div key={activity.id} className="text-[9px] text-gray-600 leading-tight">
                                        <span className="font-bold text-black">{activity.user}</span>{' '}
                                        <span className="text-gray-500 truncate">{activity.action}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
