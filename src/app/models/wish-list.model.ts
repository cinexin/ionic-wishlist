import {ItemList} from './item-list.model';

export class WishList {
    id: number;
    title: string;
    createdAt: Date;
    completedAt: Date;
    completed: boolean;
    items: ItemList[];

    constructor(title: string) {
        this.title = title;
        this.createdAt = new Date();
        this.completed = false;
        this.items = [];
        this.id = new Date().getTime();
    }
}

