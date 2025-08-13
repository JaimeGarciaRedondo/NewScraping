# main.py
from fastapi import FastAPI
from apscheduler.schedulers.background import BackgroundScheduler
import sqlite3
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

# === Tus imports de scraping ===
from scrapping.as_scrap import scrapAs
from scrapping.marca_scrap import scrapMarca
from database.consultas import borrar, consulta

# ==== Configuración API ====
app = FastAPI(title="API de Noticias")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite cualquier origen (en producción restringe)
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos HTTP
    allow_headers=["*"],  # Permite todos los encabezados
)

def obtener_noticias():
    conn = sqlite3.connect("database/noticias.db")
    cursor = conn.cursor()
    cursor.execute("SELECT id, titulo, url, imagen, fuente, categoria FROM noticias")
    datos = cursor.fetchall()
    conn.close()

    return [
        {
            "id": id_,
            "titulo": titulo,
            "url": url,
            "imagen": imagen,
            "fuente": fuente,
            "categoria": categoria
        }
        for id_, titulo, url, imagen, fuente, categoria in datos
    ]


@app.get("/noticias")
def listar_noticias():
    return obtener_noticias()

@app.get("/noticias/{fuente}")
def listar_noticias_por_fuente(fuente: str):
    return [n for n in obtener_noticias() if n["fuente"].lower() == fuente.lower()]

# ==== Scheduler y Scraping ====
scheduler = BackgroundScheduler()

def scrapAll():
    print("⏳ Iniciando scraping...")
    borrar()
    scrapMarca()
    scrapAs()
    #consulta()
    print("✅ Scraping finalizado")

scheduler.add_job(scrapAll, 'interval', minutes=5)

# ==== Ejecución ====
if __name__ == "__main__":
    # Arrancar scraping automático
    scheduler.start()
    scrapAll()  # primer scrapeo al arrancar

    # Arrancar API (bloqueante)
    uvicorn.run(app, host="0.0.0.0", port=8000)
