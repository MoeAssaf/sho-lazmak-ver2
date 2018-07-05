import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  offer_id: any
  owner_id: any
  uid: string;
  email: string;
  profile: any;
  owner_profile: any;
  product: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private AFauth : AngularFireAuth,
    private afDB: AngularFireDatabase,
    private firebaseApp : FirebaseApp,
    private call: CallNumber,
    private emailComposer: EmailComposer
  ) {
    this.offer_id = this.navParams.get('id');
    this.owner_id = this.navParams.get('owner');
    this.grabProfile();
    this.grabOwner()
    this.grabOffer()
  }

  ionViewDidLoad() {
    console.log(this.owner_id);
    console.log(this.offer_id);

  }
  async grabOwner(){
    this.afDB.object(`profile/${this.owner_id}`).valueChanges().subscribe(owner_data =>{
      this.getProfileImageUrl();
      this.owner_profile = owner_data;
      console.log(owner_data);
    })
  }
  async grabProfile(){
    const result = await this.AFauth.authState.subscribe(data => {
      this.uid = data.uid;
      this.email = data.email;
       this.profile = this.afDB.object(`profile/${this.uid}`).valueChanges();
                 this.profile.subscribe(data => {console.log('Grabbed profile', data);
                                    this.profile = data;
                                  
                                                  });

   })
  }
  grabOffer(){
    this.afDB.object(`public_product/${this.offer_id}`).valueChanges().subscribe(details=>{
      this.product = details;
      
    })
  }
  getProfileImageUrl() {
    try {
    const storageRef = this.firebaseApp.storage().ref().child(`${this.owner_id}/profile_picture/image`);
    storageRef.getDownloadURL().then(url => {this.owner_profile.picture = url;
      console.log('Picture link',this.owner_profile.picture)
    });}
    catch(e){
      console.log(e)
    }
  }
  dial(number){
    this.call.callNumber(number, true).then(res=>
    console.log('dialing')).catch(err=>
      console.log('dialing failed')
    )
  }
  mailTo(){
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
      }
     });
     
     let email = {
       to: this.owner_profile.email,
      //  cc: 'erika@mustermann.de',
      //  bcc: ['john@doe.com', 'jane@doe.com'],
      //  attachments: [
      //    'file://img/logo.png',
      //    'res://icon.png',
      //    'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
      //    'file://README.pdf'
      //  ],
       subject: this.product.name,
      //  body: 'How are you? Nice greetings from Leipzig',
       isHtml: true
     };
     
     // Send a text message using default options
     this.emailComposer.open(email);
  }
  addToCart(){
    const cart = {
      id: this.offer_id,
      owner: this.owner_id
    }
    this.afDB.object(`profile/${this.uid}/carts/${this.offer_id}`).set(cart)
  }
}
