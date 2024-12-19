import React from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

const SkeletonCard = () => {
    return (
        <>
            {[...Array(6)].map((_, index) => (
                <Card
                    key={index}
                    className="flex flex-col justify-between shadow-md rounded-xl"
                >
                    <CardContent className="flex items-center p-4 space-x-4">
                        <Skeleton className="h-full w-[125px] rounded-lg"/>
                        <div className="flex flex-1 flex-col space-y-4">
                            <div className="flex flex-col justify-between">
                                <div className="flex items-center justify-between">
                                    <Skeleton className="h-4 w-28 bg-gray-300"/>
                                    <Skeleton className="h-[24px] w-[24px] rounded-full"/>
                                </div>
                                <Skeleton className="h-4 w-16 bg-gray-200"/>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <Skeleton className="h-4 w-full"/>
                                <Skeleton className="h-4 w-44"/>
                            </div>
                            <div
                                className="flex items-center justify-between space-x-4">
                                <Skeleton className="h-4 w-12 bg-gray-300"/>
                                <div
                                    className="counter flex items-center justify-between border rounded-full p-1 h-auto space-x-1">
                                    <Skeleton className="h-[32px] w-[32px] rounded-full"/>
                                    <Skeleton className=" h-[32px] w-[32px]"/>
                                    <Skeleton
                                        className="h-[32px] w-[32px] bg-gray-300 rounded-full"/>
                                </div>
                            </div>
                        </div>

                    </CardContent>
                </Card>
            ))}
        </>
    );
};

export default SkeletonCard;