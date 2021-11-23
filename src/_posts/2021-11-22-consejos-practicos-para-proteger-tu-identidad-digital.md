---
layout: post
title: "Consejos prácticos para proteger tu identidad digital 🔐"
date: 2021-11-22 00:00:00 -0500
categories: beginners, career, spanish, Security
permalink: /posts/consejos-practicos-para-proteger-tu-identidad-digital
---

Hace unos días un amigo me contó de una experiencia que tuvo donde el robo de un celular desencadenó mucho estrés y situaciones que uno muchas veces no contempla.

Por lo general cuando escuchamos de un robo o pérdida de celular lo primero que pensamos es en "va a terminar en una casa de empeño o en el tianguis".

Sin embargo, hoy en día nuestro smartphone es más que una simple herramienta para hacer una llamada o enviar un SMS, la mayor parte de nuestra vida se encuentra contenida en ese pequeño aparato, además de que es la puerta de entrada a nuestra identidad digital.

Desde cuentas de redes sociales (Twitter, FB, IG, TkTk, etc) hasta ya temas más serios, como accesos bancarios, criptomonedas (para estar a la moda), servicios de compra en linea, entre otros, están contenidos a solo un slide de distancia.

Incluso he llegado a escuchar a familiares y conocidos decir "no tengo nada que ocultar" o "no tengo nada que me roben".

Pero viéndolo en perspectiva ¿te has cuestionado, qué pasaría si alguien al robar tu celular tuviera suficiente tiempo para acceder a tu correo electrónico y cambiar tu teléfono de acceso además de las claves de recuperación?

Nota: Todo lo que voy a compartir a partir de aquí son solo consejos de alguien que ya tiene unos cuantos años vagando por este mundo digital, no soy ningún experto en seguridad, ni sé hackear FB. Sin embargo, me pareció importante apoyar un poco a crear conciencia en estos temas.

La seguridad de nuestra identidad digital debe ser algo que tengamos bien presente a la hora de crear cuentas en los distintos servicios en los que nos hemos registrado o estemos por agregar a nuestra lista.

Muchos hemos pasado por el ir agregando nuevos caracteres a una contraseña básica que obtuvimos hace unos ayeres y pensando que nuestra estrategia es infalible y "cómoda" porque nadie nunca sabrá como la creamos.

<a href="https://www.commitstrip.com/en/2015/08/19/password-memories/">
  <img src="https://res.cloudinary.com/juancrg90/image/upload/v1637642123/Consejos%20pra%CC%81cticos%20para%20proteger%20tu%20identidad%20digital/Untitled_u6sipz.png" alt="Password memories commitstrip">
</a>


