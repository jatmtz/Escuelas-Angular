import { HttpInterceptorFn } from '@angular/common/http';


export const jwtTokenInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
