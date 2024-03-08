// export interface SkyUser {
//   type: number;
//   name: string;
//   phone: string;
//   memo?: string;
// }

export interface SkyUser {
  id: string | undefined;
  UID: string;
  email?: string;
  name: string | undefined;
  type?: number | undefined;
  phone: string | undefined;
  created_at?: string;
  memo?: string | undefined;
}

export interface SkyEntry {
  type: number;
  content: string;
  owner: string;
  created_at?: string;
}

