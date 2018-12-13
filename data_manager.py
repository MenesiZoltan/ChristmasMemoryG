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

