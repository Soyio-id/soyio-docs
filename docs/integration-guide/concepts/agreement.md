
# Agreement y evidencia

Soyio redefine la relación entre usuarios y empresas al introducir los conceptos de **Agreement** y **Evidencia**. Estos conceptos permiten a las empresas mantener un registro preciso y cumplir con normativas de protección de datos de forma ágil y confiable, mientras que los usuarios obtienen un control más transparente y seguro sobre los datos que deciden compartir.

## Agreement

Cuando un usuario interactúa con una empresa a través de los módulos de Soyio, se genera o actualiza automáticamente un acuerdo digital, denominado Agreement. Este acuerdo va más allá de un contrato tradicional: es una representación dinámica de la relación actual entre la empresa y el usuario. En él se especifican las categorías de datos que procesará la empresa, el uso que les dará y el tiempo de conservación.

El Agreement actúa como un eje central en las soluciones de gestión de consentimiento que ofrece Soyio. Se crea en la primera interacción del usuario con la empresa y se actualiza a medida que el usuario interactúa con diferentes módulos relacionados con el consentimiento. Este acuerdo unificado proporciona al usuario una experiencia fluida, generando confianza y transparencia, mientras que a la empresa le proporciona un registro centralizado y fácilmente accesible de todos los consentimientos que ha otorgado cada usuario y cómo se han modificado a lo largo del tiempo.

### Contenido del Agreement

La taxonomía de Soyio se basa en el modelo propuesto por [Fideslang](https://ethyca.github.io/fideslang/). Tiene como objetivo facilitar la categorización precisa y la comprensión del manejo de datos mediante el uso de categorías y usos de datos estructurados jerárquicamente. Esto permite tanto a las empresas como a los usuarios entender claramente las políticas de manejo de datos.

- **Categorías de datos:** Las categorías de datos son etiquetas que describen el tipo de datos que procesa una empresa. Por ejemplo, los datos de contacto del usuario pueden clasificarse de manera general como `user.contact` o con mayor precisión como `user.contact.email`. Puedes ver más detalles de las categorías de datos soportadas en [el siguiente enlace.](https://ethyca.github.io/fideslang/taxonomy/data_categories/)

- **Usos de datos:** Los usos de datos son etiquetas que describen cómo o para qué propósitos se utiliza un componente de datos dentro del sistema. Al igual que las categorías de datos, los usos también son jerárquicos, lo que permite describir el uso de los datos de manera general (por ejemplo, `provide.service.operations`) o con mayor precisión usando subcategorías (por ejemplo, `provide.service.operations.support.optimization`). Puedes ver más detalles de los usos soportados en [el siguiente enlace.](https://ethyca.github.io/fideslang/taxonomy/data_uses/)

## Evidencia

La "evidencia" se refiere al log o registro auditable que documenta la creación o modificación de un agreement. Este registro es esencial para proporcionar transparencia y trazabilidad de las acciones llevadas a cabo sobre los acuerdos entre usuarios y la empresa.

### Contenido del registro de evidencia
El registro de evidencia incluye, pero no se limita a, los siguientes elementos:

- **Acciones del usuario:** Detalla las interacciones realizadas por el usuario que afectan la creación o modificación de un agreement, junto a la fecha y hora en la que ocurrió cada una de ellas.
- **Método utilizado para dar el consentimiento:** Detalles de la forma en la que se obtuvo el consentimiento, esto incluye el canal utilizado (website, aplicación movil, formulario, etc.), la forma en la que dio su consentimiento (opt-in checkbox, firma de contrato, etc.) y la información que se le presentó al usuario para que diera su consentimiento informado e inequívoco.
- **Método de identificación del usuario:** Incluye un id del usuario e información sobre el mecanismo utilizado para identificarlo. El mecanismo puede ser uno dado por la empresa o podría ser algún método de verificación de identidad incorporado en los módulos Soyio.
- **Información contextual:** Esta información incluye información del dispositivo utilizado por el usuario al momento de dar su consentimiento.

### Características del registro de evidencia
- **Persistencia indefinida:** La evidencia se almacena de forma permanente y no puede ser eliminada.
- **Inmutabilidad:** Una vez registrada, la evidencia no puede ser alterada o modificada, asegurando así la integridad y fiabilidad del registro.

### Importancia de la evidencia

La evidencia juega un papel crucial en garantizar la transparencia y el cumplimiento normativo en la gestión del consentimiento de los usuarios. Este registro detallado y accesible no solo facilita auditorías efectivas sino que también robustece la confianza entre los usuarios y la empresa.

**Cumplimiento normativo:** Mantener evidencia clara de cómo y cuándo se obtuvo el consentimiento de los usuarios es esencial para cumplir con las leyes de protección de datos. Esta documentación permite a las empresas demostrar, en cualquier revisión regulatoria, que han actuado conforme a la ley, evitando así posibles sanciones.

**Transparencia:** Un registro detallado del consentimiento fomenta un ambiente de apertura, permitiendo a los usuarios verificar cómo y para qué fines se han utilizado sus datos. Esto no solo satisface requisitos legales, sino que también construye relaciones basadas en la confianza y la claridad.

**Seguridad y confianza:** Demostrar que cada acción relativa al consentimiento de los usuarios está debidamente documentada y justificada ayuda a fortalecer la confianza. Los usuarios se sienten más seguros al saber que sus datos son manejados de manera ética y transparente, fortaleciendo así su relación con la empresa.

### Acceso y uso de la evidencia
La evidencia puede ser accesible bajo solicitud para propósitos de revisión legal, cumplimiento o auditoría. Cualquier acceso a la evidencia está sujeto a estrictas políticas de seguridad para proteger la confidencialidad y la integridad de la información.