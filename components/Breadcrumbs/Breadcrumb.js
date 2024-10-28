import Link from "next/link";

const Breadcrumb = ({ pageName, title }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-sm font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-1 text-xs">
          <li>
            <Link className="font-medium text-primary" href="/dashboard">
              Dashboard {" "}
            </Link>
            /
          </li>
          {title && (
            <li>
              <Link className="font-medium text-primary" href={`/${title}`}>
                {title} {" "}
              </Link>
              /
            </li>
          )}
          <li className="font-medium">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
