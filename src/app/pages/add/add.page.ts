import { Component, OnInit } from '@angular/core';
import {WishlistService} from '../../services/wishlist.service';
import {ActivatedRoute} from '@angular/router';
import {WishList} from '../../models/wish-list.model';
import {ItemList} from '../../models/item-list.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  wishList: WishList;
  itemName: string;

  constructor(
      private wishListService: WishlistService,
      private route: ActivatedRoute
  ) {
    const listId = this.route.snapshot.paramMap.get('listId');
    console.log(`List id: ${listId}`);
    this.wishList = wishListService.get(listId);
  }

  ngOnInit() {
  }

  addItem() {
    if (this.itemName.length > 0) {
      const newItem = new ItemList(this.itemName);
      this.wishList.items.push(newItem);
      this.itemName = '';
      this.wishListService.persist();
    }
  }

  checkChange() {

    const numOfPendingItems = this.wishListService.getPending(this.wishList).length;

    if (this.wishListService.isCompleted(this.wishList)) {
      this.wishListService.markCompleted(this.wishList);
    } else {
      this.wishListService.markIncomplete(this.wishList);
    }
    this.wishListService.persist();

    console.log(`Completed?: ${this.wishList.completed}`);
    console.log(`Pending: ${numOfPendingItems}`);
  }

  deleteWish(i: number): void {
    this.wishList.items.splice(i, 1);
    this.wishListService.persist();
  }
}
