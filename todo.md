# Pendientes

- Mejorar index.hbs
- Tratar los errores y revisar que cualquier error se interprete bien en la interfaz

- Como tratar buscarEventosDisponibles(plazas, fechaInicio, fechaFin) en EventoModal

- CHEKEAR QUE NO HAYA EVENTOS CON MAS PLAZAS QUE EL ESPACIO EN LA BASE DE DATOS

- Tratar errores en los Modal

- Filtros añadir cosas como en eventos filtrar por cosas de espacio

# Bugs

- En Espacios y Eventos, al filtrar de nuevo, debe cambiar el paginator a la page 1
- Cuando se usan los filtros, el paginator deberia de resetearse a la page 1

- Al cancelar evento desde EventoCard no se muestra el toast
- Al reservar un evento no se muestra toast

- Al mostrar MisEvento y MisEspacios la primera vez se muestran los cancelados

# Segurencia

- En AuthProvider al hacer login creo que el setUser es innecesario
