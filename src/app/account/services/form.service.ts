// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class FormService {

//   private shippingFormCompletedSubject = new BehaviorSubject<boolean>(false);
//   shippingFormCompleted$ = this.shippingFormCompletedSubject.asObservable();
  
//   private shippingFormDataSubject = new BehaviorSubject<any>(this.getShippingFormDataFromLocalStorage());
//   shippingFormData$ = this.shippingFormDataSubject.asObservable();

//   private paymentFormCompletedSubject = new BehaviorSubject<boolean>(false);
//   paymentFormCompleted$ = this.paymentFormCompletedSubject.asObservable();

//   private paymentFormDataSubject = new BehaviorSubject<any>(this.getPaymentFormDataFromLocalStorage());
//   paymentFormData$ = this.paymentFormDataSubject.asObservable();

//   constructor() { 
//     const completed = this.getShippingFormCompletedFromLocalStorage();
//     this.shippingFormCompletedSubject.next(completed);

//     const paymentCompleted = this.getPaymentFormCompletedFromLocalStorage();
//     this.paymentFormCompletedSubject.next(paymentCompleted);
//   }

//   setShippingFormCompleted(completed: boolean) {
//     this.shippingFormCompletedSubject.next(completed);
//     localStorage.setItem('shippingFormCompleted', JSON.stringify(completed));
//   }

//   setShippingFormData(data: any) {
//     this.shippingFormDataSubject.next(data);
//     localStorage.setItem('shippingFormData', JSON.stringify(data));
//   }

//   setPaymentFormCompleted(completed: boolean) {
//     this.paymentFormCompletedSubject.next(completed);
//     localStorage.setItem('paymentFormCompleted', JSON.stringify(completed));
//   }

//   setPaymentFormData(data: any) {
//     this.paymentFormDataSubject.next(data);
//     localStorage.setItem('paymentFormData', JSON.stringify(data));
//   }

//   private getShippingFormCompletedFromLocalStorage(): boolean {
//     const data = localStorage.getItem('shippingFormCompleted');
//     return data ? JSON.parse(data) : false;
//   }

//   private getShippingFormDataFromLocalStorage(): any {
//     const data = localStorage.getItem('shippingFormData');
//     return data ? JSON.parse(data) : {};
//   }

//   private getPaymentFormCompletedFromLocalStorage(): boolean {
//     const data = localStorage.getItem('paymentFormCompleted');
//     return data? JSON.parse(data) : false;
//   }

//   private getPaymentFormDataFromLocalStorage(): any {
//     const data = localStorage.getItem('paymentFormData');
//     return data? JSON.parse(data) : {};
//   }

//   clearShippingFormData() {
//     this.shippingFormDataSubject.next({});
//     localStorage.removeItem('shippingFormData');
//     this.setShippingFormCompleted(false);
//   }

//   clearPaymentFormData() {
//     this.paymentFormDataSubject.next({});
//     localStorage.removeItem('paymentFormData');
//     this.setPaymentFormCompleted(false);
//   }
// }
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private shippingFormCompletedSubject = new BehaviorSubject<boolean>(this.getShippingFormCompletedFromLocalStorage());
  shippingFormCompleted$ = this.shippingFormCompletedSubject.asObservable();

  private shippingFormDataSubject = new BehaviorSubject<any>(this.getShippingFormDataFromLocalStorage());
  shippingFormData$ = this.shippingFormDataSubject.asObservable();

  private paymentFormCompletedSubject = new BehaviorSubject<boolean>(this.getPaymentFormCompletedFromLocalStorage());
  paymentFormCompleted$ = this.paymentFormCompletedSubject.asObservable();

  private paymentFormDataSubject = new BehaviorSubject<any>(this.getPaymentFormDataFromLocalStorage());
  paymentFormData$ = this.paymentFormDataSubject.asObservable();

  constructor() {}

  setShippingFormCompleted(completed: boolean) {
    this.shippingFormCompletedSubject.next(completed);
    localStorage.setItem('shippingFormCompleted', JSON.stringify(completed));
  }

  setShippingFormData(data: any) {
    this.shippingFormDataSubject.next(data);
    localStorage.setItem('shippingFormData', JSON.stringify(data));
  }

  setPaymentFormCompleted(completed: boolean) {
    this.paymentFormCompletedSubject.next(completed);
    localStorage.setItem('paymentFormCompleted', JSON.stringify(completed));
  }

  setPaymentFormData(data: any) {
    const maskedData = { ...data, creditCardNumber: this.maskCardNumber(data.creditCardNumber) };
    this.paymentFormDataSubject.next(maskedData);
    localStorage.setItem('paymentFormData', JSON.stringify(maskedData));
  }

  getShippingFormData(): any {
    return this.shippingFormDataSubject.getValue();
  }

  getPaymentFormData(): any {
    return this.paymentFormDataSubject.getValue();
  }

  private getShippingFormCompletedFromLocalStorage(): boolean {
    const data = localStorage.getItem('shippingFormCompleted');
    return data ? JSON.parse(data) : false;
  }

  private getShippingFormDataFromLocalStorage(): any {
    const data = localStorage.getItem('shippingFormData');
    return data ? JSON.parse(data) : {};
  }

  private getPaymentFormCompletedFromLocalStorage(): boolean {
    const data = localStorage.getItem('paymentFormCompleted');
    return data ? JSON.parse(data) : false;
  }

  private getPaymentFormDataFromLocalStorage(): any {
    const data = localStorage.getItem('paymentFormData');
    return data ? JSON.parse(data) : {};
  }

  clearShippingFormData() {
    this.shippingFormDataSubject.next({});
    localStorage.removeItem('shippingFormData');
    this.setShippingFormCompleted(false);
  }

  clearPaymentFormData() {
    this.paymentFormDataSubject.next({});
    localStorage.removeItem('paymentFormData');
    this.setPaymentFormCompleted(false);
  }

  private maskCardNumber(cardNumber: string): string {
    return cardNumber ? cardNumber.slice(-4).padStart(cardNumber.length, '*') : '';
  }
}


