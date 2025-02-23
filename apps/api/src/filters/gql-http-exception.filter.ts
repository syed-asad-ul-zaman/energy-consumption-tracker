import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch(HttpException)
export class GqlHttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const errorResponse = exception.getResponse();
    const status = exception.getStatus();
    return new GraphQLError(
      typeof errorResponse === 'string'
        ? errorResponse
        : (errorResponse as any).message || 'An error occurred',
      {
        extensions: {
          code: status === 404 ? 'NOT_FOUND' : 'INTERNAL_SERVER_ERROR',
          status,
        },
      },
    );
  }
}
