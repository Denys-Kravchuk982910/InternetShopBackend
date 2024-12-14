# Internet Shop Backend

## Project Description

This is the backend for a European sneaker store. The project is implemented using Docker for convenient deployment and operation.

- **Demo:** [View Online](https://denys-kravchuk982910.github.io/InternetShopBackend/)
- **GitHub:** [GitHub Repository](https://github.com/Denys-Kravchuk982910/InternetShopBackend)

## Running the Project

To run the project, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Denys-Kravchuk982910/InternetShopBackend.git
   ```

2. Navigate to the `InternetShopBackend` directory:

   ```bash
   cd InternetShopBackend
   ```

3. Start `docker-compose.yml` on port 5003:

   ```bash
   docker-compose -f docker-compose.yml up -d --build
   ```

4. Once the process is complete, the project will be available at `http://localhost:5003`.

## Dependencies

- Docker
- Docker Compose

## Project Features

- The store specializes in sneakers from Europe.
- The project uses containerization, ensuring quick environment setup.

