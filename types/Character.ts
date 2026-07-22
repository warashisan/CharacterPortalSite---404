import type { Character_Image } from "@/types/Character_Image";

export type Character = {
  id: string;
  name: string;
  description: string;
  character_images:Character_Image[];
};