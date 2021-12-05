from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, email, full_name, password, is_active=True, is_staff=False, is_admin=False):
        if not email:
            raise ValueError("Users must have an email address")
        if not password:
            raise ValueError("Users must have a password")
        user_obj = self.model(
            email=self.normalize_email(email),
            full_name=full_name
        )
        user_obj.set_password(password)
        user_obj.staff = is_staff
        user_obj.admin = is_admin
        user_obj.active = is_active
        user_obj.save(using=self._db)
        return user_obj

    def create_staffuser(self, email, full_name=None, password=None):
        user = self.create_user(
            email,
            full_name=full_name,
            password=password,
            is_staff=True
        )
        return user

    def create_superuser(self, email, full_name=None, password=None):
        user = self.create_user(
            email,
            full_name=full_name,
            password=password,
            is_staff=True,
            is_admin=True
        )
        return user


class User(AbstractBaseUser):
    providers = (
        ('Google', 'Google'),
        ('Phone Number', 'Phone Number')
    )

    email = models.EmailField(max_length=255, unique=True, blank=True, null=True)
    # phone_number = models.CharField(max_length=12, blank=True, null=True)

    full_name = models.CharField(max_length=255, blank=True, null=True, default='User')
    is_active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    prof_img = models.ImageField(blank=True, upload_to='accounts/profile_img')

    # individual_id = models.CharField(max_length=37, blank=True, null=True)

    provider = models.CharField(
        choices=providers,
        max_length=12,
        null=True,
        blank=True
    )

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['full_name']

    # class Meta:
    #     constraints = [
    #         models.CheckConstraint(
    #             check=models.Q(email__is_null=False) | models.Q(phone_number__is_null=False),
    #             name="Either email or Phone Number is present"
    #         )
    #     ]

    objects = UserManager()

    def __str__(self):
        return self.full_name

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.staff

    @property
    def is_admin(self):
        return self.admin


class OTP(models.Model):
    value = models.IntegerField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
