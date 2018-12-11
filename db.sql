create table if not exists easy
(
	id serial not null
		constraint easy_pk
			primary key,
	url text
);

create table if not exists medium
(
	id serial not null
		constraint medium_pk
			primary key,
	url text
);


create table if not exists hard
(
	id serial not null
		constraint hard_pk
			primary key,
	url integer
);


create table if not exists highscore
(
	id serial not null
		constraint highscore_pk
			primary key,
	nickname text,
	score integer
);

create unique index if not exists highscore_nickname_uindex
	on highscore (nickname);

