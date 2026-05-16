export type FestivalIntent = {
  id?: string;
  user_id: string;
  display_name: string;
  area: string;
  artist: string;
  start_time: string;
  end_time: string;
  created_at?: string;
  updated_at?: string;
};

export type SocialProfile = {
  userId: string;
  displayName: string;
};
