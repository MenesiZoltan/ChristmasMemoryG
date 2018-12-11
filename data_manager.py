from connection import connection_handler
from psycopg2 import sql

@connection_handler
def get_cards(cursor,table):
    query = sql.SQL(""" SELECT * FROM {}""").format(sql.Identifier(table))
    cursor.execute(query)
    return cursor.fetchall()
