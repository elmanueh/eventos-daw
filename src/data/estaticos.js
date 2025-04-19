/*export const espaciosEstaticos = [

];

export const eventosEstaticos = [

];

export const reservasEstaticas = [

];*/

export const espaciosEstaticos = [
  {
    id: '1',
    nombre: 'Auditorio Central',
    descripcion:
      'Espacio amplio con sistema de sonido y proyector HD, ideal para conferencias y eventos académicos.',
    propietario: 'admin',
    capacidad: 200,
    direccion: 'Av. Universidad 123',
    estado: 'ACTIVO',
    latitud: 19.4326,
    longitud: -99.1332,
    puntosInteres: [
      {
        nombre: 'Parque Central',
        descripcion:
          'Un hermoso parque con áreas verdes y senderos para caminar.',
        distancia: 1.5,
        url: 'https://ejemplo.com/parque-central'
      },
      {
        nombre: 'Museo de Historia',
        descripcion:
          'Un museo con exposiciones sobre la historia local y nacional.',
        distancia: 3.2,
        url: 'https://ejemplo.com/museo-historia'
      },
      {
        nombre: 'Café del Lago',
        descripcion:
          'Un acogedor café con vista al lago y excelente café artesanal.',
        distancia: 0.8,
        url: 'https://ejemplo.com/cafe-del-lago'
      },
      {
        nombre: 'Mirador de la Ciudad',
        descripcion:
          'Un mirador con una vista panorámica espectacular de la ciudad.',
        distancia: 5.0,
        url: 'https://ejemplo.com/mirador-ciudad'
      }
    ]
  },
  {
    id: '2',
    nombre: 'Sala Creativa',
    descripcion:
      'Ideal para sesiones de brainstorming, equipada con pizarras y mobiliario flexible.',
    propietario: 'admin',
    capacidad: 20,
    direccion: 'Edificio B, segundo piso',
    estado: 'CERRADO_TEMPORALMENTE',
    latitud: 19.432,
    longitud: -99.1335,
    puntosInteres: []
  },
  {
    id: '3',
    nombre: 'Espacio de Coworking',
    descripcion:
      'Ambiente colaborativo para freelancers y emprendedores con Wi-Fi de alta velocidad.',
    propietario: 'admin',
    capacidad: 30,
    direccion: 'Sector Innovación, planta baja',
    estado: 'ACTIVO',
    latitud: 19.433,
    longitud: -99.134,
    puntosInteres: []
  },
  {
    id: '4',
    nombre: 'Laboratorio de Fabricación Digital',
    descripcion:
      'Equipado con impresoras 3D, cortadoras láser y estaciones de soldadura. Ideal para prototipado rápido.',
    propietario: 'Universidad Central',
    capacidad: 15,
    direccion: 'Edificio C, tercer piso',
    estado: 'ACTIVO',
    latitud: 19.434,
    longitud: -99.135,
    puntosInteres: []
  },
  {
    id: '5',
    nombre: 'Sala de Videoconferencias',
    descripcion:
      'Espacio con cámaras HD, micrófonos direccionales y pantallas para videollamadas profesionales.',
    propietario: 'Universidad Central',
    capacidad: 8,
    direccion: 'Edificio A, oficina 210',
    estado: 'CERRADO_TEMPORALMENTE',
    latitud: 19.435,
    longitud: -99.136,
    puntosInteres: []
  },
  {
    id: '6',
    nombre: 'Terraza Verde',
    descripcion:
      'Área al aire libre con vegetación y zonas de descanso, ideal para reuniones informales y pausas activas.',
    propietario: 'Universidad Central',
    capacidad: 25,
    direccion: 'Azotea del edificio B',
    estado: 'ACTIVO',
    latitud: 19.436,
    longitud: -99.137,
    puntosInteres: []
  },
  {
    id: '7',
    nombre: 'Mini Auditorio',
    descripcion:
      'Espacio con butacas plegables y equipo audiovisual, ideal para charlas y presentaciones pequeñas.',
    propietario: 'Universidad Central',
    capacidad: 50,
    direccion: 'Edificio D, subsuelo',
    estado: 'CERRADO_TEMPORALMENTE',
    latitud: 19.437,
    longitud: -99.138,
    puntosInteres: []
  },
  {
    id: '8',
    nombre: 'Aula Inteligente',
    descripcion:
      'Con pizarras electrónicas y proyector interactivo, ideal para clases modernas.',
    propietario: 'admin',
    capacidad: 40,
    direccion: 'Edificio E, piso 1',
    estado: 'ACTIVO',
    latitud: 19.438,
    longitud: -99.139,
    puntosInteres: []
  },
  {
    id: '9',
    nombre: 'Estudio Multimedia',
    descripcion:
      'Espacio con iluminación profesional y cámaras para grabación de contenido.',
    propietario: 'Universidad Central',
    capacidad: 10,
    direccion: 'Edificio A, sótano',
    estado: 'ACTIVO',
    latitud: 19.439,
    longitud: -99.14,
    puntosInteres: []
  },
  {
    id: '10',
    nombre: 'Biblioteca Silenciosa',
    descripcion:
      'Sala de lectura silenciosa con conexión a internet y escritorios individuales.',
    propietario: 'admin',
    capacidad: 35,
    direccion: 'Edificio C, piso 2',
    estado: 'ACTIVO',
    latitud: 19.44,
    longitud: -99.141,
    puntosInteres: []
  },
  {
    id: '11',
    nombre: 'Salón de Talleres',
    descripcion:
      'Espacio amplio para realizar talleres prácticos con mesas y herramientas.',
    propietario: 'Universidad Central',
    capacidad: 60,
    direccion: 'Edificio Talleres, planta baja',
    estado: 'ACTIVO',
    latitud: 19.441,
    longitud: -99.142,
    puntosInteres: []
  },
  {
    id: '12',
    nombre: 'Zona Chill',
    descripcion:
      'Espacio relajado con sillones, música suave y café, ideal para desconectar.',
    propietario: 'admin',
    capacidad: 15,
    direccion: 'Zona Común, pasillo central',
    estado: 'ACTIVO',
    latitud: 19.442,
    longitud: -99.143,
    puntosInteres: []
  },
  {
    id: '13',
    nombre: 'Laboratorio de Ciencias',
    descripcion:
      'Equipado con material de laboratorio para prácticas de física y química.',
    propietario: 'Universidad Central',
    capacidad: 20,
    direccion: 'Edificio Ciencias, laboratorio 3',
    estado: 'CERRADO_TEMPORALMENTE',
    latitud: 19.443,
    longitud: -99.144,
    puntosInteres: []
  },
  {
    id: '14',
    nombre: 'Aula Híbrida',
    descripcion:
      'Diseñada para clases presenciales y virtuales simultáneamente.',
    propietario: 'admin',
    capacidad: 30,
    direccion: 'Edificio E, aula 202',
    estado: 'ACTIVO',
    latitud: 19.444,
    longitud: -99.145,
    puntosInteres: []
  },
  {
    id: '15',
    nombre: 'Espacio Maker',
    descripcion:
      'Área creativa para diseño y construcción de prototipos físicos.',
    propietario: 'admin',
    capacidad: 18,
    direccion: 'Makerspace, edificio innovación',
    estado: 'ACTIVO',
    latitud: 19.445,
    longitud: -99.146,
    puntosInteres: []
  },
  {
    id: '16',
    nombre: 'Foro Abierto',
    descripcion:
      'Anfiteatro al aire libre para presentaciones y eventos públicos.',
    propietario: 'Universidad Central',
    capacidad: 100,
    direccion: 'Plaza principal',
    estado: 'ACTIVO',
    latitud: 19.446,
    longitud: -99.147,
    puntosInteres: []
  },
  {
    id: '17',
    nombre: 'Sala de Debate',
    descripcion:
      'Espacio para debates y simulaciones académicas con mesas redondas.',
    propietario: 'admin',
    capacidad: 25,
    direccion: 'Edificio Humanidades, sala 5',
    estado: 'ACTIVO',
    latitud: 19.447,
    longitud: -99.148,
    puntosInteres: []
  },
  {
    id: '18',
    nombre: 'Estudio de Radio',
    descripcion:
      'Cabina equipada para transmisión y grabación de programas de radio.',
    propietario: 'Universidad Central',
    capacidad: 5,
    direccion: 'Edificio Comunicaciones',
    estado: 'CERRADO_TEMPORALMENTE',
    latitud: 19.448,
    longitud: -99.149,
    puntosInteres: []
  },
  {
    id: '19',
    nombre: 'Cafetería Estudiantil',
    descripcion:
      'Área con mesas, wifi y microondas, ideal para almorzar o estudiar.',
    propietario: 'Universidad Central',
    capacidad: 50,
    direccion: 'Edificio Comedor, piso 1',
    estado: 'ACTIVO',
    latitud: 19.449,
    longitud: -99.15,
    puntosInteres: []
  },
  {
    id: '20',
    nombre: 'Sala de Juegos',
    descripcion:
      'Consolas, juegos de mesa y sillones cómodos para actividades recreativas.',
    propietario: 'admin',
    capacidad: 15,
    direccion: 'Zona Estudiantil',
    estado: 'ACTIVO',
    latitud: 19.45,
    longitud: -99.151,
    puntosInteres: []
  },
  {
    id: '21',
    nombre: 'Taller de Robótica',
    descripcion:
      'Equipado con kits de robótica educativa y estaciones de programación.',
    propietario: 'admin',
    capacidad: 12,
    direccion: 'Edificio Tecnología',
    estado: 'ACTIVO',
    latitud: 19.451,
    longitud: -99.152,
    puntosInteres: []
  },
  {
    id: '22',
    nombre: 'Patio Techado',
    descripcion:
      'Espacio semicubierto para eventos, ferias y actividades recreativas.',
    propietario: 'Universidad Central',
    capacidad: 120,
    direccion: 'Sector Norte',
    estado: 'CERRADO_TEMPORALMENTE',
    latitud: 19.452,
    longitud: -99.153,
    puntosInteres: []
  },
  {
    id: '23',
    nombre: 'Sala de Ensayo',
    descripcion: 'Espacio acústico para ensayos musicales y teatrales.',
    propietario: 'Universidad Central',
    capacidad: 10,
    direccion: 'Edificio Artes',
    estado: 'ACTIVO',
    latitud: 19.453,
    longitud: -99.154,
    puntosInteres: []
  },
  {
    id: '24',
    nombre: 'Aula Verde',
    descripcion: 'Espacio ecológico con materiales sostenibles y luz natural.',
    propietario: 'admin',
    capacidad: 22,
    direccion: 'Edificio Ecológico',
    estado: 'ACTIVO',
    latitud: 19.454,
    longitud: -99.155,
    puntosInteres: []
  },
  {
    id: '25',
    nombre: 'Sala de Consulta',
    descripcion: 'Para atención psicológica y académica en privado.',
    propietario: 'Universidad Central',
    capacidad: 3,
    direccion: 'Edificio Salud, oficina 102',
    estado: 'ACTIVO',
    latitud: 19.455,
    longitud: -99.156,
    puntosInteres: []
  },
  {
    id: '26',
    nombre: 'Galería de Arte',
    descripcion:
      'Espacio para exposiciones temporales de estudiantes y artistas locales.',
    propietario: 'Universidad Central',
    capacidad: 40,
    direccion: 'Edificio Cultural',
    estado: 'ACTIVO',
    latitud: 19.456,
    longitud: -99.157,
    puntosInteres: []
  },
  {
    id: '27',
    nombre: 'Sala de Realidad Virtual',
    descripcion:
      'Equipado con visores y espacio libre para experiencias inmersivas.',
    propietario: 'admin',
    capacidad: 6,
    direccion: 'Edificio Tecnología, piso 1',
    estado: 'ACTIVO',
    latitud: 19.457,
    longitud: -99.158,
    puntosInteres: []
  },
  {
    id: '28',
    nombre: 'Terraza de Meditación',
    descripcion:
      'Zona tranquila con cojines y plantas, ideal para mindfulness.',
    propietario: 'Universidad Central',
    capacidad: 12,
    direccion: 'Azotea, Edificio D',
    estado: 'ACTIVO',
    latitud: 19.458,
    longitud: -99.159,
    puntosInteres: []
  },
  {
    id: '29',
    nombre: 'Oficina de Innovación',
    descripcion:
      'Espacio para reuniones de proyectos de innovación institucional.',
    propietario: 'Universidad Central',
    capacidad: 8,
    direccion: 'Edificio Administración, piso 3',
    estado: 'ACTIVO',
    latitud: 19.459,
    longitud: -99.16,
    puntosInteres: []
  },
  {
    id: '30',
    nombre: 'Aula Experimental',
    descripcion:
      'Diseñada para pruebas pedagógicas con mobiliario móvil y modular.',
    propietario: 'admin',
    capacidad: 20,
    direccion: 'Edificio A, sala 105',
    estado: 'CERRADO_TEMPORALMENTE',
    latitud: 19.46,
    longitud: -99.161,
    puntosInteres: []
  }
]

