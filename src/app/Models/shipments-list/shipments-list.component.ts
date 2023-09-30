import { Component, OnInit } from '@angular/core';
import { ShipmentService, ShipmentStatus } from '../../Services/shipment.service'; // Import the enum
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipments-list',
  templateUrl: './shipments-list.component.html',
  styleUrls: ['./shipments-list.component.scss']
})
export class ShipmentsListComponent implements OnInit{
  shipmentPending: any[] = [];
  shipmentShipping: any[] = [];
  shipmentShipped: any[] = [];
  shipmentCancelled: any[] = [];

  constructor(private shipmentService: ShipmentService, private router: Router){}

  changeStatus(id: number, status: number){

      this.shipmentService.changeShipment(id , status)
      .subscribe((x) => {
        console.log(x)
      })

      
      
  }



  pendingShipment(){
    
  }

  ngOnInit(): void {
    this.shipmentService
      .getShipments(ShipmentStatus.Pending)
      .subscribe((data) => {
        this.shipmentPending = data;
        console.log(this.shipmentPending); 
      });
      

      this.shipmentService
      .getShipments(ShipmentStatus.Shipping)
      .subscribe((data) => {
        this.shipmentShipping = data;
        console.log(this.shipmentShipping); 
      });
      

      this.shipmentService
      .getShipments(ShipmentStatus.Shipped)
      .subscribe((data) => {
        this.shipmentShipped = data;
        console.log(this.shipmentShipped); 
      });
      
      this.shipmentService
      .getShipments(ShipmentStatus.Cancelled)
      .subscribe((data) => {
        this.shipmentCancelled = data;
        console.log(this.shipmentCancelled); 
      });

  }


}
