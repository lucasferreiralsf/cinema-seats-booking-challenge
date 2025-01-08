# Cinema Booking System

This is a technical challenge to build a robust cinema seat booking system.

## 🏗 Architecture & Design Patterns

### Backend
- **Hexagonal Architecture** (Ports & Adapters)
  - Domain Layer: Core business entities and logic
  - Application Layer: Use cases and business rules
  - Infrastructure Layer: External services and implementations
  - Controller Layer: All controllers for the routes

### Design Patterns Used
- **Repository Pattern**: Abstraction layer between domain and data access
- **Factory Pattern**: For creating instances of repositories
- **Dependency Injection**: For loose coupling between components
- **Observer Pattern**: Used in WebSocket implementation for real-time updates
- **Optimistic Locking**: For handling concurrent seat reservations

## 🚀 Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)

### Running the Application

1. Clone the repository:
```bash
git clone <repository-url>
cd cinema-booking-system
```

2. Start the application using Docker Compose:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- PostgreSQL: localhost:5432
- Postgres Username: postgres
- Postgres Password: password
- Postgres DB name: cinema

### Environment Variables
All necessary environment variables are configured in the docker-compose.yml file. 

## 🏛 System Architecture

### Backend (Express.js + TypeScript)
- RESTful API implementation
- WebSocket integration for real-time seat updates
- JWT-based authentication
- PostgreSQL database with Prisma ORM
- Comprehensive error handling
- Concurrent booking management

### Frontend (Next.js + TypeScript)
> ⚠️ Note: The frontend implementation is minimal and serves primarily as a testing interface for the backend. It's not production-ready and could be improved significantly. Specially, the UI/UX design, the Auth part isn't good enough and the error handling is not so good on the frontend. All of this can be improved.

Current features:
- Basic authentication (sign in/sign up)
- Cinema Session listing
- Seat selection interface
- Real-time seat status updates via WebSocket
- Tailwind CSS for basic styling

## 🔄 API Endpoints

- `GET /api/sessions` - List all cinema sessions
- `GET /api/sessions/:id/seats` - Get seats for a specific session
- `POST /api/sessions/:id/seats/reserve` - Reserve seats
- `POST /api/auth/signin` - User authentication
- `POST /api/auth/signup` - User registration

## 🔧 Future Improvements

1. Backend Enhancements:
   - Implement caching layer (Redis)
   - Add rate limiting
   - Improve error handling and logging
   - Add comprehensive API documentation (Swagger/OpenAPI)
   - Implement unit and integration tests
   - Add monitoring and metrics collection, such as for grafana or prometheus

2. Frontend Improvements:
   - Implement proper state management
   - Add proper error handling and loading states
   - Improve UI/UX design
   - Add form validation
   - Implement proper testing
   - Add proper accessibility features
   - Add proper mobile first features

3. DevOps Improvements:
   - Add CI/CD pipeline
   - Implement proper logging and monitoring
   - Add health checks
   - Implement backup strategy


## 🤝 Author and useful links

Lucas Ferreira
Portfolio: [https://ferreiralucas.dev/en](https://ferreiralucas.dev/en)
Linkedin: [https://www.linkedin.com/in/lucasferreiralsf/](https://www.linkedin.com/in/lucasferreiralsf/)
Github: [https://github.com/lucasferreiralsf](https://github.com/lucasferreiralsf)