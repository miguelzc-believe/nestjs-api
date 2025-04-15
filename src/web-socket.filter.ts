import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { Prisma } from '@prisma/client';

@Catch()
export class PrismaWsExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();
    let message: string = 'Ocurrió un error desconocido.';

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
        switch (exception.code) {
          case 'P2000':
            message =
              'El valor proporcionado es demasiado largo para la columna.';
            break;
          case 'P2001':
            message = 'El registro solicitado no existe.';
            break;
          case 'P2002':
            message = 'Violación de restricción única (valor duplicado).';
            break;
          case 'P2003':
            message = 'Error en la restricción de clave foránea.';
            break;
          case 'P2004':
            message = 'Falla en una restricción de la base de datos.';
            break;
          case 'P2005':
            message = 'Falta un valor requerido.';
            break;
          case 'P2006':
            message =
              'El valor proporcionado no coincide con el tipo de la columna.';
            break;
          case 'P2007':
            message =
              'El valor proporcionado para una columna decimal no es válido.';
            break;
          case 'P2008':
            message = 'Error de validación de datos.';
            break;
          case 'P2009':
            message = 'El valor proporcionado es demasiado grande.';
            break;
          case 'P2010':
            message = 'Funcionalidad no implementada.';
            break;
          case 'P2011':
            message = 'Violación de restricción NOT NULL.';
            break;
          case 'P2012':
            message = 'Campo desconocido en la consulta.';
            break;
          case 'P2013':
            message = 'Falta la condición "where" en la consulta.';
            break;
          case 'P2025':
            message = 'No se encontró el registro para la operación solicitada.';
            break;
          default:
            message = exception.message;
        }
      } else if (exception instanceof Prisma.PrismaClientValidationError) {
        message = 'Error de validación en la consulta Prisma.';
      } else if (exception instanceof Error) {
        message = exception.message;
      }

    console.error('Error global en WebSocket:', message);
    client.nsp.emit('error', { message });

    super.catch(exception, host);
  }
}
