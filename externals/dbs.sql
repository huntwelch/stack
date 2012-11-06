create table users (
    id int primary key auto_increment not null,
    fbid int not null,
    joined datetime,
    username varchar(20) not null,
    online bool default false
);

create table games (
    id int primary key auto_increment not null,
    started datetime,
    finished datetime,
    handicap float not null,
    bid int not null,
    wid int not null,
    btime int default 0,
    wtime int default 0,
    history text,
    lastmove varchar(7),
    done bool default false,
    winner int
);
