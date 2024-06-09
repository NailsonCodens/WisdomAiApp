export type DayProps = {
  day: number;
  title: string;
  scripture: string;
  devotional: string;
  current: number
} 


export interface Devotional {
  daily_devotionals: DayProps[]; // Você precisaria definir a estrutura do objeto dentro desta matriz
  main_title: string;
}


export type DevotionalsProps = {
  id: string;
  main_title: string;
  devotional: Devotional;
  image: string;
}