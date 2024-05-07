import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
const SelectImage = ({ image, close, id, onFileSelect }: { image: string, close: () => void, id: string, onFileSelect: (file: File) => void }) => {
    const [selectedAvatar, setSelectedAvatar] = useState<File | string | null>(image);
    const [objectUrl, setObjectUrl] = useState<string | null>(null);

    const { t } = useTranslation();

    useEffect(() => {
        setSelectedAvatar(image);
    }, [image]);

    useEffect(() => {
        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [objectUrl]);

    const HandleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedAvatar(file);
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
            const newObjectUrl = URL.createObjectURL(file);
            setObjectUrl(newObjectUrl);
            onFileSelect(file);
        }
    };
    
 

    const imageUrl = typeof selectedAvatar === 'string' ? selectedAvatar : objectUrl;

    return (
        <div className='flex items-center justify-center relative w-[100%] sm:w-[calc(50%-1.25rem)] md:w-[calc(33.33333%-1.25rem)] lg:w-[calc(20%-1.25rem)] h-[150px] mt-5 rounded border-[1.5px] border-stroke bg-transparent text-black outline-none transition  active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white '>
            {imageUrl ? (
                <img src={imageUrl} alt="" className="h-full w-full object-cover" />
            ) : (
                <p className="text-center">{t("Select an image")}</p>
            )}



            <div onClick={close} className="z-10 cursor-pointer absolute top-[-12px] right-[-12px] h-[25px] rounded-md flex items-center justify-center w-[25px] border-[1.5px] border-stroke dark:border-form-strokedark bg-white dark:bg-form-input">
                <img src="/close.svg" alt="" className="w-[15px] h-[15px]" />
            </div>
            <label htmlFor={`fileInput-${id}`} className="cursor-pointer absolute bottom-[-12px] right-[-12px] h-[25px] rounded-md flex items-center justify-center w-[25px] border-[1.5px] border-stroke dark:border-form-strokedark bg-white dark:bg-form-input">
                <img src="/edit.svg" alt="" className="w-[12px] h-[12px]" />
            </label>
            <input
                id={`fileInput-${id}`}
                type="file"
                title='Select an image'

                className='hidden'
                onChange={HandleChangeAvatar}
            />
        </div>
    );
};

export default SelectImage;
