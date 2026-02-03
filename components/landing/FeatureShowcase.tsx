'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface FeatureShowcaseProps {
    label: string;
    heading: string;
    description: string;
    ctaText: string;
    ctaLink?: string;
    visualComponent: React.ReactNode;
    reversed?: boolean;
}

export default function FeatureShowcase({
    label,
    heading,
    description,
    ctaText,
    ctaLink = '#',
    visualComponent,
    reversed = false
}: FeatureShowcaseProps) {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.2,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={sectionRef}
            className="w-full py-16 sm:py-24 px-6 lg:px-8"
        >
            <div className="mx-auto max-w-7xl">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reversed ? 'lg:grid-flow-dense' : ''
                    }`}>

                    {/* Text Content */}
                    <div
                        className={`${reversed ? 'lg:col-start-2' : ''} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            } transition-all duration-700 ease-out`}
                    >
                        <div className="space-y-6">
                            {/* Label */}
                            <div className="inline-flex items-center gap-2">
                                <div className="h-px w-8 bg-blue-500"></div>
                                <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase">
                                    {label}
                                </span>
                            </div>

                            {/* Heading */}
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                {heading}
                            </h2>

                            {/* Description */}
                            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                                {description}
                            </p>

                            {/* CTA Link */}
                            <a
                                href={ctaLink}
                                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all duration-300 group"
                            >
                                {ctaText}
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* Visual Component */}
                    <div
                        className={`${reversed ? 'lg:col-start-1 lg:row-start-1' : ''} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            } transition-all duration-700 ease-out delay-150`}
                    >
                        {visualComponent}
                    </div>
                </div>
            </div>
        </div>
    );
}
