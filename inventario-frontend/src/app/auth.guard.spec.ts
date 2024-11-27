import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthService, AuthGuard]
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should return true if user is authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);  // Simulamos que el usuario está autenticado

    // Creamos instancias simuladas de ActivatedRouteSnapshot y RouterStateSnapshot
    const routeSnapshot = {} as ActivatedRouteSnapshot;
    const stateSnapshot = {} as RouterStateSnapshot;

    expect(authGuard.canActivate(routeSnapshot, stateSnapshot)).toBeTrue();
  });

  it('should redirect to login if user is not authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false); // Simulamos que el usuario NO está autenticado
    spyOn(router, 'navigate'); // Espiamos la navegación

    // Creamos instancias simuladas de ActivatedRouteSnapshot y RouterStateSnapshot
    const routeSnapshot = {} as ActivatedRouteSnapshot;
    const stateSnapshot = {} as RouterStateSnapshot;

    authGuard.canActivate(routeSnapshot, stateSnapshot);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);  // Verificamos que redirige al login
  });
});
