import { ArgumentsHost, Catch, ExceptionFilter, HttpException, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;

    // HTTP metod mavjud bo‘lmasa, 405 qaytarish
    if (exception instanceof NotFoundException) {
      const request = ctx.getRequest<Request>();
      const method = request.method.toUpperCase();
      if (message.startsWith(`Cannot ${method}`)) {
        return response.status(405).json({
          success: false,
          message: `Method ${method} Not Allowed`,
        });
      }
    }

    response.status(status).json({
      success: false,
      message,
    });
  }
}
