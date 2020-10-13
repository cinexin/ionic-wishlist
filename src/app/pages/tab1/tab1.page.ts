import {Component} from '@angular/core';
import {WishlistService} from '../../services/wishlist.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
      public wishListService: WishlistService,
      private router: Router,
      private alertController: AlertController
  ) {}

  async addWishList() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nueva lista',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { console.log('Canceled'); }
        },
        {
          text: 'Crear',
          handler: (data) => {
            console.log(`Form data: ${data.title}`);
            if (data.title.length > 0) {
              const newList = this.wishListService.create(data.title);
              this.router.navigateByUrl(`/tabs/tab1/add/${newList.id}`);
            }
          }
        }
      ]
    });

    await alert.present();
  }

}
