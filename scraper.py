import requests
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime

def scrape_hacker_news():
    url = "https://news.ycombinator.com/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    titles = soup.select(".storylink")
    results = []

    for title in titles:
        results.append({
            "fecha": datetime.now().strftime("%Y-%m-%d %H:%M"),
            "titulo": title.get_text(),
            "link": title["href"]
        })

    df = pd.DataFrame(results)
    df.to_csv("data/noticias.csv", index=False)
    print(f"{len(df)} noticias guardadas.")
