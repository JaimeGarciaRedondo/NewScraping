import sqlite3

def crear_db():
    conn = sqlite3.connect("database/noticias.db")
    cursor = conn.cursor()

    cursor.execute('''
            CREATE TABLE IF NOT EXISTS noticias (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                titulo TEXT,
                url TEXT UNIQUE,
                imagen TEXT,
                fuente TEXT,
                categoria TEXT
            )
        ''')

    conn.commit()
    conn.close()
    print("Base de datos creada/conectada con éxito\n")


if __name__ == "__main__":
    crear_db()