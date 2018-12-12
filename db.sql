create table if not exists pictures
(
	id serial not null
		constraint easy_pk
			primary key,
	url text,
	difficulty text
)
;


;

create table if not exists highscore
(
	id serial not null
		constraint highscore_pk
			primary key,
	nickname text,
	score integer
)
;


;

create unique index if not exists highscore_nickname_uindex
	on highscore (nickname)
;

