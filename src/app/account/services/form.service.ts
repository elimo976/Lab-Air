import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private shippingFormCompletedSubject = new BehaviorSubject<boolean>(false);
  shippingFormCompleted$ = this.shippingFormCompletedSubject.asObservable();
  
  private shippingFormDataSubject = new BehaviorSubject<any>(this.getShippingFormDataFromLocalStorage());
  shippingFormData$ = this.shippingFormDataSubject.asObservable();

  constructor() { 
    const completed = this.getShippingFormCompletedFromLocalStorage();
    this.shippingFormCompletedSubject.next(completed);
  }

  setShippingFormCompleted(completed: boolean) {
    this.shippingFormCompletedSubject.next(completed);
    localStorage.setItem('shippingFormCompleted', JSON.stringify(completed));
  }

  setShippingFormData(data: any) {
    this.shippingFormDataSubject.next(data);
    localStorage.setItem('shippingFormData', JSON.stringify(data));
  }

  private getShippingFormCompletedFromLocalStorage(): boolean {
    const data = localStorage.getItem('shippingFormCompleted');
    return data ? JSON.parse(data) : false;
  }

  private getShippingFormDataFromLocalStorage(): any {
    const data = localStorage.getItem('shippingFormData');
    return data ? JSON.parse(data) : {};
  }

  clearShippingFormData() {
    this.shippingFormDataSubject.next({});
    localStorage.removeItem('shippingFormData');
    this.setShippingFormCompleted(false);
  }
}

