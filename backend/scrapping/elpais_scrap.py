import os
import requests
from bs4 import BeautifulSoup
import sqlite3

url = "https://elpais.com"

def scrapPais():
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        # Buscar todos los contenedores de noticia
        links = soup.find_all('article', class_='c')

        # Ruta absoluta segura a la base de datos
        conn = sqlite3.connect(os.path.abspath("database/noticias.db"))
        cursor = conn.cursor()

        for l in links:
            h2 = l.find("h2", class_="c_t")
            if not h2:
                continue

            a = h2.find("a")
            if not a:
                continue

            title = a.get_text(strip=True)
            href = a.get("href")

            # Buscar la imagen si existe
            media = l.find('figure', class_='c_m')
            img = None
            if media:
                img_tag = media.find("img")
                if img_tag and img_tag.get("src"):
                    img = img_tag["src"]

            # Guardar en la base de datos
            cursor.execute(
                'INSERT OR IGNORE INTO noticias (titulo, url, imagen, fuente, categoria) VALUES (?, ?, ?, ?, ?)',
                (title, href, img, 'El País', 'Actualidad')
            )

            #print(f"Título: {title}")
            #print(f"Enlace: {href}")
            #print(f"Img: {img}")
            #print('---')

        conn.commit()
        conn.close()
    else:
        print(f"Error al obtener la página: {response.status_code}")

if __name__ == "__main__":
    scrapPais()
