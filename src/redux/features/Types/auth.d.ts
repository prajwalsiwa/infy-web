interface Group {
  id: number;
  name: string;
}

interface Property {
  id: number;
  name: string;
}

export interface UserProfileResponse {
  pk: number;
  email: string;
  mobile: string | null;
  first_name: string;
  last_name: string;
  display_name: string | null;
  is_active: boolean;
  profile_picture: string | null;
  groups: Group;
  properties: Property[];
}
