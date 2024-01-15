# Архитектура фронта

```
angular-interactive-graph-frontend/
│
├── angular.json
├── package.json
│
└── src/
    ├── app/
    │   ├── layouts/
    │   │   ├── main-layout/
    │   │   │   ├── main-layout.component.html
    │   │   │   ├── main-layout.component.scss
    │   │   │   └── main-layout.component.ts
    │   │   └── ... (other layouts if needed)
    │   │
    │   ├── auth/
    │   │   ├── user-login/
    │   │   │   ├── user-login.component.html
    │   │   │   ├── user-login.component.scss
    │   │   │   └── user-login.component.ts
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
    │   │   │   ├── password-reset-dialog/
    │   │   │   │   ├── password-reset-dialog.component.html
    │   │   │   │   ├── password-reset-dialog.component.scss
    │   │   │   │   └── password-reset-dialog.component.ts
    │   │   │   │
    │   │   │   ├── navbar/
    │   │   │   │   ├── navbar.component.html
    │   │   │   │   ├── navbar.component.scss
    │   │   │   │   └── navbar.component.ts
    │   │   │   │
    │   │   │   ├── sidebar/
    │   │   │   │   ├── sidebar.component.html
    │   │   │   │   ├── sidebar.component.scss
    │   │   │   │   └── sidebar.component.ts
    │   │   │   │
    │   │   │   └── dark-mode-toggle/
    │   │   │       ├── dark-mode-toggle.component.html
    │   │   │       ├── dark-mode-toggle.component.scss
    │   │   │       └── dark-mode-toggle.component.ts
    │   │   │
    │   │   └── styles/
    │   │       └── _buttons.scss
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
    |   ├── icons.png
    │   └── graphify-logos.png
    │
    ├── styles.scss
    ├── main.ts
    ├── favicon.ico
    └── index.html
```