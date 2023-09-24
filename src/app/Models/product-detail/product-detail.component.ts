import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailService } from 'src/app/Services/product-detail.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

    product: any;
    imageBase64: string | undefined;

    constructor(
      private route: ActivatedRoute,
      private productDetailService: ProductDetailService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
          const productId = +params['id'];
          this.productDetailService.getProduct(productId).subscribe((data) => {
            this.product = data;
          });
        });
    }

}
