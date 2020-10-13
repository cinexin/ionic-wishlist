import { Component } from '@angular/core';
import {WishlistService} from '../../services/wishlist.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public wishListService: WishlistService) {}

}
