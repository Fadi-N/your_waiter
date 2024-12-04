'use client'

import React, {useRef, useState} from 'react';
import {Layer, Rect, Stage, Text, Circle} from "react-konva";

type Tile = {
    id: string;
    x: number;
    y: number;
    type: 'table' | 'bar';
    width: number;
    height: number;
    fill: string;
};

const ReservationPage = () => {
    const [tiles, setTiles] = useState<Tile[]>([])
    const [draggedTile, setDraggedTile] = useState<'table' | 'bar' | null>(null);

    const stageRef = useRef<any>(null);
    const toolbarRef = useRef<any>(null);

    const handleDragStart = (tileType: 'table' | 'bar') => {
        setDraggedTile(tileType);
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const sidebarElement = document.querySelector('#sidebar-component');

        if (!sidebarElement) {
            return;
        }

        const sidebarElementWidth = sidebarElement?.getBoundingClientRect().width

        const pointerPosition = stageRef.current.getPointerPosition();

        const finalPositionX = e.clientX - sidebarElementWidth - 48;
        const finalPositionY = e.clientY - toolbarRef.current.getBoundingClientRect().height - 48;

        if (!pointerPosition || !draggedTile) return;

        setTiles((prev) => [
            ...prev,
            {
                id: `tile-${Date.now()}`,
                x: finalPositionX,
                y: finalPositionY,
                type: draggedTile,
                width: 100,
                height: 50,
                fill: draggedTile === 'table' ? 'orange' : 'red',
            },
        ]);

        setDraggedTile(null);
    }

    const handleDragMove = (id: string, x: number, y: number) => {
        setTiles((prev) =>
            prev.map((tile) =>
                tile.id === id ? {...tile, x, y} : tile
            )
        );
    }

    return (
        <div className="border rounded-xl w-full h-full p-4">
            <div className="flex gap-2" ref={toolbarRef}>
                <div
                    className="w-20 h-20 bg-orange-500"
                    draggable="true"
                    onDragStart={() => handleDragStart('table')}
                ></div>
                <div
                    className="w-20 h-20 bg-red-500 rounded-full"
                    draggable="true"
                    onDragStart={() => handleDragStart('bar')}
                ></div>

            </div>
            <div
                onDrop={(e) => handleDrop(e)}
                onDragOver={(e) => e.preventDefault()}
                className="w-full h-full bg-gray-100 rounded-lg"
            >
                <Stage width={window.innerWidth} height={window.innerHeight} ref={stageRef}>
                    <Layer>
                        {tiles.map((tile) => (
                            <>
                                <Rect
                                    key={tile.id}
                                    x={tile.x}
                                    y={tile.y}
                                    width={tile.width}
                                    height={tile.height}
                                    fill={tile.fill}
                                    draggable
                                    onDragEnd={(e) =>
                                        handleDragMove(tile.id, e.target.x(), e.target.y())
                                    }
                                />
                                <Text
                                    text="Draggable Text"
                                    x={tile.x}
                                    y={tile.y}
                                />
                            </>

                        ))}
                    </Layer>
                </Stage>
            </div>
        </div>
    );
};

export default ReservationPage;