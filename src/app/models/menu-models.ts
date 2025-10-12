export interface CategoryDTO {
  id: number;
  name: string;
  description?: string;
  displayOrder: number;
  iconUrl?: string;
}

export interface MenuItemDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  categoryName?: string;
  isAvailable: boolean;
  allergens?: string;
  imageUrl?: string;
  preparationTime: number;
  isVegetarian: boolean;
  isRecommended: boolean;
}
