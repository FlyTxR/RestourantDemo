import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // Per autenticazione cookie-based
  const modifiedReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    withCredentials: true  // FONDAMENTALE per inviare cookie cross-origin
  });

  console.log(`[${modifiedReq.method}]`, modifiedReq.url);

  return next(modifiedReq).pipe(
    catchError((error) => {
      console.error('HTTP Error:', {
        status: error.status,
        message: error.message,
        url: error.url
      });

      let errorMessage = 'Si è verificato un errore';

      switch (error.status) {
        case 0:
          errorMessage = 'Impossibile contattare il server. Verifica che l\'API sia avviata.';
          break;
        case 400:
          errorMessage = 'Richiesta non valida';
          break;
        case 401:
          errorMessage = 'Sessione scaduta o non autorizzato';
          // Opzionale: redirect al login
          // inject(Router).navigate(['/login']);
          break;
        case 403:
          errorMessage = 'Accesso negato';
          break;
        case 404:
          errorMessage = 'Risorsa non trovata';
          break;
        case 500:
          errorMessage = 'Errore interno del server';
          break;
      }

      return throwError(() => ({ 
        message: errorMessage, 
        status: error.status,
        originalError: error 
      }));
    })
  );
};
