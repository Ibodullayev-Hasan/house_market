import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, Observable, throwError } from "rxjs";
import { map } from "rxjs/operators"

@Injectable()
export class GlobalResponseFormatterInterceptor implements NestInterceptor {

	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
		return next.handle().pipe(
			map((data) => ({
				success: true,
				data,
				message: "Request successful"
			})),
			catchError((error) => {

				if (error instanceof HttpException) {
					const response = error.getResponse();
					console.log(response);
					
					return throwError(() =>
						new HttpException(
							{
								success: false,
								error: response,
							},
							error.getStatus()
						)
					);
				}

				return throwError(() =>
					new HttpException(
						{
							success: false,
							error
						},
						HttpStatus.INTERNAL_SERVER_ERROR
					)
				);
			})
		);
	}
}