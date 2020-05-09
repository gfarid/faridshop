import { ShoppingCartItem } from './shopping-cart-items';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: {[productId: string]: ShoppingCartItem }) {
        this.itemsMap = itemsMap || {} ;
        for (const produtId in itemsMap) {
            if (itemsMap.hasOwnProperty(produtId)) {
                const item = itemsMap[produtId];
                this.items.push(new ShoppingCartItem(item.product, item.quantity));
            }
        }
    }

    get totalItemsCount() {
        let count = 0;
        for ( const item of this.items) {
             count += item.quantity ;
        }
        return count;
    }

    get totalPrice() {
        let sum = 0;
        for (const item of this.items) {
            sum += item.totalPrice;
        }
        return sum;
    }

    getCartQuantity(product) {
        console.log(product);
        const item = this.itemsMap[product.key];
        return item ? item.quantity : 0 ;
      }
}
