# Архитектура фронта

```
angular-interactive-graph-frontend/
│
├── angular.json
├── package.json
│
└── src/
    ├── app/
    │   ├── auth/
    │   │   ├── login/
    │   │   │   ├── login.component.html
    │   │   │   ├── login.component.scss
    │   │   │   └── login.component.ts
    │   │   │
    │   │   ├── signup/
    │   │   │   ├── signup.component.html
    │   │   │   ├── signup.component.scss
    │   │   │   └── signup.component.ts
    │   │   │
    │   │   └── admin-login/
    │   │       ├── admin-login.component.html
    │   │       ├── admin-login.component.scss
    │   │       └── admin-login.component.ts
    │   │
    │   ├── core/
    │   │   ├── guards/
    │   │   │   └── auth.guard.ts
    │   │   │
    │   │   ├── services/
    │   │   │   ├── auth.service.ts
    │   │   │   ├── token.service.ts
    │   │   │   ├── user.service.ts
    │   │   │   └── api.service.ts
    │   │   │
    │   │   └── models/
    │   │       ├── user.model.ts
    │   │       └── point.model.ts
    │   │
    │   ├── shared/
    │   │   ├── components/
    │   │   │   ├── navbar/
    │   │   │   │   ├── navbar.component.html
    │   │   │   │   ├── navbar.component.scss
    │   │   │   │   └── navbar.component.ts
    │   │   │   │
    │   │   │   └── footer/
    │   │   │       ├── footer.component.html
    │   │   │       ├── footer.component.scss
    │   │   │       └── footer.component.ts
    │   │   │
    │   │   └── utils/
    │   │       └── error-handler.ts
    │   │
    │   ├── user/
    │   │   ├── dashboard/
    │   │   │   ├── dashboard.component.html
    │   │   │   ├── dashboard.component.scss
    │   │   │   └── dashboard.component.ts
    │   │   │
    │   │   ├── settings/
    │   │   │   ├── settings.component.html
    │   │   │   ├── settings.component.scss
    │   │   │   └── settings.component.ts
    │   │   │
    │   │   ├── profile/
    │   │   │   ├── profile.component.html
    │   │   │   ├── profile.component.scss
    │   │   │   └── profile.component.ts
    │   │   │
    │   │   └── contacts/
    │   │       ├── contacts.component.html
    │   │       ├── contacts.component.scss
    │   │       └── contacts.component.ts
    │   │
    │   ├── admin/
    │   │   ├── admin-console/
    │   │   │   ├── admin-console.component.html
    │   │   │   ├── admin-console.component.scss
    │   │   │   └── admin-console.component.ts
    │   │   │
    │   │   └── user-details/
    │   │       ├── user-details.component.html
    │   │       ├── user-details.component.scss
    │   │       └── user-details.component.ts
    │   │
    │   └── welcome/
    │       ├── welcome.component.html
    │       ├── welcome.component.scss
    │       └── welcome.component.ts
    │
    ├── assets/
    │   └── ...
    │
    ├── environments/
    │   ├── environment.prod.ts
    │   └── environment.ts
    │
    ├── styles/
    │   └── ...
    │
    └── index.html
```