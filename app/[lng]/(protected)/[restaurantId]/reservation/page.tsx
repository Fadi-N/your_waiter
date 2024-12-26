'use client'

import React, { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, startOfDay } from "date-fns";
import { getWorksheets } from "@/actions/admin/reservation";
import { Worksheet } from "@prisma/client";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useParams } from "next/navigation";
import { Group, Layer, Rect, Stage, Text, Image as KonvaImage } from "react-konva";

const ReservationPage = () => {
    const { restaurantId } = useParams();

    const [date, setDate] = useState<Date>();
    const [loading, setLoading] = useState(true);
    const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
    const [activeWorksheet, setActiveWorksheet] = useState<Worksheet | null>(null);
    const [loadedImages, setLoadedImages] = useState<Record<string, HTMLImageElement>>({});
    const [tiles, setTiles] = useState<any[]>([]);
    const [stageSize, setStageSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const fetchWorksheets = async () => {
            setLoading(true);
            try {
                const worksheets = await getWorksheets(restaurantId);
                if (Array.isArray(worksheets)) {
                    setWorksheets(worksheets);
                    setActiveWorksheet(worksheets[0] || null);
                } else {
                    throw new Error("Invalid worksheets data");
                }
            } catch (error) {
                console.error("Error fetching worksheets:", error);
                setWorksheets([]);
            } finally {
                setLoading(false);
            }
        };

        fetchWorksheets();
    }, [restaurantId]);

    useEffect(() => {
        if (activeWorksheet?.tiles) {
            activeWorksheet.tiles.forEach((tile) => {
                if (tile.src && !loadedImages[tile.src]) {
                    const img = new window.Image();
                    img.src = tile.src;
                    img.onload = () => {
                        setLoadedImages((prev) => ({ ...prev, [tile.src]: img }));
                    };
                }
            });
            setTiles(activeWorksheet.tiles);
        }
    }, [activeWorksheet]);

    useEffect(() => {
        const updateSize = () => {
            setStageSize({ width: window.innerWidth, height: window.innerHeight });
        };
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal gap-2",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < startOfDay(new Date())}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            <Carousel className="flex-1">
                {loading ? (
                    <CarouselContent className="m-0 gap-x-3">
                        {[...Array(6)].map((_, index) => (
                            <CarouselItem key={`placeholder-${index}`} className="basis-1/3 p-0 md:basis-1/12">
                                <Button
                                    className="w-full rounded-full bg-gray-300"
                                    size="sm"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                ) : worksheets.length > 0 ? (
                    <CarouselContent className="m-0 gap-x-3">
                        {worksheets.map((worksheet, index) => (
                            <CarouselItem key={`worksheet-${index}`} className="basis-1/3 p-0 md:basis-1/12">
                                <Button
                                    className="w-full rounded-full"
                                    size="sm"
                                    variant={activeWorksheet?.name === worksheet.name ? "default" : "secondary"}
                                    onClick={() => setActiveWorksheet(worksheet)}
                                >
                                    {worksheet?.name}
                                </Button>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                ) : (
                    <p>No worksheets available</p>
                )}
            </Carousel>
            <Stage width={stageSize.width - 100} height={stageSize.height - 220} className="border rounded-2xl">
                <Layer>
                    {tiles.map((tile, index) =>
                        tile.type === 'image' && tile.src && loadedImages[tile.src] ? (
                            <Group
                                key={tile.uuid}
                                id={tile.uuid}
                                x={tile.x || 200}
                                y={tile.y || 200}
                            >
                                <KonvaImage
                                    image={loadedImages[tile.src]}
                                    width={tile.width || 100}
                                    height={tile.height || 100}
                                />
                                <Rect
                                    x={(tile.width || 100) / 2 - 30}
                                    y={(tile.height || 100) / 2 - 16}
                                    width={60}
                                    height={32}
                                    fill="#7feca5"
                                    cornerRadius={4}
                                />
                                <Text
                                    text={`A${index + 1}`}
                                    fontSize={16}
                                    fill="#109841"
                                    x={(tile.width || 100) / 2 - 50}
                                    y={(tile.height || 100) / 2 - 8}
                                    width={100}
                                    align="center"
                                    verticalAlign="middle"
                                />
                            </Group>
                        ) : (
                            <Rect
                                key={tile.uuid}
                                id={tile.uuid}
                                x={tile.x || 200}
                                y={tile.y || 200}
                                width={tile.width || 100}
                                height={tile.height || 100}
                                fill={tile.fill || "#cccccc"}
                            />
                        )
                    )}
                </Layer>
            </Stage>
        </>
    );
};

export default ReservationPage;