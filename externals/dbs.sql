create table users (
    id int primary key auto_increment not null,
    fbid int not null,
    joined timestamp default CURRENT_TIMESTAMP,
    username varchar(20) not null,
    email varchar(255),
    online bool default false
);

create table games (
    id int primary key auto_increment not null,
    started timestamp default CURRENT_TIMESTAMP,
    finished timestamp,
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
