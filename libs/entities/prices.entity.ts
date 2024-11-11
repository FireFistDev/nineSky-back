import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Price {
    @PrimaryColumn()
    id: string;

    @Column("decimal", { precision: 10, scale: 2 })
    Turkey: number;  // Defines a decimal type for Turkish currency (e.g., TRY)

    @Column("decimal", { precision: 10, scale: 2 })
    China: number;  // Defines a decimal type for Chinese currency (e.g., CNY)
}
