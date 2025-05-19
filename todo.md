# Pendientes

- Mejorar index.hbs
- Tratar los errores y revisar que cualquier error se interprete bien en la interfaz
- Mirar GroupCards y el paginator (separar la lógica) -> GroupDetallesCards también
- Los filtros no deberian de haber un filtro para cada "propiedad", sino un filtro general para los strings (de esto ya me encargare yo)
- Como tratar buscarEventosDisponibles(plazas, fechaInicio, fechaFin) en EventoModal

- Al crear un evento obligar a que sea a partir de HOY

- CHEKEAR QUE NO HAYA EVENTOS CON MAS PLAZAS QUE EL ESPACIO EN LA BASE DE DATOS

# Bugs

- En Espacios y Eventos, al filtrar de nuevo, debe cambiar el paginator a la page 1
- Cuando se usan los filtros, el paginator deberia de resetearse a la page 1

- Al hacer una acción, mostrar cargando, para no permitir hacer la acción de nuevo
- Cuando se actualize algo, que solamente se haga de los campos que se han cambiado

- Al cancelar evento desde EventoCard no se muestra el toast

# Segurencia

- En AuthProvider al hacer login creo que el setUser es innecesario

# Mirar de hook

- ESPACIOS_REDUCER.FIRST y EVENTOS_REDUCER.FIRST no se utiliza para nada
