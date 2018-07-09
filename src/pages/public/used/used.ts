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
  query: any
  
    constructor
  ( public navCtrl: NavController,
    public navParams: NavParams,
    private AFauth : AngularFireAuth,
    private afDB: AngularFireDatabase, 
    public actionSheetCtrl: ActionSheetController,
    private alertCtrl : AlertController) {
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
    this.afDB.list('public_product').valueChanges().subscribe(offers=>{
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
holdEvent(e, id,owner_id){
  this.presentActionSheet(id , owner_id)
  console.log(id)
}
presentActionSheet(id,owner_id) {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'What would you like to do?',
    buttons: [
            {
        text: 'Add offer to cart',
        handler: () => {
          this.addToCart(id, owner_id)
          console.log('Archive clicked');
        }
      },
      {
        text: 'Report',
        role: 'destructive',
        handler: () => {
          const data = {
            reporter: this.uid,
            offer_id: id
            
          }
          this.navCtrl.push(ReportPage, data)
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
addToCart(id , owner_id){
  const cart = {
    id: id,
    owner: owner_id
  }
  if(this.uid == owner_id){
    this.alert('You own this product')
    
  }else{
  this.afDB.object(`profile/${this.uid}/carts/${id}`).set(cart)}
}

alert(comment){
  console.log(comment);
  let ALERT = this.alertCtrl.create({
    title:"Alert",
    message: comment,
    buttons:[{text: " OK!"}]
  })
  ALERT.present()
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
search(e){
this.afDB.list('public_product',ref => ref.orderByChild('name').startAt(this.query))
  .valueChanges().subscribe(offers=>{
    // offers = offers.filter(item=> item.state == 'used')
    this.products = this.setValues(offers);
})

}
doInfinite(infiniteScroll) {
//   console.log('Begin async operation');

//   setTimeout(() => {
//     for (let i = 0; i < 3; i++) {
//       this.products.push( this.products.length );
//     }

//     console.log('Async operation has ended');
//     infiniteScroll.complete();
//   }, 500);
// }
}
}
///////////////////////////////////////////////////////////////////////////////////////////////////
@Component({
  selector: 'page-used',
  templateUrl: 'report.html',
})
export class ReportPage{
  
 report:any
  constructor
  ( public navCtrl: NavController,
    public navParams: NavParams,
    private AFauth : AngularFireAuth,
    private afDB: AngularFireDatabase,
    private alertCtrl: AlertController ){
      this.report = {
        reason: "",
        offer_id: this.navParams.get('offer_id'),
        description:""
    }
      console.log(this.report)
    }
    logForm(){
      if(this.report.reason != "other" && this.report.reason != ""){
        this.pushForm()
      }
      else if(this.report.description != ""){
        this.pushForm()
      }
      else if(this.report.reason != 'other'){
        this.alert('Please choose an option')
      }
      else{
        this.alert('Please provide a reason')
      }
    }
    pushForm(){
      if(this.report.offer_id != null || this.report.offer_id != "undefined"){
      
      this.afDB.database.ref(`report/${this.report.offer_id}`).push(this.report).then(result=> 
     { this.navCtrl.pop();
      console.log('success',result)})
    }
    }
    alert(comment){
      console.log(comment);
      let ALERT = this.alertCtrl.create({
        title:"Alert",
        message: comment,
        buttons:[{text: " OK!"}]
      })
      ALERT.present()
  }
}