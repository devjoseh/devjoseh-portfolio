import { cn } from "@/lib/utils";

interface SkeletonCardProps {
    className?: string;
}

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
    className?: string;
    text?: string;
}

interface LoadingSkeletonProps {
    count?: number;
    columns?: 1 | 2 | 3;
    className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
    return (
        <div className={cn("rounded-lg overflow-hidden bg-[#2C3953]/30",className)}>
            <div className="aspect-video bg-[#1a2235]/70 animate-pulse" />
            <div className="p-4">
                <div className="h-6 w-3/4 bg-[#1a2235]/70 rounded animate-pulse mb-3" />
                <div className="h-4 bg-[#1a2235]/70 rounded animate-pulse mb-2" />
                <div className="h-4 w-5/6 bg-[#1a2235]/70 rounded animate-pulse mb-4" />

                <div className="flex gap-2 mb-3">
                    <div className="h-5 w-16 bg-[#1a2235]/70 rounded-full animate-pulse" />
                    <div className="h-5 w-20 bg-[#1a2235]/70 rounded-full animate-pulse" />
                    <div className="h-5 w-14 bg-[#1a2235]/70 rounded-full animate-pulse" />
                </div>

                <div className="flex gap-2">
                    <div className="h-8 w-24 bg-[#1a2235]/70 rounded animate-pulse" />
                    <div className="h-8 w-24 bg-[#1a2235]/70 rounded animate-pulse" />
                </div>
            </div>
        </div>
    );
}

export function LoadingSkeleton({ count = 4, columns = 2, className }: LoadingSkeletonProps) {
    const gridCols = {
        1: "grid-cols-1",
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    };

    return (
        <div className={`grid ${gridCols[columns]} gap-4 sm:gap-6 ${className}`}>
            {Array.from({ length: count }).map((_, index) => (
                <SkeletonCard key={index} />
            ))}
        </div>
    );
}

export function LoadingSpinner({ size = "md", className, text }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: "h-6 w-6 border-2",
        md: "h-10 w-10 border-3",
        lg: "h-16 w-16 border-4",
    };

    return (
        <div className={cn("flex flex-col items-center justify-center py-8", className)}>
            <div
                className={cn(
                    "animate-spin rounded-full border-t-transparent border-blue-500",
                    sizeClasses[size]
                )}
            />

            {text && <p className="mt-4 text-blue-300 text-sm">{text}</p>}
        </div>
    );
}
