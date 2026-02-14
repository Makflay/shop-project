shop-project/
│
├─ backend/
│ ├─ src/
│ │ ├─ config/ # конфиги (DB, JWT, Stripe)
│ │ │ └─ db.ts
│ │ │ └─ jwt.ts
│ │ │ └─ stripe.ts
│ │ │
│ │ ├─ controllers/ # обработчики запросов
│ │ │ └─ auth.controller.ts
│ │ │ └─ product.controller.ts
│ │ │ └─ order.controller.ts
│ │ │
│ │ ├─ services/ # бизнес-логика
│ │ │ └─ auth.service.ts
│ │ │ └─ product.service.ts
│ │ │ └─ order.service.ts
│ │ │
│ │ ├─ models/ # Mongoose модели
│ │ │ └─ user.model.ts
│ │ │ └─ product.model.ts
│ │ │ └─ order.model.ts
│ │ │
│ │ ├─ middlewares/ # авторизация, валидация и др.
│ │ │ └─ auth.middleware.ts
│ │ │ └─ error.middleware.ts
│ │ │
│ │ ├─ routes/ # маршруты
│ │ │ └─ auth.routes.ts
│ │ │ └─ product.routes.ts
│ │ │ └─ order.routes.ts
│ │ │
│ │ ├─ utils/ # вспомогательные функции
│ │ │ └─ validators.ts
│ │ │
│ │ ├─ tests/ # unit + integration
│ │ │ └─ auth.test.ts
│ │ │ └─ product.test.ts
│ │ │
│ │ ├─ app.ts # настройка Express
│ │ └─ server.ts # запуск сервера
│ │
│ ├─ package.json
│ ├─ tsconfig.json
│ └─ Dockerfile
│
├─ frontend/
│ ├─ public/
│ ├─ src/
│ │ ├─ api/ # axios/fetch запросы к бэку
│ │ │ └─ auth.api.ts
│ │ │ └─ product.api.ts
│ │ │
│ │ ├─ components/ # общие UI компоненты
│ │ │ └─ Header.tsx
│ │ │ └─ Footer.tsx
│ │ │
│ │ ├─ pages/ # страницы приложения
│ │ │ └─ Home.tsx
│ │ │ └─ ProductList.tsx
│ │ │ └─ ProductDetails.tsx
│ │ │ └─ Cart.tsx
│ │ │ └─ Checkout.tsx
│ │ │ └─ Admin/
│ │ │ └─ Dashboard.tsx
│ │ │ └─ ProductCRUD.tsx
│ │ │ └─ Orders.tsx
│ │ │
│ │ ├─ store/ # Redux или Context API
│ │ │ └─ authSlice.ts
│ │ │ └─ cartSlice.ts
│ │ │ └─ productSlice.ts
│ │ │
│ │ ├─ routes/
│ │ │ └─ AppRouter.tsx
│ │ │
│ │ ├─ utils/
│ │ │ └─ validators.ts
│ │ │
│ │ ├─ hooks/
│ │ │ └─ useAuth.ts
│ │ │ └─ useCart.ts
│ │ │
│ │ ├─ styles/
│ │ │ └─ global.css / tailwind.config.js
│ │ │
│ │ └─ index.tsx
│ │
│ ├─ package.json
│ ├─ tsconfig.json
│ └─ Dockerfile
│
├─ docker-compose.yml
├─ .env.example
└─ README.md
