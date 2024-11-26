import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if user is authenticated', () => {
    localStorage.setItem('userToken', 'someAuthToken');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return false if user is not authenticated', () => {
    localStorage.removeItem('userToken');
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should store the token on login', () => {
    service.login('username', 'password');
    expect(localStorage.getItem('userToken')).toBe('someAuthToken');
  });

  it('should remove the token on logout', () => {
    localStorage.setItem('userToken', 'someAuthToken');
    service.logout();
    expect(localStorage.getItem('userToken')).toBeNull();
  });
});
