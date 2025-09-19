import { Catalog } from '../../types/Content.types';
import { FetchWrapper } from "../../core/FetchWrapper"

export const getCatalogList = (): Promise<Catalog[]> =>
  FetchWrapper.get<Catalog[]>("/api/catalogs");

export const getCatalog = (id: number): Promise<Catalog> =>
  FetchWrapper.get<Catalog>(`/api/catalogs/${id}`);

export const addCatalog = (catalog: Partial<Catalog>): Promise<Catalog> =>
  FetchWrapper.post<Catalog>("/api/catalogs", catalog);

export const removeCatalog = (id: number): Promise<void> =>
  FetchWrapper.delete<void>(`/api/catalogs/${id}`);

export const updateCatalog = (id: number, catalog: Partial<Catalog>): Promise<Catalog> =>
  FetchWrapper.patch<Catalog>(`/api/catalogs/${id}`, catalog);