import * as React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import BackupIcon from '@material-ui/icons/Backup';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

import {environment} from "../common";

export const ProcessImage: React.FC<ProcessImageProps> = ({isAuthor, image, handleUpload}) => {
    const uploadInputRef = React.useRef<HTMLInputElement>(null);
    const [uploadImage, setUploadImage] = React.useState<string>("");

    React.useEffect(() => {
        image && setUploadImage(image);
    }, [image]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            handleUpload(file);
            setUploadImage(reader.result as string);
        };
    };

    const handleImageEdit = () => {
        uploadInputRef.current.value = null;
        uploadInputRef.current.click();
    };

    const handleImageDelete = () => {
        setUploadImage(image || "");
        handleUpload(null);
    };

    return (
        <Grid>
            {uploadImage && <img
                src={uploadImage.startsWith("data:image") ? uploadImage : `${environment.baseFileUrl}${image}`}
                width="100%"
                height="500"
                alt=""
                style={{objectFit: 'cover'}}
            />}
            <input
                ref={uploadInputRef}
                hidden={true}
                accept="image/*"
                type="file"
                onChange={handleImageUpload}
            />
            {isAuthor && <Grid className="absolute">
                <IconButton color="primary" onClick={handleImageEdit}>
                    <BackupIcon fontSize="large"/>
                </IconButton>
                <IconButton color="secondary" onClick={handleImageDelete}>
                    <DeleteSweepIcon fontSize="large"/>
                </IconButton>
            </Grid>}
        </Grid>
    );
};

interface ProcessImageProps {
    image: string;
    isAuthor: boolean;
    handleUpload(file: File): void;
}
