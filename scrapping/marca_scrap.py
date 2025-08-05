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
        links = soup.find_all('div', class_='ue-c-cover-content__body')

        conn = sqlite3.connect("database/noticias.db")
        cursor = conn.cursor()

        for l in links:
            media = l.find('div', class_='ue-c-cover-content__media')

            try:
                img = media.find('picture').find('img')['src'] if media else None
            except AttributeError:
                img = None

            main = l.find('div', class_='ue-c-cover-content__main')
            a = main.find('a', class_='ue-c-cover-content__link')

            href = a.get('href')  # obtener la URL del enlace
            # Dentro del <a> hay un <h2> con el título, lo buscamos y extraemos texto
            h2 = a.find('h2', class_='ue-c-cover-content__headline')
            title = h2.get_text(strip=True) if h2 else 'No title'

            cursor.execute(
                'INSERT OR IGNORE INTO noticias (titulo, url, imagen, fuente, categoria) VALUES (?, ?, ?, ?, ?)',
                (title, href, img, 'Marca', 'sports')
            )

        conn.commit()
        conn.close()

    else:
        print(f"Error al obtener la página: {response.status_code}")

if __name__=="__main__":
    scrapNews()