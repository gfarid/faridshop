import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {
  orders$;
  constructor(
    private authService: AuthService,
    private orderService: OrderService) {

    this.orders$ = this.authService.user$.pipe(switchMap(u => this.orderService.getOrdersByUser(u.uid)));
  }

  ngOnInit(): void {
  }

}
