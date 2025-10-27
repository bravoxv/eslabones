// FIX: Removed self-referential import of 'SocialLinks' which was causing a conflict.
export interface SocialLinks {
  youtube?: string;
  twitter?: string;
  instagram?: string;
  twitch?: string;
}

export interface Youtuber {
  id: number;
  name: string;
  image?: string | null;
  youtubeChannelId: string;
  socials: SocialLinks;
}
