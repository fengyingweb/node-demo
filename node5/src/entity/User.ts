const {Entity, Column, PrimaryGeneratedColumn} = require('typeorm');

@Entity()
class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 32
    })
    userName: string;

    @Column({
        length: 32
    })
    password: string;

    @Column({
        length: 32
    })
    email: string;
}

module.exports = User;