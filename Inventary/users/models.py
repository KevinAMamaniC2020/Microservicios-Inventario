from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin
from django.db import models


# Custom Manager for User
class UsuarioManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        """
        Crea y devuelve un usuario con un nombre de usuario y una contraseña.
        """
        if not username:
            raise ValueError('El nombre de usuario es obligatorio')
        user = self.model(username=username, **extra_fields)
        user.set_password(password)  # Encriptar la contraseña
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        """
        Crea y devuelve un superusuario con un nombre de usuario y una contraseña.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(username, password, **extra_fields)


# Custom User Model
class Usuario(AbstractUser, PermissionsMixin):
    username = models.CharField(max_length=150, unique=True)
    name = models.CharField(max_length=255)
    profile_image = models.ImageField(blank=True, null=True)

    objects = UsuarioManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['name']  # Solo 'name' es requerido

    def __str__(self):
        return self.username

    class Meta:
        db_table = 'users'
