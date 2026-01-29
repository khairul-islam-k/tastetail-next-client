export interface TRecipe {
    _id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  category: string;
  cuisine: string;
  cookingTime: number;
  calories: number;
  image: string;
}