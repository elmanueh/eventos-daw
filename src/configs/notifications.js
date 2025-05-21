export const TOAST_MESSAGES = {
  AUTH: {
    LOGIN_ERROR: {
      title: 'Autenticación fallida',
      message:
        'El nombre de usuario o la contraseña no son correctos. Por favor, verifique sus credenciales e inténtelo nuevamente.',
      type: 'danger'
    }
  },

  SPACE: {
    CREATED: {
      title: 'Espacio creado con éxito',
      message:
        'El nuevo espacio ha sido registrado correctamente en el sistema.',
      type: 'success'
    },
    CREATED_ERROR: {
      title: 'Error al crear el espacio',
      message:
        'No se pudo registrar el nuevo espacio. Por favor, inténtelo de nuevo más tarde.',
      type: 'danger'
    },
    UPDATED: {
      title: 'Espacio actualizado',
      message:
        'La información del espacio ha sido modificada satisfactoriamente.',
      type: 'success'
    },
    UPDATED_ERROR: {
      title: 'Error al actualizar el espacio',
      message:
        'No se pudo actualizar la información del espacio. Por favor, inténtelo de nuevo más tarde.',
      type: 'danger'
    },
    STATUS_UPDATED: {
      title: 'Estado del espacio actualizado',
      message: 'El estado del espacio ha cambiado correctamente.',
      type: 'success'
    },
    STATUS_UPDATED_ERROR: {
      title: 'Error al cambiar el estado',
      message:
        'No fue posible modificar el estado del espacio. Inténtelo nuevamente más tarde.',
      type: 'danger'
    }
  },

  EVENT: {
    CREATED: {
      title: 'Evento registrado',
      message:
        'El evento ha sido creado correctamente y está disponible para los usuarios.',
      type: 'success'
    },
    CREATED_ERROR: {
      title: 'Error al registrar el evento',
      message:
        'Hubo un problema al crear el evento. Por favor, inténtelo de nuevo más tarde.',
      type: 'danger'
    },
    UPDATED: {
      title: 'Evento actualizado',
      message: 'Los detalles del evento se han modificado exitosamente.',
      type: 'success'
    },
    UPDATED_ERROR: {
      title: 'Error al actualizar el evento',
      message:
        'No se pudo actualizar la información del evento. Inténtelo de nuevo más tarde.',
      type: 'danger'
    },
    STATUS_UPDATED: {
      title: 'Estado del evento actualizado',
      message: 'El estado del evento ha sido modificado correctamente.',
      type: 'success'
    },
    STATUS_ERROR: {
      title: 'Error al cambiar el estado',
      message:
        'No fue posible cambiar el estado del evento. Por favor, inténtelo de nuevo.',
      type: 'danger'
    }
  },

  RESERVE: {
    CREATED: {
      title: 'Reserva confirmada',
      message:
        'Su reserva se ha realizado con éxito y está registrada en el sistema.',
      type: 'success'
    },
    CREATED_ERROR: {
      title: 'Error al crear la reserva',
      message:
        'No se pudo completar la reserva. Por favor, intente nuevamente más tarde.',
      type: 'danger'
    }
  }
}
