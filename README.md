<h1 align="center"> NewScraping </h1>
<p align="center">
  <img align="center" width="128" height="128" alt="NewScraping Icon" src="https://github.com/user-attachments/assets/cae2a255-3551-4000-8d0f-72828e54b093" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Finished-green">
  <img src="https://img.shields.io/badge/License-MIT-red">
</p>

## Introduction
Website that gathers sports and current news from major Spanish newspapers using web scraping.

## Installation

First, clone the repository and run the back-end.

```bash
git clone https://github.com/JaimeGarciaRedondo/NewScraping.git
cd NewScraping/backend
```

Then, create a venv and install the `requirements.txt`.

```bash
python -m venv venv
source venv/bin/activate   # on Linux/Mac
venv\Scripts\activate      # on Windows
pip install -r requirements.txt
```

And start the API.

```bash
python api.py
```

Now, let's start the front-end and install its npm dependencies.

```bash
cd ../frontend
npm install
```

Create a `.env` file and start the front-end.
```bash
echo "VITE_API_URL=http://localhost:8000" > .env
npm run dev
```

## Technologies Used
- Python
- JavaScript
- CSS
- HTML

## Contributors
[![Jaime Garcia](https://github.com/JaimeGarciaRedondo.png?size=10)](https://github.com/JaimeGarciaRedondo)

## License
NewScraping is [MIT Licensed](LICENSE).
