
"use client";

import { Spinner } from "flowbite-react";
import { useTranslation } from "react-i18next";
const Loading = () => {
    const { t } = useTranslation();

    return <div className="flex items-center justify-center gap-5 absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[50%]">
        <Spinner aria-label="Default status example" />
        <p>{t("Loading")}</p>
    </div>
}

export default Loading