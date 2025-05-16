# Pendientes

- Mejorar index.hbs
- Hacer login github
- Tratar los errores
- Mirar GroupCards y el paginator (separar la lógica)
- Crear alguna animación cuando se ha realizado una transacción o ha fallado (haciendose)
- Los filtros no deberian de haber un filtro para cada "propiedad", sino un filtro general para los strings (de esto ya me encargare yo)
- Habria que revisar que cualquier error se interprete bien en la interfaz

# Ideas Futuras

- El propietario de un espacio, pueda ver listado de eventos creados en EspacioDet (similar a las reservas en EventoDet)
  (Considerarlo, si obtener todos y filtrar en front o
  crear endpoint que filtre por el id de un espacio)

# Bugs

- En Espacios y Eventos, al filtrar de nuevo, debe cambiar el paginator a la page 1
- ReservaModal: cuando intentas reservar mas de lo permitido, la interfaz no avisa

# Cosas Julian

- Al editar un evento desde EventoCard, no aparece evento en el modal. Y debería aparecer el número de plazas disponibles futuras, cuando se modifican las plazas.

- tratar valores máximos de un int, y ponerselo como max en spiners

- carpeta utils organizarla mejor en subcarpetas
