import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SubmittedItem } from '../../items/model/items.entity';

@Entity()
export class SubmittedReward {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'int' })
    price: number;

    @Column()
    limited: boolean;

    @Column({ type: 'int', nullable: true })
    limit: number;

    @Column()
    description: string;

    @Column({
        type: 'int',
        name: 'itemId'
    })
    itemId: number;

    @ManyToOne(() => SubmittedItem)
    @JoinColumn({ name: 'itemId' })
    item: SubmittedItem;
}
