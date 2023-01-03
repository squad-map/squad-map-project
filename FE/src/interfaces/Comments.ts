export interface Comment {
  member_id: number;
  member_nickname: string;
  member_profile_image: string;
  comment_id: number;
  content: string;
  written_at: string;
}

export interface Comments {
  content: Comment[];
  size: number;
  number_of_elements: number;
  has_next: boolean;
}
