import { SITE } from "@config";
import getPageNumbers from "./getPageNumbers";

interface GetPaginationProps<T> {
  projects: T;
  page: string | number;
  isIndex?: boolean;
}

const getProjectsPagination = <T>({
  projects,
  page,
  isIndex = false,
}: GetPaginationProps<T[]>) => {
  const totalPagesArray = getPageNumbers(projects.length);
  const totalPages = totalPagesArray.length;

  const currentPage = isIndex
    ? 1
    : page && !isNaN(Number(page)) && totalPagesArray.includes(Number(page))
      ? Number(page)
      : 0;

  const lastProject = isIndex
    ? SITE.projectPerPage
    : currentPage * SITE.projectPerPage;
  const startProject = isIndex ? 0 : lastProject - SITE.projectPerPage;
  const paginatedProjects = projects.slice(startProject, lastProject);

  return {
    totalPages,
    currentPage,
    paginatedProjects,
  };
};

export default getProjectsPagination;
