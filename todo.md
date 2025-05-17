# Pendientes

- Mejorar index.hbs
- Hacer login github
- Tratar los errores
- Habria que revisar que cualquier error se interprete bien en la interfaz
- Mirar GroupCards y el paginator (separar la lógica) -> GroupDetallesCards también
- Los filtros no deberian de haber un filtro para cada "propiedad", sino un filtro general para los strings (de esto ya me encargare yo)
- Como tratar buscarEventosDisponibles(plazas, fechaInicio, fechaFin) en EventoModal

# Ideas Futuras

- El propietario de un espacio, pueda ver listado de eventos creados en EspacioDet (similar a las reservas en EventoDet)
  (Considerarlo, si obtener todos y filtrar en front o
  crear endpoint que filtre por el id de un espacio)

# Bugs

- En Espacios y Eventos, al filtrar de nuevo, debe cambiar el paginator a la page 1
- Cuando se usan los filtros, el paginator deberia de resetearse a la page 1
