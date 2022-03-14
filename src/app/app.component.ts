import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  paymentHandler:any = null;

  constructor() { }

  ngOnInit() {
    this.invokeStripe();
  }
  
  initializePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KahK5H7oJb6ZglFumQph0JIqiBdTC8NlGewgUGTAmm9N7NQ9cYFfPY9O3KOPMSTudZz5VpgHVXRW4p6ipst9zL700DBxDqv8d',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log({stripeToken})
        alert('Stripe token generated!');
      }
    });
  
    paymentHandler.open({
      name: 'FreakyJolly',
      description: 'Buying a Hot Coffee',
      amount: amount * 100
    });
  }
  
  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51KahK5H7oJb6ZglFumQph0JIqiBdTC8NlGewgUGTAmm9N7NQ9cYFfPY9O3KOPMSTudZz5VpgHVXRW4p6ipst9zL700DBxDqv8d',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }
      window.document.body.appendChild(script);
    }
  }

}