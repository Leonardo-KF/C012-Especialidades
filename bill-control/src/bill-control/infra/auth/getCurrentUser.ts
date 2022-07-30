import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface Auth0Id {
  sub: string;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): Auth0Id => {
    const { req } = GqlExecutionContext.create(context).getContext();
    return req.auth.payload;
  },
);
