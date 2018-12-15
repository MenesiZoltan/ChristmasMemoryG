from connection import connection_handler
from psycopg2 import sql
from random import shuffle


def randomized_pairs(cards):
    cards += cards
    shuffle(cards)



@connection_handler
def get_cards(cursor, difficulty):
    query =''' SELECT * FROM pics
                ORDER BY random()
                LIMIT %(difficulty)s'''
    params = {"difficulty": difficulty}
    cursor.execute(query, params)
    return cursor.fetchall()



@connection_handler
def update_highscore(cursor,nickname,score):
    query = """ UPDATE highscore    
                SET score=score+%(score)s
                WHERE nickname=%(nickname)s """
    params = {"nickname":nickname, "score":score}
    cursor.execute(query,params)



@connection_handler
def new_highscore(cursor,nickname,score):
    query = """ INSERT INTO highscore (nickname, score)
                VALUES (%(nickname)s, %(score)s) """
    params = {"nickname": nickname, "score": score}
    cursor.execute(query,params)



@connection_handler
def get_highscores(cursor):
    query = """ SELECT * FROM highscore
                ORDER BY score DESC     """
    cursor.execute(query)
    return cursor.fetchall()



@connection_handler
def add_image_to_db(cursor, filename):
    query = """ INSERT INTO pics (filename)
                VALUES (%(filename)s)   """
    params = {"filename":filename}
    cursor.execute(query,params)



@connection_handler
def get_images_from_db(cursor):
    query = """ SELECT * FROM pics"""
    cursor.execute(query)
    return cursor.fetchall()


@connection_handler
def remove_image_from_db(cursor, filename):
    query = """ DELETE FROM pics
                WHERE filename=%(filename)s"""
    params = {'filename':filename}
    cursor.execute(query,params)