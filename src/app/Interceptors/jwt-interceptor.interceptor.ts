import { HttpInterceptorFn } from '@angular/common/http';

export const jWTInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage
  return next(req);
};