Pero hoy día, las computadoras pueden calcular una cantidad enorme de passwords por segundo, para expresarlo en números redondos, este artículo de [Gizmodo AU](https://www.gizmodo.com.au/2020/09/a-computer-can-guess-more-than-100000000000-passwords-per-second/) escrito en 2020 menciona la cifra de 100,000,000,000 passwords por segundo.  Dentro del artículo se comenta que un password de 8 caracteres puede ser hackeado en aproximadamente 12 minutos usando una instancia en la nube. Ahora bien, entre más larga sea nuestra contraseña más tiempo le tomará a un atacante el tratar de calcularla.

Por lo que nuestra mejor opción hoy día es hacer uso de algún servicio de manejo de contraseñas, el cual se encargue de generarlas y almacenarlas quedando así la tarea de aprender solo una contraseña maestra. Esta contraseña  debería ser lo suficientemente compleja como para evitar que nos la roben en un par de minutos.

Aquí en los internets existen una gran cantidad de servicios, los cuales podemos usar para esta labor, entre los más populares destacan [1password.com](https://1password.com/), [lastpass.com](https://www.lastpass.com/), [enpass.io](https://www.enpass.io/), [safe-in-cloud.com](http://www.safe-in-cloud.com/) entre otros.  El servicio que decidas utilizar dependerá de factores como el si almacena las contraseñas en la nube de la empresa proveedora o en un archivo encriptado en tu nube personal, así  como del precio y algunas funciones como llenado de formularios o integración biométrica con tu smartphone. Si aún no utilizas ninguno, no pierdes nada con echarles un ojo, muchas de estas herramientas incluso cuentan con funciones que te permiten detectar si alguno de tus passwords ha sido comprometido y anda vagando por ahí en la Dark web.

![Dark web monitoring](https://res.cloudinary.com/juancrg90/image/upload/v1637642121/Consejos%20pra%CC%81cticos%20para%20proteger%20tu%20identidad%20digital/Untitled_1_buyhdp.png)

![Search compromised passwords](https://res.cloudinary.com/juancrg90/image/upload/v1637642121/Consejos%20pra%CC%81cticos%20para%20proteger%20tu%20identidad%20digital/Untitled_2_pjgmfs.png)

Ahora bien esto es algo muy general, si un atacante lograra adueñarse del acceso a tu correo electrónico y de tu número de teléfono, podría simplemente solicitar la recuperación de contraseña a los servicios y comenzar a hacer cargos a tu nombre. Para buscar limitar o retrasar el que el atacante pueda ingresar al resto de los servicios relacionados con tu cuenta. podemos utilizar lo que se le conoce como la autenticación en 2 factores (2FA). Esta función hará que los servicios donde este activa soliciten una clave adicional al momento de iniciar sesión. Esta clave es generada de manera dinámica por algunas aplicaciones como  [Google Authenticator](https://support.google.com/accounts/answer/1066447?hl=en&co=GENIE.Platform%3DAndroid) o [Authy](https://authy.com/).

Algunos servicios te dan la opción de recibas el código via SMS, pero si estamos hablando del caso hipotético de que nos roben el celular, dudo que queramos que sea nuestra opción preferida.

Complementando lo que hablábamos de manejadores de contraseñas, algunos de estos servicios incluyen ya la funcionalidad para que también manejar el [token dinámico del 2FA](https://support.1password.com/one-time-passwords/). Por el momento no tengo una postura respecto a manejar las contraseñas y los tokens de 2FA en una sola herramienta o dividir las responsabilidades. Si tu utilizas la misma herramienta para ambas labores me gustaría leer tu opinion.

Si realmente quisiéramos llevar este tema del segundo paso de autenticación a otro nivel, existen herramientas como las **YubiKey** creadas por  [yubico.com](https://www.yubico.com/), las cuales nos permiten hacer login hasta que la llave este conectada a nuestra computadora o smartphone y lo hayamos aprobado.

El principal contra de estas llaves es que no todos los servicios lo soportan, sin embargo es una buena opción para proteger los servicios más importantes, como nuestro correo electrónico (en el caso de Gmail).

Como un último consejo, identifica donde puedes dar de baja dispositivos de tus cuentas principales, por ejemplo Google tiene esta ruta donde puedes ver que dispositivos están conectados a tu cuenta y terminar la sesión desde ahí. [https://myaccount.google.com/device-activity](https://myaccount.google.com/device-activity)

Recapitulando:

- Nunca dejes tu teléfono sin contraseña para entrar a las aplicaciones.
- Utiliza un manejador de contraseñas en lugar de usar "la misma con unos pequeños cambios".
- Siempre activa la autenticación de dos pasos.
- No uses SMS como tu opción para recuperar cuentas
- Si puedes y tienes la oportunidad invierte en una llave física para el 2FA
- Identifica donde desconectar dispositivos de tus cuentas principales en caso de una emergencia.

Espero este artículo te sea de utilidad, repito no soy un gurú de seguridad, sin embargo creo esta es información valiosa que puede servirle a más de una persona, si conoces a alguien que le pudiera servir por favor ayúdame a difundirlo.
