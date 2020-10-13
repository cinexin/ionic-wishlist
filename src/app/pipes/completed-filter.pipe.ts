import { Pipe, PipeTransform } from '@angular/core';
import {WishList} from '../models/wish-list.model';

@Pipe({
  name: 'completedFilter',
  pure: false
})
export class CompletedFilterPipe implements PipeTransform {

  transform(wishLists: WishList[], completed: boolean = true): WishList[] {
    return wishLists.filter( (wishList: WishList) => {
      return wishList.completed === completed;
    });
  }

}
