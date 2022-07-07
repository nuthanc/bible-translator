export type BookObject = {
  id: string;
  name: string;
};

export interface BookListResponse {
  data: BookObject[];
}
