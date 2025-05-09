# 🛡️ Best Practices for Structuring Node.js + Express.js Project with Authentication API

---

## ⚙️ Features

- ✅ User Registration & Login
- ✅ JWT Authentication
- ✅ Password Hashing with Bcrypt
- ✅ Sequelize ORM + PostgreSQL
- ✅ Centralized Error Handling
- ✅ Environment-Based Config

---

## 📦 Tech Stack

- **Node.js** + **Express**
- **Sequelize** ORM
- **PostgreSQL**
- **JWT** for auth
- **bcryptjs** for password encryption
- **dotenv** for environment config
- **Joi** for validation
- **winston** for centerlize logger

---

## 🚀 Getting Started

### 1. Clone the Repo

```
git clone [https://github.com/vslpdev/node-base-app.git](https://github.com/vslpdev/node-base-app.git)
cd node-base-app
```

### 2. Install Dependencies
```
npm install
```

### 3. Configure Environment
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_pg_user
DB_PASSWORD=your_pg_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
```


### 4. Initialize Database

Make sure PostgreSQL is running and the database exists.


### 5. Start the Server
```
node server.js
```



