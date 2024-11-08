import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Price {
    @PrimaryGeneratedColumn()
    id: string;

    @Column("decimal", { precision: 10, scale: 2 })
    Turkey: number;  // Defines a decimal type for Turkish currency (e.g., TRY)

    @Column("decimal", { precision: 10, scale: 2 })
    China: number;  // Defines a decimal type for Chinese currency (e.g., CNY)
}
