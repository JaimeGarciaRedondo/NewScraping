from apscheduler.schedulers.blocking import BlockingScheduler
from scrapping.as_scrap import scrapAs
from scrapping.marca_scrap import scrapMarca
from database.consultas import borrar, consulta

scheduler = BlockingScheduler()

def scrapAll():
    borrar()
    scrapMarca()
    scrapAs()
    consulta()


scheduler.add_job(scrapAll, 'interval', minutes=5)

if __name__ == "__main__":
    print("Iniciando scheduler...")
    scheduler.start()

