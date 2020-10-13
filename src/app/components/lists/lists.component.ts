import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {WishlistService} from '../../services/wishlist.service';
import {WishList} from '../../models/wish-list.model';
import {Router, RouterModule} from '@angular/router';
import {AlertController, IonList} from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @Input() completedTab = true;
  @ViewChild('list') list: IonList;

  constructor(
      public wishListService: WishlistService,
      private router: Router,
      private alertController: AlertController
  ) { }

  ngOnInit() {}

  private getTab(): string {
    if (this.completedTab) {
      return 'tab2';
    } else {
      return  'tab1';
    }
  }

  open(wishList: WishList): void {
    const tab = this.getTab();

    this.router.navigateByUrl(`/tabs/${tab}/add/${wishList.id}`);
  }

  deleteList(wishList: WishList): void {
    this.wishListService.delete(wishList);
  }

  async updateList(wishList: WishList) {
    const tab = this.getTab();

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nombre lista',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: wishList.title,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Canceled');
          }
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            console.log(`Form data: ${data.title}`);
            if (data.title.length > 0) {
              this.wishListService.update(wishList, data.title);
            }
          }
        }
      ]
    });
    await alert.present().then(() => this.list.closeSlidingItems());
  }
}
