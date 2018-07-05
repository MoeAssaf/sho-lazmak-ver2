import { AddPage } from './../add/add';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController, ActionSheetController} from 'ionic-angular';
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';



@IonicPage()
@Component({
  selector: 'page-used',
  templateUrl: 'used.html',
})
export class UsedPage {
  uid: any
  email: any
  profile: any
  products: any;
    constructor
  ( public navCtrl: NavController,
    public navParams: NavParams,
    private AFauth : AngularFireAuth,
    private afDB: AngularFireDatabase, 
    public actionSheetCtrl: ActionSheetController) {
    this.grabProfile()
    this.getOffers()
  }
  async grabProfile(){
    const result = await this.AFauth.authState.subscribe(data => {
      this.uid = data.uid;
      this.email = data.email;
       this.profile = this.afDB.list(`profile/${this.uid}`).valueChanges();
                 this.profile.subscribe(data => {console.log('Grabbed profile', data);
                                    this.profile = data;
                                  
                                                  });

   })
  }
  getOffers(){
    this.afDB.list('public_product',ref => ref.orderByChild('state').equalTo('used')).valueChanges().subscribe(offers=>{
      this.products = this.setValues(offers);
      console.log(this.products)
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UsedPage');
  }
  setValues(data){
    const array = Object.keys(data).map(i => data[i]);
    // let keys = Object.keys(data);
    // var i;
    // for (i = 0; i < keys.length; i++) { 
    //   array[i].id = `${keys[i]}`;
      return array
}
holdEvent(e, id){
  this.presentActionSheet(id)
}
presentActionSheet(id) {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'What would you like to do?',
    buttons: [
            {
        text: 'Add offer to cart',
        handler: () => {
          console.log('Archive clicked');
        }
      },
      {
        text: 'Report',
        role: 'destructive',
        handler: () => {
          // this.deleteOffer(id)
        }
      },
      // {
      //   text: 'Edit selected offer',
      //   handler: () => {
      //     this.editOffer(id);
      //     console.log('Archive clicked');
      //   }
      // },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });

  actionSheet.present();

}
viewOffer(offerID, ownerID){
  const data = {
    id: offerID,
    owner: ownerID
  }
  this.navCtrl.push(AddPage, data)
} 
doRefresh(refresher) {
  console.log('Begin async operation', refresher);

  setTimeout(() => {
    console.log('Async operation has ended');
    this.navCtrl.setRoot(UsedPage);
    refresher.complete();
  }, 2000);
}
}
