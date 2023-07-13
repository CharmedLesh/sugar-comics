import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { SubmittedItem } from '../../items/model/items.entity';

@Entity()
export class SubmittedCover {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image: string;

    @OneToOne(() => SubmittedItem, (item) => item.cover)
    public item: SubmittedItem;
}
