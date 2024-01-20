export interface SkyUser {
    type: number;
    name: string;
    phone: string;
    memo?: string;
  }
  
  export interface SkyEntry {
    type: number;
    content: string;
    owner: string;
    created_at?:string;
  }

  