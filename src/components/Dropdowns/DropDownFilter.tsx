import { Dropdown } from "flowbite-react";
import { useTranslation } from "react-i18next";

interface VariableMap {
    [key: string]: string;
}

const DropDownFilter = ({ items, selectedItem, setSelectedItem }: { items: string[], selectedItem: string, setSelectedItem: (item: string) => void }) => {
    const { i18n } = useTranslation();
    const variables: VariableMap = {
        Id: "کد",
        Username: "نام کاربری",
        Role: "نقش",
        Status: "وضعیت",
        Email: "ایمیل",
        Name: "نام",
        Category: "دسته بندی",
        Discount: "تخفیف",
        TotalPrice: "قیمت کل",
        Number: "موجودی",
        Description: "توضیحات",
        ProductName: "نام محصول",
        Date: "تاریخ",
        Price: "قیمت"
    };
    return (
        <div className={`absolute ${i18n.language === "fa" ? "left-0" : "right-0"} top-[50%] transform translate-y-[-50%] dark:bg-black h-full flex items-center px-2`}>

            <Dropdown label={i18n.language === "en" ? selectedItem : variables[selectedItem]} inline>
                {items.map(item =>
                    <Dropdown.Item onClick={() => setSelectedItem(item)} className="whitespace-nowrap">  {i18n.language === "en" ? item : variables[item]}</Dropdown.Item>
                )}
            </Dropdown>
        </div>
    )
}

export default DropDownFilter