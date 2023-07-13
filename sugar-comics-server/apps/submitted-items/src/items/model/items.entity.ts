import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { SubmittedReward } from '../../rewards/model/rewards.entity';
import { SubmittedCover } from '../../covers/model/covers.entity';

@Entity()
export class SubmittedItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    author: string;

    @Column()
    description: string;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    creationDate: Date;

    @Column({ type: 'int' })
    estimated: number;

    @Column({ nullable: true })
    video: string;

    @Column({ nullable: true })
    story: string;

    @Column({
        type: 'int',
        name: 'coverId',
        unique: true
    })
    coverId: number;

    @OneToOne(() => SubmittedCover)
    @JoinColumn({ name: 'coverId' })
    cover: SubmittedCover;

    @OneToMany(() => SubmittedReward, (rewards) => rewards.item)
    public rewards: SubmittedReward[];
}
