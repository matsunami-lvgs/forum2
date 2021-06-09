delete from posts where id 0;
select setval ('posts_id_seq', 1, false);
