import requests
from bs4 import BeautifulSoup
import sqlite3


url = "https://as.com"

def scrapAs():
    response = requests.get(url)

    # 2. Comprobar que la petición fue exitosa
    if response.status_code == 200:
        # 3. Parsear el contenido HTML con BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')

        # 4. Encontrar los elementos que queremos extraer
        # En este caso, los textos de las citas
        links = soup.find_all('article', class_='s s--v')

        conn = sqlite3.connect("database/noticias.db")
        cursor = conn.cursor()

        for l in links:
            media = l.find('figure', class_='mm s__mm')
            try:
                img = media.find('a').find('img')['src'] if media else None
            except AttributeError:
                img = None

            main = l.find('div', class_='s__tl-wr is-ctrd') \
                   or l.find('div', class_='s__tl-wr')

            h2 = main.find('h2', class_='s__tl')
            title = h2.find('a').get_text(strip=True) if h2 else 'No title'

            href = h2.find('a')['href']

            cursor.execute(
                'INSERT OR IGNORE INTO noticias (titulo, url, imagen, fuente, categoria) VALUES (?, ?, ?, ?, ?)',
                (title, href, img, 'As', 'sports')
            )

        conn.commit()
        conn.close()

    else:
        print(f"Error al obtener la página: {response.status_code}")

if __name__=="__main__":
    scrapAs()