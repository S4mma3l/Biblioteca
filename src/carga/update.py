from supabase import create_client, Client
import os
from dotenv import load_dotenv

# Carga las variables de entorno
load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

# Datos del libro
data = {
    "titulo": "El señor de los anillos",
    "autor": "J.R.R. Tolkien",
    "descripcion": "Una novela épica de fantasía.",
    "url_archivo": "https://example.com/el-senor-de-los-anillos.pdf"
}

# Inserta el libro en la tabla
try:
    response = supabase.table('libros').insert(data).execute()
    print("Libro insertado correctamente:", response.data)
except Exception as e:
    print("Error al insertar el libro:", e)