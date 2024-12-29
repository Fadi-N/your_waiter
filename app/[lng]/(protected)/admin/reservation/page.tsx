'use client';

import React, {useRef, useState, useEffect} from 'react';
import {Group, Layer, Rect, Stage, Text, Image as KonvaImage, Transformer} from "react-konva";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {FaPlus} from "react-icons/fa6";
import {Separator} from "@/components/ui/separator";
import {getWorksheets, saveWorksheet} from "@/actions/admin/reservation";
import {useRestaurantContext} from "@/context/restaurant-context";
import {BsPencil} from "react-icons/bs";
import {FaSave} from "react-icons/fa";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {v4 as uuidv4} from 'uuid';
import NewWorksheetForm from "@/components/admin/new/new-worksheet-form";
import EditWorksheetForm from "@/components/admin/edit/edit-worksheet-form";

type Tile = {
    uuid: string;
    x: number;
    y: number;
    type: 'table' | 'bar' | 'image';
    width: number;
    height: number;
    fill?: string;
    src?: string;
};

type Worksheet = {
    id: string;
    name: string;
    description?: string;
    tiles: Tile[];
    restaurantId: string;
};

const ReservationPage = () => {
    const {selectedRestaurant} = useRestaurantContext();

    const [tiles, setTiles] = useState<Tile[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [draggedTile, setDraggedTile] = useState<{
        type: 'table' | 'bar' | 'image';
        config?: { src?: string; width?: number; height?: number };
    } | null>(null);
    const [loadedImages, setLoadedImages] = useState<Record<string, HTMLImageElement>>({});
    const [stageMeasurement, setStageMeasurement] = useState({
        width: 0,
        height: 0,
    })
    const [crudIcons, setCrudIcons] = useState<Record<string, boolean>>({
        save: false,
        edit: false,
        add: false,
    });
    const [loading, setLoading] = useState(true);
    const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
    const [activeWorksheet, setActiveWorksheet] = useState<Worksheet | null>(null);

    const stageRef = useRef<any>(null);
    const crudRef = useRef<any>(null);
    const toolbarRef = useRef<any>(null);
    const worksheetRef = useRef<any>(null);
    const transformerRef = useRef<any>(null);

    useEffect(() => {
        const fetchWorksheets = async () => {
            if (!selectedRestaurant) {
                return;
            }

            setLoading(true);
            try {
                const worksheets = await getWorksheets(selectedRestaurant.id);
                setWorksheets(worksheets);
                setActiveWorksheet(worksheets[0]);
            } catch (error) {
                console.error("Error fetching worksheets:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorksheets();
    }, [selectedRestaurant]);

    useEffect(() => {
        if (activeWorksheet?.tiles) {
            activeWorksheet.tiles.forEach((tile) => {
                if (tile.src && !loadedImages[tile.src]) {
                    const img = new window.Image();
                    img.src = tile.src;
                    img.onload = () => {
                        setLoadedImages((prev) => ({...prev, [tile.src as string]: img}));
                    };
                }
            });
            setTiles(activeWorksheet.tiles);
        }
    }, [activeWorksheet]);

    useEffect(() => {
        const sidebarElement = document.getElementById("sidebar-component");

        if (!sidebarElement) return;

        const sidebarElementRect = sidebarElement.getBoundingClientRect();
        const toolbarRect = toolbarRef.current.getBoundingClientRect();
        const crudRect = crudRef.current.getBoundingClientRect();

        setStageMeasurement({
            width: window.innerWidth - sidebarElementRect.width - 96,
            height: window.innerHeight - toolbarRect.height - crudRect.height - 96
        })

        //worksheetRef.current.style.width = `${window.innerWidth - sidebarElementRect.width - 64}px`;
        //worksheetRef.current.style.height = `${window.innerHeight - toolbarRect.height - 64}px`;
    }, []);

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
                setLoadedImages((prev) => ({...prev, [config.src as string]: img}));
            };
        }
        setDraggedTile({type: tileType, config});
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
                uuid: uuidv4(),
                x: finalPositionX,
                y: finalPositionY,
                type: draggedTile.type,
                width: draggedTile.config?.width || 100,
                height: draggedTile.config?.height || 100,
                fill: draggedTile.type === 'table' ? '#121625' : undefined,
                src: draggedTile.config?.src || undefined,
            },
        ]);
    };

    const handleDragMove = (uuid: string, x: number, y: number) => {
        setTiles((prev) =>
            prev.map((tile) =>
                tile.uuid === uuid ? {...tile, x, y} : tile
            )
        );
    };

    const handleTransform = (uuid: string, nodeAttrs: any) => {
        setTiles((prev) =>
            prev.map((tile) => {
                if (tile.uuid === uuid) {
                    const { x, y, width, height, scaleX, scaleY } = nodeAttrs;

                    return {
                        ...tile,
                        x,
                        y,
                        width: Math.max(5, width * scaleX),
                        height: Math.max(5, height * scaleY),
                    };
                }
                return tile;
            })
        );

        const node = stageRef.current.findOne(`#${uuid}`);
        if (node) {
            node.scaleX(1);
            node.scaleY(1);
        }
    };

    const handleSaveWorksheet = async () => {
        if (!selectedRestaurant) {
            return;
        }

        const response = await saveWorksheet({
            worksheetId: activeWorksheet?.id || "",
            restaurantId: selectedRestaurant.id,
            tiles,
        });

        if (response.error) {
            console.error(response.error);
        } else {
            console.log(response.success);
        }
    };

    const handleCrudIcons = (value: string) => {
        setCrudIcons((prev) => ({
            ...prev,
            [value]: !prev[value],
        }))
    }

    const refreshWorksheets = async () => {
        if (!selectedRestaurant) {
            return;
        }

        const updatedWorksheets = await getWorksheets(selectedRestaurant.id);
        setWorksheets(updatedWorksheets);
    };

    return (
        <div className="border rounded-xl w-full h-full p-4">
            <div className="flex flex-row items-center space-x-4" ref={crudRef}>
                <Carousel className="flex-1">
                    <CarouselContent className="m-0 gap-x-3">
                        {loading ? (
                            [...Array(6)].map((_, index) => (
                                <CarouselItem key={`placeholder-${index}`} className="basis-1/3 p-0 md:basis-1/12">
                                    <Button
                                        className="w-full rounded-full bg-gray-300"
                                        size="sm"
                                    />
                                </CarouselItem>
                            ))
                        ) : (
                            Array.isArray(worksheets) ? (
                                worksheets.map((worksheet, index) => (
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
                                ))
                            ) : (
                                <p>No worksheets available</p>
                            )
                        )}
                    </CarouselContent>
                </Carousel>
                <div className="flex space-x-2 crud-container">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    className="rounded-full bg-blue-500 hover:bg-blue-500"
                                    variant="secondary"
                                    size="sm"
                                    onClick={handleSaveWorksheet}
                                    onMouseEnter={() => handleCrudIcons("save")}
                                    onMouseLeave={() => handleCrudIcons("save")}
                                >
                                    {crudIcons.save && <FaSave className="w-3 h-3"/>}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="me-2 bg-blue-500" side="left">
                                <p>Save current worksheet</p>
                            </TooltipContent>
                        </Tooltip>
                        <Dialog>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <DialogTrigger asChild>
                                        <Button
                                            className="rounded-full bg-[#fbb627] hover:bg-[#fbb627]"
                                            variant="secondary"
                                            size="sm"
                                            onMouseEnter={() => handleCrudIcons("edit")}
                                            onMouseLeave={() => handleCrudIcons("edit")}
                                        >
                                            {crudIcons.edit && <BsPencil className="w-3 h-3"/>}
                                        </Button>
                                    </DialogTrigger>
                                </TooltipTrigger>
                                <TooltipContent className="me-2 bg-[#fbb627]" side="left">
                                    <p>Edit current worksheet</p>
                                </TooltipContent>
                            </Tooltip>

                            <DialogContent>
                                <DialogTitle>Edit {activeWorksheet?.name} Worksheet</DialogTitle>
                                <DialogDescription>
                                    Modify the worksheet details below. Save your changes or delete the worksheet if it
                                    is no longer needed.
                                </DialogDescription>
                                <hr/>
                                <div className="overflow-y-auto max-h-[70vh]">
                                    {selectedRestaurant && activeWorksheet && (
                                        <EditWorksheetForm
                                            restaurantId={selectedRestaurant.id}
                                            activeWorksheet={activeWorksheet}
                                        />
                                    )}
                                </div>
                            </DialogContent>
                        </Dialog>
                        <Dialog>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <DialogTrigger asChild>
                                        <Button
                                            className="rounded-full bg-[#1cc038] hover:bg-[#1cc038]"
                                            variant="secondary"
                                            size="sm"
                                            onMouseEnter={() => handleCrudIcons("add")}
                                            onMouseLeave={() => handleCrudIcons("add")}
                                        >
                                            {crudIcons.add && <FaPlus className="w-3 h-3"/>}
                                        </Button>
                                    </DialogTrigger>
                                </TooltipTrigger>
                                <TooltipContent className="me-2 bg-[#1cc038]" side="left">
                                    <p>Create new worksheet</p>
                                </TooltipContent>
                            </Tooltip>

                            <DialogContent>
                                <DialogTitle>Create New Worksheet</DialogTitle>
                                <DialogDescription>
                                    Enter the worksheet name below and confirm to add a new worksheet layout.
                                </DialogDescription>
                                <hr/>
                                <div className="overflow-y-auto max-h-[70vh]">
                                    {selectedRestaurant && (
                                        <NewWorksheetForm
                                            selectedRestaurantId={selectedRestaurant.id}
                                            onWorksheetCreated={refreshWorksheets}
                                        />
                                    )}
                                </div>
                            </DialogContent>
                        </Dialog>
                    </TooltipProvider>
                </div>
            </div>
            <Separator className="my-4"/>
            <div className="flex gap-2" ref={toolbarRef}>
                <div
                    className="w-[100px] h-[100px] rounded-lg"
                    draggable="true"
                    onDragStart={() => handleDragStart('table')}
                    style={{backgroundColor: '#121625'}}
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
                ref={worksheetRef}
                onDrop={(e) => handleDrop(e)}
                onDragOver={(e) => e.preventDefault()}
                className="mt-4 grid-background"
            >
                <Stage
                    width={stageMeasurement.width}
                    height={stageMeasurement.height}
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
                                <Group
                                    key={tile.uuid}
                                    id={tile.uuid}
                                    draggable
                                    x={tile.x}
                                    y={tile.y}
                                    onClick={() => tile.type !== 'image' && setSelectedId(tile.uuid)}
                                    onDragEnd={(e) =>
                                        handleDragMove(tile.uuid, e.target.x(), e.target.y())
                                    }
                                    onTransformEnd={(e) => {
                                        const node = e.target;
                                        handleTransform(tile.uuid, node.attrs);
                                    }}
                                >
                                    <KonvaImage
                                        image={loadedImages[tile.src]}
                                        width={tile.width}
                                        height={tile.height}
                                    />
                                    <Rect
                                        x={tile.width / 2 - 30}
                                        y={tile.height / 2 - 16}
                                        width={60}
                                        height={32}
                                        fill="#7feca5"
                                        cornerRadius={4}
                                    />
                                    <Text
                                        text={`A${index + 1}`}
                                        fontSize={16}
                                        fill="#109841"
                                        x={tile.width / 2 - 50}
                                        y={tile.height / 2 - 8}
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
                                    width={tile.width}
                                    height={tile.height}
                                    fill={tile.fill}
                                    draggable
                                    onClick={() => setSelectedId(tile.uuid)}
                                    onDragEnd={(e) =>
                                        handleDragMove(tile.uuid, e.target.x(), e.target.y())
                                    }
                                    onTransformEnd={(e) => {
                                        const node = e.target;
                                        handleTransform(tile.uuid, node.attrs);
                                    }}
                                />
                            )
                        )}
                        {selectedId && <Transformer ref={transformerRef}/>}
                    </Layer>
                </Stage>
            </div>
        </div>
    );
};

export default ReservationPage;