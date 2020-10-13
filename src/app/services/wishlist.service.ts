import { Injectable } from '@angular/core';
import {WishList} from '../models/wish-list.model';
import {ItemList} from '../models/item-list.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishLists: WishList[] = [];

  constructor() {
    this.loadFromPersistence();
    console.log('Service initialized');
  }

  create(title: string): WishList {
    const newList = new WishList(title);
    this.wishLists.push(newList);
    this.persist();
    return newList;
  }

  update(wishList: WishList, title: string){
    wishList.title = title;
    this.persist();
  }

  delete(wishList: WishList): void {
    this.wishLists = this.wishLists.filter(list => list.id !== wishList.id);
    this.persist();
  }

  get(id: string | number): WishList {
    const listId = Number(id);
    return this.wishLists.find( (item: WishList) => item.id === listId);
  }

  /**
   * Save in local storage
   */
  persist() {
    localStorage.setItem('wish-list', JSON.stringify(this.wishLists));
  }

  /**
   * Load from local storage
   */
  loadFromPersistence() {
    if (localStorage.getItem('wish-list')) {
      this.wishLists = JSON.parse(localStorage.getItem('wish-list'));
    } else {
      this.wishLists = [];
    }
  }

  getCompleted(wishList: WishList): ItemList[] {
    return wishList.items.filter(item => item.completed);
  }

  getPending(wishList: WishList): ItemList[] {
    return wishList.items.filter(item => !item.completed);
  }

  isCompleted(wishList: WishList): boolean {
    return (this.getPending(wishList).length === 0);
  }

  markCompleted(wishList: WishList): void {
    if (this.isCompleted(wishList)) {
      wishList.completed = true;
      wishList.completedAt = new Date();
    } else {
      console.error('All items should be completed');
    }
  }

  markIncomplete(wishList: WishList): void {
    if (!this.isCompleted(wishList)) {
      wishList.completedAt = null;
      wishList.completed = false;
    } else {
      console.error('All items are actually completed');
    }
  }

}
