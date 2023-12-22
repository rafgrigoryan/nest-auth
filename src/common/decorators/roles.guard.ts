import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly allowedRoles: string[]) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user && this.allowedRoles.includes(user.role)) {
      return true; // Allow access if the user's role matches any allowed role
    }

    return false; // Deny access if the user's role doesn't match any allowed role
  }
}
