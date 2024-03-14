import { HttpInterceptorFn } from '@angular/common/http';

export const jWTInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem('token');
  const cloned = req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`
    }
  });
  return next(cloned);
};
