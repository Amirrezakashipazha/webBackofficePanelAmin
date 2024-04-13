import { useTranslation } from "react-i18next";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import TableOne from "../../components/Tables/TableOne";
import TableThree from "../../components/Tables/TableThree";
import TableTwo from "../../components/Tables/TableTwo";
import DefaultLayout from "../../layout/DefaultLayout";


const Products = () => {
    const { t } = useTranslation();
    return (
    <DefaultLayout>
      <Breadcrumb pageName={t("Products")} />

      <div className="flex flex-col gap-10">
      
        <TableTwo />
   
      </div>
    </DefaultLayout>
  );
};

export default Products;