export const eventosEstaticos = [
  {
    id: 'e1',
    nombre: 'Charla sobre Ciberseguridad',
    descripcion:
      'Una introducción a los principios básicos de seguridad informática.',
    organizador: 'admin',
    numPlazas: 60,
    cancelado: false,
    categoria: 'CHARLA',
    ocupacion: {
      fechaInicio: '2025-04-18T10:00:00',
      fechaFin: '2025-04-18T12:00:00',
      espacioFisico: 'Aula Magna'
    }
  },
  {
    id: 'e2',
    nombre: 'Taller de Arduino',
    descripcion: 'Aprende a programar microcontroladores desde cero.',
    organizador: 'admin',
    numPlazas: 25,
    cancelado: false,
    categoria: 'TALLER',
    ocupacion: {
      fechaInicio: '2025-04-22T09:00:00',
      fechaFin: '2025-04-22T13:00:00',
      espacioFisico: 'Laboratorio B101'
    }
  },
  {
    id: 'e3',
    nombre: 'Hackathon de Datos Abiertos',
    descripcion: 'Desarrolla soluciones con datos públicos en solo 24 horas.',
    organizador: 'admin',
    numPlazas: 80,
    cancelado: false,
    categoria: 'HACKATHON',
    ocupacion: {
      fechaInicio: '2025-05-03T10:00:00',
      fechaFin: '2025-05-04T10:00:00',
      espacioFisico: 'Sala de Innovación'
    }
  },
  {
    id: 'e4',
    nombre: 'Feria de Robótica',
    descripcion:
      'Exhibición de robots creados por estudiantes de distintas facultades.',
    organizador: 'admin',
    numPlazas: 150,
    cancelado: false,
    categoria: 'FERIA',
    ocupacion: {
      fechaInicio: '2025-05-08T10:00:00',
      fechaFin: '2025-05-08T16:00:00',
      espacioFisico: 'Foro Abierto'
    }
  },
  {
    id: 'e5',
    nombre: 'Concurso de Matemáticas',
    descripcion:
      'Pon a prueba tus habilidades resolviendo problemas en equipo.',
    organizador: 'admin',
    numPlazas: 40,
    cancelado: false,
    categoria: 'COMPETENCIA',
    ocupacion: {
      fechaInicio: '2025-05-10T14:00:00',
      fechaFin: '2025-05-10T18:00:00',
      espacioFisico: 'Aula 204'
    }
  },
  {
    id: 'e6',
    nombre: 'Concierto de Primavera',
    descripcion: 'Presentación de la orquesta universitaria y bandas locales.',
    organizador: 'admin',
    numPlazas: 300,
    cancelado: false,
    categoria: 'ENTRETENIMIENTO',
    ocupacion: {
      fechaInicio: '2025-05-20T18:00:00',
      fechaFin: '2025-05-20T21:00:00',
      espacioFisico: 'Foro Principal'
    }
  },
  {
    id: 'e7',
    nombre: 'Proyección de Documentales',
    descripcion:
      'Serie de documentales sobre cambio climático y medio ambiente.',
    organizador: 'admin',
    numPlazas: 100,
    cancelado: false,
    categoria: 'CULTURALES',
    ocupacion: {
      fechaInicio: '2025-05-23T16:00:00',
      fechaFin: '2025-05-23T19:00:00',
      espacioFisico: 'Sala Audiovisual'
    }
  },
  {
    id: 'e8',
    nombre: 'Expo Startups',
    descripcion:
      'Emprendedores universitarios presentan sus proyectos al público.',
    organizador: 'admin',
    numPlazas: 200,
    cancelado: true,
    categoria: 'FERIA',
    ocupacion: {
      fechaInicio: '2025-05-30T10:00:00',
      fechaFin: '2025-05-30T17:00:00',
      espacioFisico: 'Pabellón Innovador'
    }
  },
  {
    id: 'e9',
    nombre: 'Taller de Diseño UX/UI',
    descripcion: 'Aprende a crear interfaces de usuario efectivas.',
    organizador: 'admin',
    numPlazas: 30,
    cancelado: true,
    categoria: 'TALLER',
    ocupacion: {
      fechaInicio: '2025-06-01T09:00:00',
      fechaFin: '2025-06-01T13:00:00',
      espacioFisico: 'Aula Creativa'
    }
  },
  {
    id: 'e10',
    nombre: 'Charla sobre Física Cuántica',
    descripcion:
      'Una explicación accesible sobre los principios fundamentales.',
    organizador: 'admin',
    numPlazas: 80,
    cancelado: true,
    categoria: 'CHARLA',
    ocupacion: {
      fechaInicio: '2025-06-06T11:00:00',
      fechaFin: '2025-06-06T13:00:00',
      espacioFisico: 'Auditorio Principal'
    }
  },
  {
    id: 'e11',
    nombre: 'Simposio de Inteligencia Artificial',
    descripcion:
      'Expertos discuten el futuro de la IA en diferentes industrias.',
    organizador: 'Facultad de Informática',
    numPlazas: 120,
    cancelado: false,
    categoria: 'CONFERENCIA',
    ocupacion: {
      fechaInicio: '2025-06-10T10:00:00',
      fechaFin: '2025-06-10T17:00:00',
      espacioFisico: 'Auditorio 2'
    }
  },
  {
    id: 'e12',
    nombre: 'Torneo de Ajedrez',
    descripcion: 'Compite contra otros estudiantes en partidas rápidas.',
    organizador: 'Club de Ajedrez',
    numPlazas: 50,
    cancelado: false,
    categoria: 'COMPETENCIA',
    ocupacion: {
      fechaInicio: '2025-06-12T15:00:00',
      fechaFin: '2025-06-12T19:00:00',
      espacioFisico: 'Sala de Juegos'
    }
  },
  {
    id: 'e13',
    nombre: 'Curso Intensivo de Python',
    descripcion: 'Aprende programación desde cero en una semana.',
    organizador: 'Laboratorio de Software',
    numPlazas: 40,
    cancelado: false,
    categoria: 'CURSO',
    ocupacion: {
      fechaInicio: '2025-06-17T09:00:00',
      fechaFin: '2025-06-21T13:00:00',
      espacioFisico: 'Aula 105'
    }
  },
  {
    id: 'e14',
    nombre: 'Encuentro de Egresados',
    descripcion: 'Conectando generaciones para compartir experiencias.',
    organizador: 'Oficina de Egresados',
    numPlazas: 200,
    cancelado: false,
    categoria: 'ENCUENTRO',
    ocupacion: {
      fechaInicio: '2025-06-22T17:00:00',
      fechaFin: '2025-06-22T20:00:00',
      espacioFisico: 'Patio Central'
    }
  },
  {
    id: 'e15',
    nombre: 'Noche de Talentos',
    descripcion:
      'Presentaciones artísticas de estudiantes de toda la universidad.',
    organizador: 'Dirección de Cultura',
    numPlazas: 300,
    cancelado: false,
    categoria: 'ENTRETENIMIENTO',
    ocupacion: {
      fechaInicio: '2025-06-27T18:00:00',
      fechaFin: '2025-06-27T21:00:00',
      espacioFisico: 'Teatro Universitario'
    }
  },
  {
    id: 'e16',
    nombre: 'Jornada de Puertas Abiertas',
    descripcion: 'Conoce la universidad, sus programas y servicios.',
    organizador: 'Admisiones',
    numPlazas: 500,
    cancelado: false,
    categoria: 'INFORMATIVO',
    ocupacion: {
      fechaInicio: '2025-07-01T09:00:00',
      fechaFin: '2025-07-01T14:00:00',
      espacioFisico: 'Campus General'
    }
  },
  {
    id: 'e17',
    nombre: 'Maratón de Videojuegos',
    descripcion: 'Compite en juegos populares por equipos.',
    organizador: 'Club de Videojuegos',
    numPlazas: 80,
    cancelado: false,
    categoria: 'COMPETENCIA',
    ocupacion: {
      fechaInicio: '2025-07-04T10:00:00',
      fechaFin: '2025-07-04T22:00:00',
      espacioFisico: 'Sala Multimedia'
    }
  },
  {
    id: 'e18',
    nombre: 'Taller de Fotografía Digital',
    descripcion: 'Aprende composición, edición y técnicas de fotografía.',
    organizador: 'Escuela de Artes Visuales',
    numPlazas: 25,
    cancelado: false,
    categoria: 'TALLER',
    ocupacion: {
      fechaInicio: '2025-07-08T14:00:00',
      fechaFin: '2025-07-08T18:00:00',
      espacioFisico: 'Laboratorio de Imagen'
    }
  },
  {
    id: 'e19',
    nombre: 'Mesa Redonda sobre Cambio Climático',
    descripcion: 'Discusión entre investigadores y estudiantes.',
    organizador: 'Facultad de Ciencias Ambientales',
    numPlazas: 100,
    cancelado: false,
    categoria: 'DEBATE',
    ocupacion: {
      fechaInicio: '2025-07-10T16:00:00',
      fechaFin: '2025-07-10T18:00:00',
      espacioFisico: 'Sala de Conferencias'
    }
  },
  {
    id: 'e20',
    nombre: 'Ciclo de Cine Europeo',
    descripcion: 'Proyecciones y análisis de películas europeas recientes.',
    organizador: 'Departamento de Humanidades',
    numPlazas: 90,
    cancelado: false,
    categoria: 'CULTURALES',
    ocupacion: {
      fechaInicio: '2025-07-15T18:00:00',
      fechaFin: '2025-07-19T21:00:00',
      espacioFisico: 'Sala Audiovisual'
    }
  },
  {
    id: 'e21',
    nombre: 'Exposición de Arte Estudiantil',
    descripcion: 'Obras visuales creadas por alumnos de todas las facultades.',
    organizador: 'Facultad de Bellas Artes',
    numPlazas: 150,
    cancelado: false,
    categoria: 'EXPOSICIÓN',
    ocupacion: {
      fechaInicio: '2025-07-22T10:00:00',
      fechaFin: '2025-07-26T17:00:00',
      espacioFisico: 'Galería Universitaria'
    }
  },
  {
    id: 'e22',
    nombre: 'Foro de Economía Circular',
    descripcion: 'Debates sobre sostenibilidad y reciclaje en la industria.',
    organizador: 'Facultad de Economía',
    numPlazas: 130,
    cancelado: false,
    categoria: 'FORO',
    ocupacion: {
      fechaInicio: '2025-07-28T10:00:00',
      fechaFin: '2025-07-28T15:00:00',
      espacioFisico: 'Auditorio 3'
    }
  },
  {
    id: 'e23',
    nombre: 'Taller de Escritura Creativa',
    descripcion:
      'Desarrolla tu estilo personal a través de ejercicios literarios.',
    organizador: 'Taller de Letras',
    numPlazas: 20,
    cancelado: false,
    categoria: 'TALLER',
    ocupacion: {
      fechaInicio: '2025-08-01T14:00:00',
      fechaFin: '2025-08-01T17:00:00',
      espacioFisico: 'Sala de Lectura'
    }
  },
  {
    id: 'e24',
    nombre: 'Jornada de Donación de Sangre',
    descripcion: 'Participa y salva vidas con tu donación.',
    organizador: 'Unidad de Salud Universitaria',
    numPlazas: 100,
    cancelado: false,
    categoria: 'VOLUNTARIADO',
    ocupacion: {
      fechaInicio: '2025-08-05T09:00:00',
      fechaFin: '2025-08-05T14:00:00',
      espacioFisico: 'Módulo de Salud'
    }
  },
  {
    id: 'e25',
    nombre: 'Seminario sobre Blockchain',
    descripcion: 'Introducción técnica y aplicaciones del blockchain.',
    organizador: 'Facultad de Ingeniería de Sistemas',
    numPlazas: 60,
    cancelado: false,
    categoria: 'SEMINARIO',
    ocupacion: {
      fechaInicio: '2025-08-10T10:00:00',
      fechaFin: '2025-08-10T13:00:00',
      espacioFisico: 'Aula 302'
    }
  },
  {
    id: 'e26',
    nombre: 'Festival de Comida Internacional',
    descripcion:
      'Degustación de platos preparados por estudiantes extranjeros.',
    organizador: 'Relaciones Internacionales',
    numPlazas: 300,
    cancelado: false,
    categoria: 'ENTRETENIMIENTO',
    ocupacion: {
      fechaInicio: '2025-08-15T12:00:00',
      fechaFin: '2025-08-15T17:00:00',
      espacioFisico: 'Plaza Central'
    }
  },
  {
    id: 'e27',
    nombre: 'Competencia de Debate',
    descripcion: 'Discute temas polémicos con lógica y respeto.',
    organizador: 'Sociedad de Debate',
    numPlazas: 40,
    cancelado: false,
    categoria: 'COMPETENCIA',
    ocupacion: {
      fechaInicio: '2025-08-20T10:00:00',
      fechaFin: '2025-08-20T14:00:00',
      espacioFisico: 'Sala de Conferencias'
    }
  },
  {
    id: 'e28',
    nombre: 'Curso de Diseño 3D',
    descripcion: 'Crea modelos en Blender para videojuegos y animación.',
    organizador: 'Facultad de Diseño',
    numPlazas: 35,
    cancelado: false,
    categoria: 'CURSO',
    ocupacion: {
      fechaInicio: '2025-08-25T09:00:00',
      fechaFin: '2025-08-29T13:00:00',
      espacioFisico: 'Laboratorio Digital'
    }
  },
  {
    id: 'e29',
    nombre: 'Taller de Finanzas Personales',
    descripcion: 'Aprende a administrar tu dinero de manera eficiente.',
    organizador: 'Facultad de Administración',
    numPlazas: 50,
    cancelado: false,
    categoria: 'TALLER',
    ocupacion: {
      fechaInicio: '2025-08-30T15:00:00',
      fechaFin: '2025-08-30T18:00:00',
      espacioFisico: 'Aula 110'
    }
  },
  {
    id: 'e30',
    nombre: 'Festival de Teatro Universitario',
    descripcion: 'Obras presentadas por grupos estudiantiles.',
    organizador: 'Departamento de Artes Escénicas',
    numPlazas: 250,
    cancelado: false,
    categoria: 'CULTURALES',
    ocupacion: {
      fechaInicio: '2025-09-05T18:00:00',
      fechaFin: '2025-09-07T21:00:00',
      espacioFisico: 'Teatro Universitario'
    }
  }
]

