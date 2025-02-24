# main.py

from fastapi import FastAPI, Query
from supabase import create_client, Client
import os
from dotenv import load_dotenv

# Carga las variables de entorno desde el archivo.env
load_dotenv()

# Crea una instancia de la aplicación FastAPI
app = FastAPI()

# Configuración de Supabase
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

# Crea un cliente Supabase
try:
    supabase: Client = create_client(url, key)
except Exception as e:
    print(f"Error al conectar a Supabase: {e}")

@app.get("/buscar")
async def buscar(query: str = Query(...)):
    """
    Busca libros en Supabase por título o autor.

    Args:
        query (str): Término de búsqueda.

    Returns:
        list: Lista de libros que coinciden con la búsqueda.
    """
    try:
        # Busca por título
        response = supabase.table('libros').select('*').ilike('titulo', f'%{query}%').execute()
        if not response.data:
            # Si no hay resultados por título, busca por autor
            response = supabase.table('libros').select('*').ilike('autor', f'%{query}%').execute()
        return response.data
    except Exception as e:
        print(f"Error en la búsqueda: {e}")
        return {"error": "Error en la búsqueda"}

@app.get("/libro/{id_libro}")
async def obtener_libro(id_libro: int):
    """
    Obtiene un libro específico por su ID.

    Args:
        id_libro (int): ID del libro.

    Returns:
        dict: Libro que coincide con el ID.
    """
    try:
        response = supabase.table('libros').select('*').eq('id', id_libro).execute()
        return response.data
    except Exception as e:
        print(f"Error al obtener el libro: {e}")
        return {"error": "Error al obtener el libro"}