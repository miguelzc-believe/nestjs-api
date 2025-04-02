import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import {Prisma} from '@prisma/client'

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.PrismaClientValidationError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception.message;

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2000':
          status = HttpStatus.BAD_REQUEST;
          message = 'El valor proporcionado es demasiado largo para la columna.';
          break;
        case 'P2001':
          status = HttpStatus.NOT_FOUND;
          message = 'El registro solicitado no existe.';
          break;
        case 'P2002':
          status = HttpStatus.CONFLICT;
          message = 'Violación de restricción única (valor duplicado).';
          break;
        case 'P2003':
          status = HttpStatus.BAD_REQUEST;
          message = 'Error en la restricción de clave foránea.';
          break;
        case 'P2004':
          status = HttpStatus.BAD_REQUEST;
          message = 'Falla en una restricción de la base de datos.';
          break;
        case 'P2005':
          status = HttpStatus.BAD_REQUEST;
          message = 'Falta un valor requerido.';
          break;
        case 'P2006':
          status = HttpStatus.BAD_REQUEST;
          message = 'El valor proporcionado no coincide con el tipo de la columna.';
          break;
        case 'P2007':
          status = HttpStatus.BAD_REQUEST;
          message = 'El valor proporcionado para una columna decimal no es válido.';
          break;
        case 'P2008':
          status = HttpStatus.BAD_REQUEST;
          message = 'Error de validación de datos.';
          break;
        case 'P2009':
          status = HttpStatus.BAD_REQUEST;
          message = 'El valor proporcionado es demasiado grande.';
          break;
        case 'P2010':
          status = HttpStatus.NOT_IMPLEMENTED;
          message = 'Funcionalidad no implementada.';
          break;
        case 'P2011':
          status = HttpStatus.BAD_REQUEST;
          message = 'Violación de restricción NOT NULL.';
          break;
        case 'P2012':
          status = HttpStatus.BAD_REQUEST;
          message = 'Campo desconocido en la consulta.';
          break;
        case 'P2013':
          status = HttpStatus.BAD_REQUEST;
          message = 'Falta la condición "where" en la consulta.';
          break;
        case 'P2025':
          status = HttpStatus.NOT_FOUND;
          message = 'No se encontró el registro para la operación solicitada.';
          break;
        default:
          status = HttpStatus.BAD_REQUEST;
          message = exception.message;
      }
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Error de validación en la consulta Prisma.';
    }

    response.status(status).json({
      statusCode: status,
      error: HttpStatus[status],
      message,
    });
  }
}
