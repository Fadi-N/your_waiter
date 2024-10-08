'use client'

import React, {useEffect, useState} from 'react';
import { CldUploadButton } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
}

const ImageUpload = ({ value, onChange } : ImageUploadProps) => {
    const [imageUrl, setImageUrl] = useState<string | null>(value || null);

    const handleUpload = (result: any) => {
        if (result.info && result.info.secure_url) {
            setImageUrl(result.info.secure_url);
            onChange(result.info.secure_url);
        }
    };


    return (
        <div>
            <CldUploadButton
                onSuccess={handleUpload}
                uploadPreset="y174qmb9"
                className="w-full pointer-events-auto"
            >
                <div className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-10 border-neutral-300 rounded-lg flex flex-col justify-center items-center gap-4 text-neutral-600">
                    <TbPhotoPlus className="w-10 h-10" />
                    <div className="font-semibold">
                        {imageUrl ? 'Replace Image' : 'Click to upload'}
                    </div>
                    {imageUrl && (
                        <div className="absolute inset-0 w-full h-full">
                            <img src={imageUrl} alt="Uploaded" className="object-cover" />
                        </div>
                    )}
                </div>
            </CldUploadButton>
        </div>
    );
};

export default ImageUpload;
