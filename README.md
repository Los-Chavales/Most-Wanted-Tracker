# Most Wanted Tracker
Proyecto de Frontend I

La aplicación es un buscador dirigido a criminales profugos de la ley, al igual que a personas desaparecidas a nivel internacional; la cual consume la api rest pública de la Interpol, al buscar por nombre devuelve la consulta que coincide con los parámetros a buscar, mostrando los siguientes datos de los usuarios:

* Foto del de la persona reportada o desaparecida.
* Su nombre de ficha en la Interpol siendo el apellido mayormente. 
* Su nombre. 
* La fecha de nacimiento.
* Nacionalidad.

Además cuenta con las opciones de: 

* Buscar a las personas reportadas o desaparecidas por su nacionalidad . 
* Ver los detalles de cada persona mediante una ventana modal.
* Reportar avistamientos dirigido a ambos casos.
* Mostrar los reportes realizados.
* Interfaz responsive.


## Instrucciones

Para instalar y probar este proyecto, tenga en cuenta lo siguiente:

### Requisitos

*	Un navegador web
*	Node.js con npm
*	Conexión a internet (para acceder al servido de la API REST)
* Archivos .env con los secretos para conectarse a la API dentro de las carpetas client y server:

  La estrutura del .env dirigido a la carpeta client es la siguiente:
VITE_URL_API=https://ws-public.interpol.int/notices/v1/
VITE_URL_API_TRANSLATOR=https://text-translator2.p.rapidapi.com/translate
VITE_KEY_API_TRANSLATOR=8aae49512emshb75fc9a2777a16cp10db8bjsn63450422966e
VITE_HOST_API_TRANSLATOR=text-translator2.p.rapidapi.com
VITE_URL_SERVER=http://localhost:4000/

    La estrutura del .env dirigido a la carpeta server es la siguiente:
DB_URI=mongodb+srv://tracker_db:TxfVjSEXp8A8mhya@mwtracker.fwmni9a.mongodb.net/mwtracker_db?retryWrites=true&w=majority&appName=mwtracker
TOKEN_SECRET=yoursecret

### Descargue los archivos .env aquí:

[Descargar variables de entorno](https://drive.google.com/drive/folders/1VEsdi18C-eRn7UCalz8JZrGe8VnZA3hI)

### Instalación

Una vez descargada y descomprimida la carpeta del repositorio, o tenerlo clonado, abra una terminal en la ruta de dicha carpeta, abra su editor de codigo de preferencia y ejecute los siguientes comando para instalar las dependencias necesarias para su funcionamiento:

1. Abrir dos terminales y siguiente a eso ejecutar los siguientes comandos en cada terminal:

```
cd client
```
```
cd server
```
2. Ejecute el siguiente comando para instalar las dependencias necesarias para frontend y backend de nuestro programa

```
npm install
```

3. Ejecutar la página en ambas terminales como desarrollo con:

```
npm run dev
```

4. Ir a la ruta con el puerto asignado para ver la página, esta ruta se puede ver por consola


## Construido con:

* [Figma](https://www.figma.com/file/hnGNc3peh2HlhEIAlEiFEW/Proyecto-Final?type=design&node-id=0%3A1&mode=design&t=DA4KiR9hPnfWuSLG-1) - Para el prototipado web
* [Node.js](https://nodejs.org/en) - Dependencias
* [API REST Interpol](https://interpol.api.bund.dev/) - Api de Interpol para buscar personas desaparecidas y prófugos.
* [Vite y React](https://vitejs.dev/) - Usado para crear componentes y empaquetar


## Instrucciones adicionales:

* [Manuales de uso](https://drive.google.com/drive/folders/1aeiQ0ILpyWXOAJgG9p_YWaIZZP8IFJU0?usp=sharing)

## Autores

* **José Simón García Castellanos** - *(C.I: 30.786.086)* - [DarthNeo03](https://github.com/DarthNeo03)
* **Moisés Alfonso Terán Rivas** - *(C.I: 30.601.063)* - [teranMoises](https://github.com/teranMoises)
* **Paola Valentina Marcano Salas** - *(C.I: 30.975.611)* - [PaolaMarcano](https://github.com/PaolaMarcano)
* **Crisangelly Del Valle Hernández Fernández** - *(C.I: 30.954.251)* - [Crisangelly](https://github.com/Crisangelly)

## Desarrollado para:

Universidad Valle del Momboy

Prof. Ing. Freddy Ramírez

## Aclaratoria:
Este proyecto fue realizado netamente con fines educativos para fomentar nuestra educación y aprendizaje en el área de programación dirigida a la asignatura Frontend I

## Interpol: 
La Organización Internacional de Policía Criminal es la mayor organización de policía internacional que une a las fuerzas de seguridad de 196 países de todo el mundo. La cual posee <b>alertas rojas y amarilas</b> que son aquellas notificaciones que permiten avisar a los servicios policiales a nivel internacional sobre un caso de desaparición o escape de personas peligrosas prófugas de la ley.
