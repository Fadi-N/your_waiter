'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Group, Layer, Rect, Stage, Text, Image as KonvaImage } from "react-konva";
import { Worksheet } from "@prisma/client";
import { getWorksheets } from "@/actions/admin/reservation";

interface WorksheetWithTiles extends Worksheet {
    tiles: Array<{
        uuid: string;
        x: number;
        y: number;
        width: number;
        height: number;
        fill?: string;
        type?: string;
        src?: string;
    }>;
}

interface CustomerSelectionFormProps {
    restaurantId: string;
}

const CustomerSelectionForm: React.FC<CustomerSelectionFormProps> = ({ restaurantId }) => {
    const [loading, setLoading] = useState(true);
    const [worksheets, setWorksheets] = useState<WorksheetWithTiles[]>([]);
    const [activeWorksheet, setActiveWorksheet] = useState<WorksheetWithTiles | null>(null);
    const [loadedImages, setLoadedImages] = useState<Record<string, HTMLImageElement>>({});
    const [tiles, setTiles] = useState<WorksheetWithTiles["tiles"]>([]);
    const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
    const [scale, setScale] = useState(1);

    const worksheetsRef = useRef<any>(null);

    useEffect(() => {
        const updateSize = () => {
            if (!worksheetsRef.current) return;

            const worksheetsRect = worksheetsRef.current.getBoundingClientRect();

            const stageWidth = window.innerWidth - 64;
            const stageHeight = window.innerHeight - worksheetsRect.height - 200;

            const baseWidth = 1200;
            const baseHeight = 800;

            const scaleX = stageWidth / baseWidth;
            const scaleY = stageHeight / baseHeight;

            setScale(Math.min(scaleX, scaleY));

            setStageSize({ width: stageWidth, height: stageHeight });
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

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
                        setLoadedImages((prev) => ({ ...prev, [tile.src as string]: img }));
                    };
                }
            });
            setTiles(activeWorksheet.tiles);
        }
    }, [activeWorksheet]);

    return (
        <div>
            <Carousel className="flex-1" ref={worksheetsRef}>
                {loading ? (
                    <CarouselContent className="m-0 gap-x-3">
                        {[...Array(6)].map((_, index) => (
                            <CarouselItem key={`placeholder-${index}`} className="basis-1/3 p-0 md:basis-1/12">
                                <Button className="w-full rounded-full bg-gray-300" size="sm" />
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
            <Stage
                width={stageSize.width}
                height={stageSize.height}
                scale={{ x: scale, y: scale }}
                className="border rounded-2xl"
            >
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
        </div>
    );
};

export default CustomerSelectionForm;