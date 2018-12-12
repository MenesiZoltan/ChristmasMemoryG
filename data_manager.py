from connection import connection_handler
from psycopg2 import sql
from random import shuffle


def randomized_pairs(cards):
    cards += cards
    shuffle(cards)



@connection_handler
def get_cards(cursor,table, difficulty, card_number):
    query = sql.SQL(''' SELECT * FROM {}
                        ORDER BY random()
                        LIMIT %(card_number)s
                        ''').format(sql.Identifier(table))

    params = {"difficulty": difficulty, "card_number": card_number}
    cursor.execute(query, params)
    return cursor.fetchall()

