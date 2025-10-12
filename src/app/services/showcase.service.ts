import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CategoryDTO, MenuItemDTO } from '../models/menu-models';

@Injectable({
  providedIn: 'root'
})
export class ShowcaseService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Showcase`;

  // Categories
  getCategories(): Observable<CategoryDTO[]> {
    return this.http.get<CategoryDTO[]>(`${this.apiUrl}/categories`);
  }

  createCategory(category: CategoryDTO): Observable<CategoryDTO> {
    return this.http.post<CategoryDTO>(`${this.apiUrl}/categories`, category);
  }

  updateCategory(id: number, category: CategoryDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/categories/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/categories/${id}`);
  }

  // Menu Items
  getAllMenuItems(): Observable<MenuItemDTO[]> {
    return this.http.get<MenuItemDTO[]>(`${this.apiUrl}/menu`);
  }

  getMenuItemsByCategory(categoryId: number): Observable<MenuItemDTO[]> {
    return this.http.get<MenuItemDTO[]>(`${this.apiUrl}/menu/category/${categoryId}`);
  }

  getMenuItem(id: number): Observable<MenuItemDTO> {
    return this.http.get<MenuItemDTO>(`${this.apiUrl}/menu/${id}`);
  }

  getRecommendedItems(): Observable<MenuItemDTO[]> {
    return this.http.get<MenuItemDTO[]>(`${this.apiUrl}/menu/recommended`);
  }

  getVegetarianItems(): Observable<MenuItemDTO[]> {
    return this.http.get<MenuItemDTO[]>(`${this.apiUrl}/menu/vegetarian`);
  }

  createMenuItem(menuItem: MenuItemDTO): Observable<MenuItemDTO> {
    return this.http.post<MenuItemDTO>(`${this.apiUrl}/menu`, menuItem);
  }

  updateMenuItem(id: number, menuItem: MenuItemDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/menu/${id}`, menuItem);
  }

  deleteMenuItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/menu/${id}`);
  }

  setAvailability(id: number, isAvailable: boolean): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/menu/${id}/availability`, isAvailable);
  }
}
