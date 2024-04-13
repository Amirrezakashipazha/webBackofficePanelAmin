import { useTranslation } from "react-i18next";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import TableOne from "../../components/Tables/TableOne";
import TableThree from "../../components/Tables/TableThree";
import TableTwo from "../../components/Tables/TableTwo";
import DefaultLayout from "../../layout/DefaultLayout";


const Users = () => {
  const { t } = useTranslation();
  return (
    <DefaultLayout>
      <Breadcrumb pageName={t("Users")} />

      <div className="flex flex-col gap-10">
     
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default Users;
