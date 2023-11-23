import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export class ItemExchange {
  materialID: number = 0;
  material: any;
  amount: number = 0;
  price: number = 0;
  subtotal: number = 0;
}

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  private dataExchange = new BehaviorSubject<ItemExchange[]>([]);
  public currentDataExchange$ = this.dataExchange.asObservable();
  public qtyItems = new Subject<number>();

  constructor() {
    const storedData = localStorage.getItem('dataExchange');
    const parsedData = storedData ? JSON.parse(storedData) : null;

    this.dataExchange = new BehaviorSubject<any>(parsedData || []);
    this.currentDataExchange$ = this.dataExchange.asObservable();
  }

  saveExchange(): void {
    localStorage.setItem(
      'dataExchange',
      JSON.stringify(this.dataExchange.getValue())
    );
  }

  addExchange(material: any): void {
    debugger;
    const newItem = new ItemExchange();

    newItem.materialID = material.materialID;
    newItem.price = material.price;
    newItem.amount = 1;
    newItem.subtotal = this.calculoSubtotal(newItem);
    newItem.material = material;

    let listExchange = this.dataExchange.getValue();

    if (listExchange) {
      let objIndex = listExchange.findIndex(
        (obj) => obj.materialID == newItem.materialID
      );

      if (objIndex != -1) {
        //Verificar que el producto tenga la propiedad cantidad
        if (material.hasOwnProperty('cantidad')) {
          //Si la cantidad es menor o igual a 0 se elimina del carrito
          if (material.cantidad <= 0) {
            this.removeFromCart(newItem);
            return;
          } else {
            //Actualizar cantidad
            listExchange[objIndex].amount = material.amount;
          }
        } else {
          //Actualizar la cantidad de un producto existente
          listExchange[objIndex].amount += 1;
        }
      } else {
        listExchange.push(newItem);
      }
    } else {
      listExchange = [];
      listExchange.push(newItem);
    }
    this.dataExchange.next(listExchange);
    this.qtyItems.next(this.quantityItems());
    this.saveExchange();
  }

  public removeFromCart(materialID: any) {
    //Obtenemos el valor actual de carrito
    let listExchange = this.dataExchange.getValue();
    //Buscamos el item del carrito para eliminar
    let objIndex = listExchange.findIndex(
      (obj) => obj.materialID == materialID
    );
    if (objIndex != -1) {
      listExchange.splice(objIndex, 1);
    }
    this.dataExchange.next(listExchange);
    //Actualizar la cantidad total de items del carrito
    this.qtyItems.next(this.quantityItems());
    this.saveExchange();
  }

  get countItems(): Observable<number> {
    this.qtyItems.next(this.quantityItems());
    return this.qtyItems.asObservable();
  }

  quantityItems() {
    let listCart = this.dataExchange.getValue();
    let sum = 0;
    if (listCart != null) {
      //Sumando las cantidades de cada uno de los items del carrito
      listCart.forEach((obj) => {
        sum += obj.amount;
      });
    }
    return sum;
  }

  public deleteExchange() {
    this.dataExchange.next([]);
    this.qtyItems.next(0);
    this.saveExchange();
  }

  public getTotal(): number {
    //Total antes de impuestos
    let total = 0;
    let listCart = this.dataExchange.getValue();
    if (listCart != null) {
      //Sumando los subtotales de cada uno de los items del carrito

      listCart.forEach((item: ItemExchange, index) => {
        total += item.subtotal;
      });
    }

    return total;
  }

  private calculoSubtotal(item: ItemExchange) {
    return item.price * item.amount;
  }
}
