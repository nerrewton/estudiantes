drop table notas;
drop table estudiantes;
drop table cursos;

create database estudiantes_db;
use estudiantes_db;

create table estudiantes(
	id integer(10) unsigned not null auto_increment primary key,
    nombre varchar(100) not null,
    edad integer(2) unsigned,
    fecha_crea datetime,
    fecha_modifica datetime default current_timestamp
);

create table cursos(
	id integer(10) unsigned not null auto_increment primary key,
    nombre varchar(200) not null,
    fecha_crea datetime,
    fecha_modifica datetime default current_timestamp
);

create table notas(
	id integer(10) unsigned not null auto_increment primary key,
	id_estudiante integer(10) unsigned not null,
	id_curso integer(10) unsigned not null,
	nombre_evaluacion varchar(200) not null,
	calificacion float(6,3) not null,
	fecha_crea datetime,
    fecha_modifica datetime default current_timestamp
);

alter table notas add constraint fk_estudiantes foreign key(id_estudiante) references estudiantes(id);
alter table notas add constraint fk_cursos foreign key(id_curso) references cursos(id);