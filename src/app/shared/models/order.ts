import { ShoppingCart } from './shopping-cart';
import { ShoppingCartItem } from './shopping-cart-items';

export class Order {
    datePlaced: number;
    items: any[];

    constructor(public userId: string,
                public shipping: any,
                shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();
        this.items = shoppingCart.items.map( (item: ShoppingCartItem) => {
            return {
                product: {
                title: item.product.title,
                imageUrl: item.product.imageUrl,
                price: item.product.price
                },
                quantity: item.quantity,
                totalPrice: item.totalPrice
            };
        });
    }
}
