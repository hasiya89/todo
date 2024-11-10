drop table if exists task;

create table test_todo (
    id serial primary key,
    description varchar(255) not null
);

insert into task (description) values ('My test task');
insert into task (description) values ('My another test task');