import { Link } from 'react-router-dom';
interface BreadcrumbProps {
  pageName?: string ;
  parentPageName?: string ;
  parentPageUrl?: string ;
  location:boolean;
}
const Breadcrumb = ({ pageName, parentPageName ,parentPageUrl,location}: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      {location && <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to={`/${parentPageUrl}`}>
              {parentPageName} /
            </Link>
          </li>
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav>}
    </div>
  );
};

export default Breadcrumb;
