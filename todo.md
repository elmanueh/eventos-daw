# Pendientes

- Mejorar index.hbs
- Tratar los errores y revisar que cualquier error se interprete bien en la interfaz
- Mirar GroupCards y el paginator (separar la lógica) -> GroupDetallesCards también
- Los filtros no deberian de haber un filtro para cada "propiedad", sino un filtro general para los strings (de esto ya me encargare yo)
- Como tratar buscarEventosDisponibles(plazas, fechaInicio, fechaFin) en EventoModal

- EventoDetalle -> mirar para no obtener todos los espacios, cargar el espacio junto al evento o algo, con alguna variable

- EventosDetalles se recagar 2 veces los randoms

# Bugs

- En Espacios y Eventos, al filtrar de nuevo, debe cambiar el paginator a la page 1
- Cuando se usan los filtros, el paginator deberia de resetearse a la page 1

- EventoCards, en_curso sale mal

# Segurencia

- En AuthProvider al hacer login creo que el setUser es innecesario

# Cambiar de hook

- Eventos no necesito los detalles de eventos
- Mis Eventos no necesita los detalles de eventos

-