export const reservasEstaticas = [
  {
    id: '1a2b3c-admin',
    idUsuario: 'admin',
    plazasReservadas: 2,
    cancelada: false,
    evento: { nombre: 'Concierto de Rock' }
  },
  {
    id: '2a3b4c-usuario1',
    idUsuario: 'usuario1',
    plazasReservadas: 1,
    cancelada: false,
    evento: { nombre: 'Charla de Tecnología' }
  },
  {
    id: '3a4b5c-usuario1',
    idUsuario: 'usuario1',
    plazasReservadas: 3,
    cancelada: true,
    evento: { nombre: 'Taller de Arte' }
  },
  {
    id: '4a5b6c-usuario2',
    idUsuario: 'usuario2',
    plazasReservadas: 4,
    cancelada: false,
    evento: { nombre: 'Feria Gastronómica' }
  },
  {
    id: '5a6b7c-admin',
    idUsuario: 'admin',
    plazasReservadas: 2,
    cancelada: true,
    evento: { nombre: 'Encuentro de Startups' }
  },
  {
    id: '6a7b8c-usuario2',
    idUsuario: 'usuario2',
    plazasReservadas: 2,
    cancelada: false,
    evento: { nombre: 'Festival de Cine' }
  },
  {
    id: '7a8b9c-usuario1',
    idUsuario: 'usuario1',
    plazasReservadas: 5,
    cancelada: false,
    evento: { nombre: 'Maratón Ciudadana' }
  },
  {
    id: '8a9b0c-admin',
    idUsuario: 'admin',
    plazasReservadas: 1,
    cancelada: false,
    evento: { nombre: 'Expo Tecnología 2025' }
  },
  {
    id: '9a0b1c-usuario2',
    idUsuario: 'usuario2',
    plazasReservadas: 3,
    cancelada: true,
    evento: { nombre: 'Torneo de Ajedrez' }
  },
  {
    id: '0a1b2c-usuario1',
    idUsuario: 'usuario1',
    plazasReservadas: 2,
    cancelada: false,
    evento: { nombre: 'Feria del Libro' }
  }
]
