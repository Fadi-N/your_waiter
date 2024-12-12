'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Layer, Rect, Stage, Text, Image as KonvaImage, Transformer } from "react-konva";
import Image from "next/image";

type Tile = {
    id: string;
    x: number;
    y: number;
    type: 'table' | 'bar' | 'image';
    width: number;
    height: number;
    fill: string;
    src?: string;
};

const ReservationPage = () => {
    const [tiles, setTiles] = useState<Tile[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [draggedTile, setDraggedTile] = useState<{
        type: 'table' | 'bar' | 'image';
        config?: { src?: string; width?: number; height?: number };
    } | null>(null);
    const [loadedImages, setLoadedImages] = useState<Record<string, HTMLImageElement>>({});

    const stageRef = useRef<any>(null);
    const toolbarRef = useRef<any>(null);
    const transformerRef = useRef<any>(null);

    useEffect(() => {
        if (selectedId) {
            const transformer = transformerRef.current;
            const selectedNode = stageRef.current.findOne(`#${selectedId}`);
            if (transformer && selectedNode) {
                transformer.nodes([selectedNode]);
                transformer.getLayer().batchDraw();
            }
        }
    }, [selectedId]);

    const handleDragStart = (
        tileType: 'table' | 'bar' | 'image',
        config?: { src?: string; width?: number; height?: number }
    ) => {
        if (config?.src && !loadedImages[config.src]) {
            const img = new window.Image();
            img.src = config.src;
            img.onload = () => {
                setLoadedImages((prev) => ({ ...prev, [config.src]: img }));
            };
        }
        setDraggedTile({ type: tileType, config });
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const sidebarElement = document.querySelector('#sidebar-component');
        if (!sidebarElement) return;

        const sidebarElementWidth = sidebarElement?.getBoundingClientRect().width;
        const finalPositionX = e.clientX - sidebarElementWidth - 48;
        const finalPositionY = e.clientY - toolbarRef.current.getBoundingClientRect().height - 48;

        if (!draggedTile) return;

        setTiles((prev) => [
            ...prev,
            {
                id: `tile-${Date.now()}`,
                x: finalPositionX,
                y: finalPositionY,
                type: draggedTile.type,
                width: draggedTile.config?.width || 100,
                height: draggedTile.config?.height || 100,
                fill: draggedTile.type === 'table' ? 'SlateGrey' : 'red',
                src: draggedTile.config?.src,
            },
        ]);
    };

    const handleDragMove = (id: string, x: number, y: number) => {
        setTiles((prev) =>
            prev.map((tile) =>
                tile.id === id ? { ...tile, x, y } : tile
            )
        );
    };

    const handleTransform = (id: string, newAttrs: any) => {
        setTiles((prev) =>
            prev.map((tile) =>
                tile.id === id
                    ? {
                        ...tile,
                        x: newAttrs.x,
                        y: newAttrs.y,
                        width: Math.max(5, newAttrs.width + newAttrs.scaleX),
                        height: Math.max(5, newAttrs.height + newAttrs.scaleY),
                    }
                    : tile
            )
        );
    };

    return (
        <div className="border rounded-xl w-full h-full p-4">
            <div className="flex gap-2" ref={toolbarRef}>
                <div
                    className="w-[100px] h-[100px]"
                    draggable="true"
                    onDragStart={() => handleDragStart('table')}
                    style={{ backgroundColor: 'SlateGrey' }}
                ></div>
                {['two-chairs', 'four-chairs', 'six-chairs'].map((image, idx) => (
                    <Image
                        key={idx}
                        width={image === 'two-chairs' ? 100 : image === 'four-chairs' ? 200 : 300}
                        height={100}
                        src={`/assets/reservation-system/${image}.png`}
                        alt={image}
                        draggable="true"
                        onDragStart={() => handleDragStart('image', {
                            src: `/assets/reservation-system/${image}.png`,
                            width: image === 'two-chairs' ? 100 : image === 'four-chairs' ? 200 : 300,
                            height: 100
                        })}
                    />
                ))}
            </div>
            <div
                onDrop={(e) => handleDrop(e)}
                onDragOver={(e) => e.preventDefault()}
                className="w-full h-full bg-gray-100 rounded-lg"
            >
                <Stage
                    width={window.innerWidth}
                    height={window.innerHeight}
                    ref={stageRef}
                    onMouseDown={(e) => {
                        if (e.target === e.target.getStage()) {
                            setSelectedId(null);
                        }
                    }}
                >
                    <Layer>
                        {tiles.map((tile, index) =>
                            tile.type === 'image' && tile.src && loadedImages[tile.src] ? (
                                <>
                                    <KonvaImage
                                        key={tile.id}
                                        id={tile.id}
                                        image={loadedImages[tile.src]}
                                        x={tile.x}
                                        y={tile.y}
                                        width={tile.width}
                                        height={tile.height}
                                        draggable
                                        onClick={() => setSelectedId(tile.id)}
                                        onDragEnd={(e) =>
                                            handleDragMove(tile.id, e.target.x(), e.target.y())
                                        }
                                        onTransformEnd={(e) => {
                                            const node = e.target;
                                            handleTransform(tile.id, node.attrs);
                                        }}
                                    />
                                    <Text
                                        key={`text-${tile.id}`}
                                        text={`A${index + 1}`}
                                        fontSize={16}
                                        fill="black"
                                        x={tile.x + tile.width / 2 - 50}
                                        y={tile.y + tile.height / 2 - 8}
                                        width={100}
                                        align="center"
                                        verticalAlign="middle"
                                    />
                                </>
                            ) : (
                                <Rect
                                    key={tile.id}
                                    id={tile.id}
                                    x={tile.x}
                                    y={tile.y}
                                    width={tile.width}
                                    height={tile.height}
                                    fill={tile.fill}
                                    draggable
                                    onClick={() => setSelectedId(tile.id)}
                                    onDragEnd={(e) =>
                                        handleDragMove(tile.id, e.target.x(), e.target.y())
                                    }
                                    onTransformEnd={(e) => {
                                        const node = e.target;
                                        handleTransform(tile.id, node.attrs);
                                    }}
                                />
                            )
                        )}
                        {selectedId && (
                            <Transformer ref={transformerRef} />
                        )}
                    </Layer>
                </Stage>
            </div>
        </div>
    );
};

export default ReservationPage;