CREATE TABLE IF NOT EXISTS users
(
    id         int          not null
        primary key,
    age        int          not null,
    name       varchar(255) null,
    office     varchar(255) null,
    position   varchar(255) null,
    salary     varchar(255) null,
    start_date varchar(255) null
)
    engine = MyISAM;
