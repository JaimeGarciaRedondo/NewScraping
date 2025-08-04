import requests
from bs4 import BeautifulSoup
import sqlite3


url = "https://www.marca.com"

def scrapNews():
    response = requests.get(url)

    # 2. Comprobar que la petición fue exitosa
    if response.status_code == 200:
        # 3. Parsear el contenido HTML con BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')

        # 4. Encontrar los elementos que queremos extraer
        # En este caso, los textos de las citas
        links = soup.find_all('a', class_='ue-c-cover-content__link')

        conn = sqlite3.connect("database/noticias.db")
        cursor = conn.cursor()

        for a in links:
            href = a.get('href')  # obtener la URL del enlace
            # Dentro del <a> hay un <h2> con el título, lo buscamos y extraemos texto
            h2 = a.find('h2', class_='ue-c-cover-content__headline')
            title = h2.get_text(strip=True) if h2 else 'No title'

            ##cursor.execute('INSERT INTO noticias(titulo, resumen, url,'
                    #       ' imagen, fecha, fuente, categoria)'
                     #      ' VALUES (?,?,?,?,?,?,?)',
                      #     h2, , href)

            print(f"Título: {title}")
            print(f"Enlace: {href}")
            print('---')

    else:
        print(f"Error al obtener la página: {response.status_code}")

if __name__=="__main__":
    scrapNews()